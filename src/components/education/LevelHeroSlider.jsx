import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import {
  djangoApi,
} from '@/api/djangoApi';
import '@/styles/education-level-slider.css';


function recordsFromResponse(
  response
) {
  if (Array.isArray(response)) {
    return response;
  }

  return Array.isArray(response?.results)
    ? response.results
    : [];
}


function localizedAlt(
  slide,
  isRTL,
  fallbackAlt
) {
  const primary = slide[
    `alt_${isRTL ? 'fa' : 'en'}`
  ];

  const secondary = slide[
    `alt_${isRTL ? 'en' : 'fa'}`
  ];

  return (
    primary ||
    secondary ||
    fallbackAlt
  );
}


export default function LevelHeroSlider({
  level,
  fallbackImage,
  fallbackAlt,
  isRTL,
  className = '',
  imageClassName = '',
  controlsPosition = 'bottom-end',
}) {
  const reduceMotion =
    useReducedMotion();

  const [records, setRecords] =
    useState([]);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [paused, setPaused] =
    useState(false);


  useEffect(() => {
    let cancelled = false;

    djangoApi.educationHeroSlides
      .listByLevel(level)
      .then((response) => {
        if (cancelled) {
          return;
        }

        setRecords(
          recordsFromResponse(response)
            .filter((slide) =>
              Boolean(
                slide.image_url ||
                slide.image
              )
            )
        );
      })
      .catch(() => {
        // The bundled image keeps the hero available during API outages.
      });

    return () => {
      cancelled = true;
    };
  }, [level]);


  const slides = useMemo(() => {
    const resolved = records.map(
      (slide) => ({
        id: slide.id,
        image:
          slide.image_url ||
          slide.image,
        alt: localizedAlt(
          slide,
          isRTL,
          fallbackAlt
        ),
      })
    );

    if (resolved.length) {
      return resolved;
    }

    return [
      {
        id: `${level}-fallback`,
        image: fallbackImage,
        alt: fallbackAlt,
      },
    ];
  }, [
    fallbackAlt,
    fallbackImage,
    isRTL,
    level,
    records,
  ]);


  useEffect(() => {
    setActiveIndex((current) =>
      Math.min(
        current,
        Math.max(
          slides.length - 1,
          0
        )
      )
    );
  }, [slides.length]);


  useEffect(() => {
    if (
      reduceMotion ||
      paused ||
      slides.length < 2
    ) {
      return undefined;
    }

    const timer = window.setInterval(
      () => {
        setActiveIndex((current) =>
          (current + 1) %
          slides.length
        );
      },
      5200
    );

    return () => {
      window.clearInterval(timer);
    };
  }, [
    paused,
    reduceMotion,
    slides.length,
  ]);


  const previousSlide = () => {
    setActiveIndex((current) =>
      (
        current - 1 +
        slides.length
      ) % slides.length
    );
  };


  const nextSlide = () => {
    setActiveIndex((current) =>
      (current + 1) %
      slides.length
    );
  };


  const activeSlide =
    slides[activeIndex] ||
    slides[0];


  return (
    <div
      className={
        `mcoe-level-hero-slider ${className}`
      }
      onMouseEnter={() =>
        setPaused(true)
      }
      onMouseLeave={() =>
        setPaused(false)
      }
      onFocusCapture={() =>
        setPaused(true)
      }
      onBlurCapture={() =>
        setPaused(false)
      }
    >
      <AnimatePresence
        initial={false}
        mode="sync"
      >
        <motion.img
          key={activeSlide.id}
          src={activeSlide.image}
          alt={activeSlide.alt}
          className={
            `mcoe-level-hero-slide-image ${imageClassName}`
          }
          initial={
            reduceMotion
              ? false
              : { opacity: 0 }
          }
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration:
              reduceMotion
                ? 0
                : 0.7,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        />
      </AnimatePresence>


      {slides.length > 1 && (
        <div
          className={
            `mcoe-level-slider-controls ` +
            `mcoe-level-slider-controls--${controlsPosition}`
          }
          dir="ltr"
          aria-label={
            isRTL
              ? 'کنترل اسلایدر'
              : 'Slider controls'
          }
        >
          <button
            type="button"
            data-mcoe-liquid="off"
            className="mcoe-level-slider-arrow"
            onClick={previousSlide}
            aria-label={
              isRTL
                ? 'اسلاید قبلی'
                : 'Previous slide'
            }
          >
            <ChevronLeft
              aria-hidden="true"
            />
          </button>


          <div className="mcoe-level-slider-dots">
            {slides.map(
              (slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  data-mcoe-liquid="off"
                  className="mcoe-level-slider-dot"
                  data-active={
                    index === activeIndex
                      ? 'true'
                      : 'false'
                  }
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  aria-current={
                    index === activeIndex
                      ? 'true'
                      : undefined
                  }
                  aria-label={
                    `${
                      isRTL
                        ? 'اسلاید'
                        : 'Slide'
                    } ${index + 1}`
                  }
                />
              )
            )}
          </div>


          <button
            type="button"
            data-mcoe-liquid="off"
            className="mcoe-level-slider-arrow"
            onClick={nextSlide}
            aria-label={
              isRTL
                ? 'اسلاید بعدی'
                : 'Next slide'
            }
          >
            <ChevronRight
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </div>
  );
}
