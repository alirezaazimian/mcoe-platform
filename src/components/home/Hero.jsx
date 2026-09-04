import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { useLanguage } from '@/lib/LanguageContext';
import Button from '@/components/ui/AppButton';
import HeroSlider from '@/components/home/HeroSlider';

export default function Hero() {
  const { t, isRTL } = useLanguage();

  const stats = [
    {
      fa: '۳۰+',
      en: '30+',
      faLabel: 'سال تجربه',
      enLabel: 'Years of experience',
    },
    {
      fa: '۸۰۰۰+',
      en: '8000+',
      faLabel: 'دانش‌آموز',
      enLabel: 'Students',
    },
    {
      fa: '۴',
      en: '4',
      faLabel: 'مقطع آموزشی',
      enLabel: 'Educational levels',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FBF6EE]">
      <div className="container-institutional relative z-10">
        <div className="grid lg:grid-cols-12 items-center gap-12 lg:gap-16 min-h-[78vh] py-14 lg:py-20">

          {/* Text side */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-7"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-6 h-[2px] rounded-full bg-[#001858]" />
                <span className="w-3 h-[2px] rounded-full bg-[#002699]" />
                <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
              </span>

              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#596486]">
                {isRTL
                  ? 'فضایی برای یادگیری، رشد و شکوفایی'
                  : 'A place to learn, grow and flourish'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="max-w-xl text-[2.15rem] sm:text-5xl lg:text-[3.45rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#001858]"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="max-w-lg mt-6 text-sm sm:text-base leading-8 text-[#5E5B5F]"
            >
              {isRTL
                ? 'محیطی پویا، امن و الهام‌بخش برای پرورش دانش، خلاقیت و اعتمادبه‌نفس نسل آینده.'
                : 'A thoughtful, inspiring and safe environment where knowledge, creativity and confidence can grow together.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <Button
                href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister"
                size="lg"
                className="bg-[#001858] text-white border-[#001858] hover:bg-[#002699] hover:text-white shadow-[0_14px_32px_rgba(0,24,88,0.20)]"
              >
                {t('hero.register')}
              </Button>

              <Button
                to="/collaborate"
                variant="outline"
                size="lg"
                className="bg-[#FFF5DF] border-[#F5A623]/50 text-[#001858] hover:bg-[#F5A623] hover:border-[#F5A623] hover:text-[#001858]"
              >
                {t('hero.collaborate')}
              </Button>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.36 }}
              className="grid grid-cols-3 gap-2 sm:gap-3 mt-11 max-w-lg"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-white/90 bg-[#FFF9F1]/90 px-3 sm:px-4 py-4 shadow-[8px_10px_24px_rgba(80,65,45,0.07),-6px_-6px_18px_rgba(255,255,255,0.9)]"
                >
                  <div className="text-xl sm:text-2xl font-bold text-[#001858]">
                    {isRTL ? stat.fa : stat.en}
                  </div>

                  <div className="mt-1 text-[10px] sm:text-xs leading-5 text-[#68656A]">
                    {isRTL ? stat.faLabel : stat.enLabel}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual side */}
          <motion.div
            initial={{
              opacity: 0,
              x: isRTL ? -24 : 24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.85,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative lg:col-span-7 order-1 lg:order-2 px-2 sm:px-6 lg:px-0 py-10"
          >
            {/* Main navy / blue clay plate */}
            <div
              aria-hidden="true"
              className="absolute top-[2%] end-[1%] w-[90%] h-[84%] rounded-[3.8rem] rotate-[3deg]"
              style={{
                background:
                  'linear-gradient(145deg, #002699 0%, #001858 82%)',
                boxShadow:
                  '22px 26px 55px rgba(0,24,88,0.22), inset 6px 6px 16px rgba(255,255,255,0.08), inset -9px -9px 20px rgba(0,0,0,0.10)',
              }}
            />

            {/* Warm orange secondary plate */}
            <div
              aria-hidden="true"
              className="absolute bottom-[1%] start-[1%] w-[60%] h-[58%] rounded-[3.3rem] -rotate-[4deg] bg-[#F5A623]"
              style={{
                boxShadow:
                  '14px 18px 34px rgba(168,109,18,0.16), inset 4px 4px 12px rgba(255,255,255,0.18)',
              }}
            />

            {/* Small lavender signature */}
            <div
              aria-hidden="true"
              className="absolute top-[3%] start-[6%] w-20 h-20 lg:w-24 lg:h-24 rounded-[2rem] bg-[#C9BDD4] rotate-[-9deg] opacity-75"
            />

            {/* Slider surface */}
            <div className="relative z-10 rounded-[3.2rem] p-2 sm:p-3 bg-[#FFF9F1]/95 shadow-[12px_16px_38px_rgba(55,44,30,0.12),-8px_-8px_24px_rgba(255,255,255,0.9)]">
              <HeroSlider />
            </div>

            {/* Orange floating note */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute z-20 top-3 start-[15%] hidden sm:flex items-center gap-2 rounded-2xl px-4 py-2.5 bg-[#F5A623] text-[#001858] text-xs font-bold shadow-[8px_10px_22px_rgba(168,109,18,0.18)]"
            >
              <Sparkles className="w-4 h-4" />

              <span>
                {isRTL
                  ? 'آموزش . رشد . آینده'
                  : 'Learn · Grow · Future'}
              </span>
            </motion.div>

            {/* Blue decorative dot */}
            <motion.div
              aria-hidden="true"
              animate={{
                y: [0, 7, 0],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute z-20 bottom-[10%] end-[2%] hidden lg:block w-8 h-8 rounded-full bg-[#002699] shadow-[0_8px_18px_rgba(0,38,153,0.25)]"
            />

            {/* Orange decorative dot */}
            <div
              aria-hidden="true"
              className="absolute z-20 top-[25%] -end-1 hidden lg:block w-4 h-4 rounded-full bg-[#F5A623] shadow-[0_6px_16px_rgba(245,166,35,0.28)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
