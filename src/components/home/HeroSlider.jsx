import {
  useCallback,
  useEffect,
  useRef,
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
  Pause,
  Play,
} from 'lucide-react';

import { djangoApi } from '@/api/djangoApi';
import Button from '@/components/ui/AppButton';
import { useLanguage } from '@/lib/LanguageContext';


const AUTOPLAY_MS = 7200;

const REGISTRATION_URL =
  'https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister';

const SAMPLE_SLIDES = [
  {
    id: 'mcoe-sample-building',
    image_url:
      '/media/site/7a95f3af1_IMG_7095.jpg',
    alt_fa:
      'نمای ورودی مجتمع آموزشی معصومه عظیمیان',
    alt_en:
      'Entrance of Masoumeh Azimian Educational Complex',
  },
  {
    id: 'mcoe-sample-playground',
    image_url:
      '/media/site/af4db7d64_6.jpg',
    alt_fa:
      'محوطه بازی و فعالیت بدنی مجتمع آموزشی',
    alt_en:
      'Play and activity space at the educational complex',
  },
];

const STATS = [
  {
    valueFa: '۳۰+',
    valueEn: '30+',
    labelFa: 'سال تجربه',
    labelEn: 'Years of experience',
  },
  {
    valueFa: '۸۰۰۰+',
    valueEn: '8000+',
    labelFa: 'دانش‌آموز',
    labelEn: 'Students',
  },
  {
    valueFa: '۴',
    valueEn: '4',
    labelFa: 'مقطع آموزشی',
    labelEn: 'Education levels',
  },
];


function localized(
  slide,
  field,
  isRTL,
  fallback
) {
  const language =
    isRTL ? 'fa' : 'en';
  const alternateLanguage =
    isRTL ? 'en' : 'fa';

  return String(
    slide?.[
      `${field}_${language}`
    ] ||
    slide?.[
      `${field}_${alternateLanguage}`
    ] ||
    fallback ||
    ''
  ).trim();
}


function headlineLines(value, isRTL) {
  const marker = isRTL ? 'رویکردی' : ',';
  const markerIndex = value.indexOf(marker);

  if (markerIndex < 0) {
    return [value];
  }

  const firstLineEnd = isRTL
    ? markerIndex + marker.length
    : markerIndex + 1;

  return [
    value.slice(0, firstLineEnd).trim(),
    value.slice(firstLineEnd).trim(),
  ];
}


