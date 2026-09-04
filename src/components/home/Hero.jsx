import React from 'react';
import { motion } from 'framer-motion';

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
      <div className="container-institutional">
        <div
          className="
            grid
            min-h-[72vh]
            items-center
            gap-12
            py-14
            lg:grid-cols-12
            lg:gap-16
            lg:py-18
          "
        >

          {/* Content */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="
                  mb-6
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    h-[3px]
                    w-8
                    rounded-full
                    bg-[#F5A623]
                  "
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    tracking-wide
                    text-[#001858]/60
                  "
                >
                  {isRTL
                    ? 'آموزش . رشد . آینده'
                    : 'Education · Growth · Future'}
                </span>
              </div>


              <h1
                className="
                  max-w-xl
                  text-[2.15rem]
                  font-bold
                  leading-[1.3]
                  tracking-[-0.02em]
                  text-[#001858]
                  sm:text-5xl
                  lg:text-[3.35rem]
                "
              >
                {t('hero.title')}
              </h1>


              <p
                className="
                  mt-6
                  max-w-lg
                  text-sm
                  leading-8
                  text-[#66616A]
                  sm:text-base
                "
              >
                {isRTL
                  ? 'محیطی پویا، امن و الهام‌بخش برای پرورش دانش، خلاقیت و اعتمادبه‌نفس نسل آینده.'
                  : 'A thoughtful, inspiring and safe environment where knowledge, creativity and confidence can grow together.'}
              </p>


              {/* Actions */}
              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <Button
                  href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister"
                  size="lg"
                  className="
                    border-[#001858]
                    bg-[#001858]
                    text-white
                    shadow-[0_10px_22px_rgba(0,24,88,0.14)]
                    hover:bg-[#002699]
                    hover:text-white
                  "
                >
                  {t('hero.register')}
                </Button>

                <Button
                  to="/collaborate"
                  variant="outline"
                  size="lg"
                  className="
                    border-[#F5A623]/40
                    bg-[#FFF7E8]
                    text-[#001858]
                    hover:border-[#F5A623]/70
                    hover:bg-[#FFE8B5]
                    hover:text-[#001858]
                  "
                >
                  {t('hero.collaborate')}
                </Button>
              </div>


              {/* Minimal statistics */}
              <div
                className="
                  mt-10
                  flex
                  max-w-lg
                  items-start
                "
              >
                {stats.map((stat, index) => (
                  <React.Fragment key={index}>
                    <div
                      className="
                        flex-1
                        px-3
                        first:ps-0
                        last:pe-0
                      "
                    >
                      <div
                        className="
                          text-lg
                          font-bold
                          text-[#001858]
                          sm:text-xl
                        "
                      >
                        {isRTL
                          ? stat.fa
                          : stat.en}
                      </div>

                      <div
                        className="
                          mt-1
                          text-[10px]
                          leading-5
                          text-[#66616A]
                          sm:text-xs
                        "
                      >
                        {isRTL
                          ? stat.faLabel
                          : stat.enLabel}
                      </div>
                    </div>

                    {index < stats.length - 1 && (
                      <div
                        className="
                          mt-1
                          h-10
                          w-px
                          bg-[#001858]/10
                        "
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>


          {/* Visual */}
          <motion.div
            initial={{
              opacity: 0,
              x: isRTL ? -18 : 18,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              order-1
              px-2
              py-6
              sm:px-6
              lg:order-2
              lg:col-span-7
              lg:px-0
            "
          >
            {/* Single restrained brand plate */}
            <div
              aria-hidden="true"
              className="
                absolute
                end-[2%]
                top-[3%]
                h-[88%]
                w-[92%]
                rotate-[1.5deg]
                rounded-[3rem]
              "
              style={{
                background:
                  'linear-gradient(145deg, #002699 0%, #001858 88%)',
                boxShadow:
                  '16px 20px 40px rgba(0,24,88,0.16)',
              }}
            />


            {/* One orange accent only */}
            <div
              aria-hidden="true"
              className="
                absolute
                bottom-[3%]
                start-[2%]
                z-[1]
                h-24
                w-24
                rounded-[1.8rem]
                bg-[#F5A623]
                shadow-[8px_10px_22px_rgba(245,166,35,0.16)]
              "
            />


            {/* Slider */}
            <div
              className="
                relative
                z-10
                overflow-hidden
                rounded-[2.6rem]
                bg-[#FFF9F1]
                p-2
                shadow-[10px_14px_30px_rgba(55,44,30,0.10)]
              "
            >
              <HeroSlider />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
