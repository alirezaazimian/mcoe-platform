import React, { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AUTOPLAY_MS = 6000;

export default function HeroSlider() {
  const { isRTL } = useLanguage();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    base44.entities.HeroSlide.filter({ is_active: true }, 'sort_order')
      .then((data) => setSlides(data || []))
      .catch(() => setSlides([]))
      .finally(() => setLoading(false));
  }, []);

  const count = slides.length;
  const go = useCallback(
    (dir) => setIndex((i) => (count ? (i + dir + count) % count : 0)),
    [count]
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  if (loading) {
    return (
      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden glass neumorphic-inset bg-muted animate-pulse" />
    );
  }

  if (!count) {
    return (
      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden glass neumorphic-inset bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
        <p className="text-white/70 text-sm px-6 text-center">
          {isRTL ? 'اسلایدهای رویداد مدرسه به‌زودی اینجا نمایش داده می‌شوند.' : 'School event slides will appear here soon.'}
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden glass neumorphic-inset group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{
            opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 7, ease: 'linear' },
            filter: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].image_url}
            alt=""
            className="w-full h-full"
            fittingType="fill"
          />
        </motion.div>
      </AnimatePresence>

      {/* Arrow controls */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={isRTL ? 'اسلاید بعدی' : 'Previous slide'}
            className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'end-3' : 'start-3'} z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass bg-white/20 border border-white/30 text-white flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 hover:bg-white/35 active:scale-90`}
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={isRTL ? 'اسلاید قبلی' : 'Next slide'}
            className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'start-3' : 'end-3'} z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass bg-white/20 border border-white/30 text-white flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 hover:bg-white/35 active:scale-90`}
          >
            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </>
      )}

      {/* Dot indicators with progress */}
      {count > 1 && (
        <div className="absolute top-4 end-6 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${isRTL ? 'اسلاید' : 'Slide'} ${i + 1}`}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === index ? 28 : 10, backgroundColor: 'rgba(255,255,255,0.35)' }}
            >
              {i === index && !paused && (
                <motion.span
                  key={`bar-${index}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                  className="absolute inset-y-0 start-0 bg-white"
                />
              )}
              {i === index && paused && (
                <span className="absolute inset-0 bg-white/80" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}