import React, {
  useCallback,
  useEffect,
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

import { djangoApi } from '@/api/djangoApi';
import { useLanguage } from '@/lib/LanguageContext';


const AUTOPLAY_MS = 6500;


export default function HeroSlider() {
  const { isRTL } = useLanguage();
  const reduceMotion = useReducedMotion();

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);


  useEffect(() => {
    let active = true;

    djangoApi.heroSlides
      .list()
      .then((data) => {
        if (active) {
          setSlides(
            Array.isArray(data)
              ? data
              : []
          );
        }
      })
      .catch((error) => {
        console.error(
          'Failed to load hero slides:',
          error
        );

        if (active) {
          setSlides([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);


  const count = slides.length;


  const go = useCallback(
    (direction) => {
      setIndex((current) =>
        count
          ? (
              current +
              direction +
              count
            ) % count
          : 0
      );
    },
    [count]
  );


  useEffect(() => {
    if (
      count <= 1 ||
      paused ||
      reduceMotion
    ) {
      return undefined;
    }

    const timer = window.setInterval(
      () => go(1),
      AUTOPLAY_MS
    );

    return () =>
      window.clearInterval(timer);
  }, [
    count,
    paused,
    reduceMotion,
    go,
  ]);


  if (loading) {
    return (
      <div
        className="
          aspect-[4/3]
          rounded-[2.7rem]
          bg-white/60
          animate-pulse
        "
      />
    );
  }


  if (!count) {
    return (
      <div
        className="
          aspect-[4/3]
          rounded-[2.7rem]
          bg-[#EDE8F1]
          flex
          items-center
          justify-center
          px-8
          text-center
          text-sm
          text-[#776D7D]
        "
      >
        {isRTL
          ? 'تصاویر مجتمع به‌زودی اینجا نمایش داده می‌شوند.'
          : 'School images will appear here soon.'}
      </div>
    );
  }


  const slide = slides[index];

  const alt =
    (
      isRTL
        ? slide.alt_fa
        : slide.alt_en
    ) ||
    (
      isRTL
        ? slide.alt_en
        : slide.alt_fa
    ) ||
    'MCOE';


  return (
    <div
      className="
        relative
        rounded-[2.8rem]
        bg-white/75
        backdrop-blur-xl
        border
        border-white
        p-2.5
        sm:p-3
        shadow-[0_28px_70px_rgba(48,39,56,0.16)]
      "
      onMouseEnter={() =>
        setPaused(true)
      }
      onMouseLeave={() =>
        setPaused(false)
      }
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[2.25rem]
          aspect-[4/3]
          bg-[#E7E3EA]
        "
      >
        <AnimatePresence
          initial={false}
          mode="wait"
        >
          <motion.img
            key={slide.id ?? index}
            src={slide.image_url}
            alt={alt}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 1.035,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              opacity: {
                duration: 0.65,
              },
              scale: {
                duration: 6,
                ease: 'linear',
              },
            }}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
            "
          />
        </AnimatePresence>


        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#14213D]/38
            via-transparent
            to-transparent
          "
        />


        {/* caption */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`caption-${index}`}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 6,
            }}
            className="
              absolute
              bottom-5
              start-5
              end-20
              z-20
            "
          >
            <div
              className="
                inline-block
                max-w-md
                rounded-2xl
                bg-white/78
                backdrop-blur-xl
                border
                border-white/70
                px-4
                py-3
                shadow-[0_10px_30px_rgba(20,33,61,0.10)]
              "
            >
              <p
                className="
                  text-xs
                  sm:text-sm
                  font-semibold
                  leading-6
                  text-[#14213D]
                "
              >
                {alt}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>


        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className={`
                absolute
                z-30
                top-1/2
                -translate-y-1/2
                ${isRTL ? 'right-3' : 'left-3'}
                w-10
                h-10
                rounded-xl
                bg-white/82
                backdrop-blur-xl
                border
                border-white
                text-[#14213D]
                flex
                items-center
                justify-center
                shadow-md
                opacity-0
                group-hover:opacity-100
                hover:bg-white
                transition
              `}
            >
              {isRTL
                ? <ChevronRight className="w-4 h-4" />
                : <ChevronLeft className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              className={`
                absolute
                z-30
                top-1/2
                -translate-y-1/2
                ${isRTL ? 'left-3' : 'right-3'}
                w-10
                h-10
                rounded-xl
                bg-white/82
                backdrop-blur-xl
                border
                border-white
                text-[#14213D]
                flex
                items-center
                justify-center
                shadow-md
                opacity-0
                group-hover:opacity-100
                hover:bg-white
                transition
              `}
            >
              {isRTL
                ? <ChevronLeft className="w-4 h-4" />
                : <ChevronRight className="w-4 h-4" />}
            </button>
          </>
        )}


        {count > 1 && (
          <div
            className="
              absolute
              z-30
              bottom-5
              end-5
              flex
              items-center
              gap-1.5
              rounded-full
              bg-white/75
              backdrop-blur-xl
              px-2.5
              py-2
            "
          >
            {slides.map(
              (item, slideIndex) => (
                <button
                  key={
                    item.id ??
                    slideIndex
                  }
                  type="button"
                  onClick={() =>
                    setIndex(slideIndex)
                  }
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      slideIndex === index
                        ? 'w-7 bg-[#887593]'
                        : 'w-1.5 bg-[#BEB6C2]'
                    }
                  `}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}