export default function HeroSlider() {
  const {
    isRTL,
    t,
  } = useLanguage();
  const reduceMotion =
    useReducedMotion();

  const [slides, setSlides] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [index, setIndex] =
    useState(0);
  const [interactionPaused, setInteractionPaused] =
    useState(false);
  const [userPaused, setUserPaused] =
    useState(false);
  const touchStart = useRef(null);


  useEffect(() => {
    let active = true;

    djangoApi.heroSlides
      .list()
      .then((data) => {
        if (!active) {
          return;
        }

        const records =
          Array.isArray(data)
            ? data
            : (
                Array.isArray(
                  data?.results
                )
                  ? data.results
                  : []
              );

        setSlides(
          records.length
            ? records
            : SAMPLE_SLIDES
        );
      })
      .catch((error) => {
        console.error(
          'Failed to load hero slides:',
          error
        );

        if (active) {
          setSlides(
            SAMPLE_SLIDES
          );
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
  const paused =
    interactionPaused ||
    userPaused;


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
    setIndex((current) =>
      count
        ? Math.min(
            current,
            count - 1
          )
        : 0
    );
  }, [count]);


  useEffect(() => {
    if (
      count <= 1 ||
      paused ||
      reduceMotion
    ) {
      return undefined;
    }

    const timer =
      window.setTimeout(
        () => go(1),
        AUTOPLAY_MS
      );

    return () =>
      window.clearTimeout(timer);
  }, [
    count,
    go,
    index,
    paused,
    reduceMotion,
  ]);


  const handleTouchStart = (
    event
  ) => {
    touchStart.current =
      event.touches[0]
        ?.clientX ?? null;
  };


  const handleTouchEnd = (
    event
  ) => {
    const start =
      touchStart.current;
    const end =
      event.changedTouches[0]
        ?.clientX;

    touchStart.current = null;

    if (
      count <= 1 ||
      start === null ||
      end === undefined
    ) {
      return;
    }

    const distance =
      end - start;

    if (
      Math.abs(distance) < 52
    ) {
      return;
    }

    if (isRTL) {
      go(distance > 0 ? 1 : -1);
    } else {
      go(distance < 0 ? 1 : -1);
    }
  };


  if (loading) {
    return (
      <div
        className="mcoe-fade-carousel mcoe-fade-loading"
        aria-label={
          isRTL
            ? 'در حال بارگذاری اسلایدر'
            : 'Loading hero carousel'
        }
      >
        <div className="mcoe-fade-loading-copy">
          <span />
          <strong />
          <strong />
          <p />
        </div>
      </div>
    );
  }


  const slide =
    slides[index];
  const slideKey =
    slide?.id ?? index;

  const legacyAlt = localized(
    slide,
    'alt',
    isRTL,
    ''
  );

  const eyebrow = isRTL
    ? 'آموزش . رشد . آینده'
    : 'Education · Growth · Future';

  const title = t('hero.title');
  const titleLines = headlineLines(
    title,
    isRTL
  );

  const description = isRTL
    ? 'محیطی پویا، امن و الهام‌بخش برای پرورش دانش، خلاقیت و اعتمادبه‌نفس نسل آینده.'
    : 'A thoughtful, inspiring and safe environment where knowledge, creativity and confidence can grow together.';

  const previousLabel =
    isRTL
      ? 'اسلاید قبلی'
      : 'Previous slide';
  const nextLabel =
    isRTL
      ? 'اسلاید بعدی'
      : 'Next slide';


  return (
    <div
      className={`mcoe-fade-carousel${
        paused
          ? ' is-paused'
          : ''
      }`}
      style={{
        '--hero-duration':
          `${AUTOPLAY_MS}ms`,
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={
        isRTL
          ? 'معرفی مجتمع آموزشی معصومه عظیمیان'
          : 'Masoumeh Azimian Educational Complex highlights'
      }
      onMouseEnter={() =>
        setInteractionPaused(true)
      }
      onMouseLeave={() =>
        setInteractionPaused(false)
      }
      onFocusCapture={() =>
        setInteractionPaused(true)
      }
      onBlurCapture={(event) => {
        if (
          !event.currentTarget
            .contains(
              event.relatedTarget
            )
        ) {
          setInteractionPaused(false);
        }
      }}
      onTouchStart={
        handleTouchStart
      }
      onTouchEnd={handleTouchEnd}
    >
      <div className="mcoe-fade-visual">
        <AnimatePresence
          initial={false}
          mode="sync"
        >
          <motion.img
            key={slideKey}
            src={slide.image_url}
            alt={legacyAlt || title}
            initial={{
              opacity: 0,
              scale:
                reduceMotion
                  ? 1
                  : 1.045,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              opacity: {
                duration:
                  reduceMotion
                    ? 0
                    : 0.8,
              },
              scale: {
                duration:
                  reduceMotion
                    ? 0
                    : 7.4,
                ease: 'linear',
              },
            }}
          />
        </AnimatePresence>

        <div
          className="mcoe-fade-photo-tone"
          aria-hidden="true"
        />
      </div>

      <div className="mcoe-fade-content-shell">
        <div className="mcoe-fade-content">
          <div className="mcoe-fade-brandline">
            <span aria-hidden="true" />
            <p>{eyebrow}</p>
          </div>

          <AnimatePresence
            initial={false}
            mode="wait"
          >
            <motion.div
              key={`copy-${slideKey}`}
              className="mcoe-fade-copy"
              initial={{
                opacity: 0,
                y:
                  reduceMotion
                    ? 0
                    : 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y:
                  reduceMotion
                    ? 0
                    : -10,
              }}
              transition={{
                duration:
                  reduceMotion
                    ? 0
                    : 0.48,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              <h1>
                {titleLines.map((line) => (
                  <span key={line}>
                    {line}
                  </span>
                ))}
              </h1>

              <p className="mcoe-fade-description">
                {description}
              </p>

              <div className="mcoe-fade-actions">
                <Button
                  href={REGISTRATION_URL}
                  size="lg"
                  className="mcoe-fade-primary-action"
                >
                  {t('hero.register')}
                </Button>

                <Button
                  to="/collaborate"
                  variant="outline"
                  size="lg"
                  className="mcoe-fade-secondary-action"
                >
                  {t(
                    'hero.collaborate'
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mcoe-fade-stats">
            {STATS.map((stat) => (
              <div
                key={stat.labelEn}
                className="mcoe-fade-stat"
              >
                <strong>
                  {isRTL
                    ? stat.valueFa
                    : stat.valueEn}
                </strong>
                <span>
                  {isRTL
                    ? stat.labelFa
                    : stat.labelEn}
                </span>
              </div>
            ))}
          </div>

          {count > 1 && (
            <div className="mcoe-fade-nav-row">
              <div
                className="mcoe-fade-progress"
                aria-label={
                  isRTL
                    ? 'انتخاب اسلاید'
                    : 'Choose a slide'
                }
              >
                {slides.map((item, slideIndex) => (
                  <button
                    key={
                      item.id ??
                      slideIndex
                    }
                    type="button"
                    data-mcoe-liquid="off"
                    aria-current={
                      slideIndex === index
                        ? 'true'
                        : undefined
                    }
                    aria-label={
                      isRTL
                        ? `نمایش اسلاید ${slideIndex + 1}`
                        : `Show slide ${slideIndex + 1}`
                    }
                    className={
                      slideIndex === index
                        ? 'is-active'
                        : ''
                    }
                    onClick={() =>
                      setIndex(
                        slideIndex
                      )
                    }
                  >
                    <i>
                      <span />
                    </i>
                  </button>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>

      {count > 1 && (
        <div
          className="mcoe-fade-controls mcoe-fade-floating-controls"
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={previousLabel}
          >
            {isRTL ? (
              <ChevronRight />
            ) : (
              <ChevronLeft />
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setUserPaused(
                (current) =>
                  !current
              )
            }
            aria-label={
              userPaused
                ? (
                    isRTL
                      ? 'پخش خودکار اسلایدر'
                      : 'Play carousel'
                  )
                : (
                    isRTL
                      ? 'توقف پخش خودکار اسلایدر'
                      : 'Pause carousel'
                  )
            }
          >
            {userPaused ? (
              <Play />
            ) : (
              <Pause />
            )}
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label={nextLabel}
          >
            {isRTL ? (
              <ChevronLeft />
            ) : (
              <ChevronRight />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
