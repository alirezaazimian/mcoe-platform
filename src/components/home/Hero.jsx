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
            items-center
            gap-10
            py-10
            sm:py-12
            lg:min-h-[72vh]
            lg:grid-cols-12
            lg:gap-16
            lg:py-20
          "
        >

          {/* Content */}
          <div
            className="
              order-1
              text-center
              lg:order-1
              lg:col-span-5
              lg:text-start
            "
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Eyebrow */}
              <div
                className="
                  mb-5
                  flex
                  items-center
                  justify-center
                  gap-3
                  lg:mb-6
                  lg:justify-start
                "
              >
                <span
                  className="
                    h-[3px]
                    w-7
                    rounded-full
                    bg-[#F5A623]
                    lg:w-8
                  "
                />

                <span
                  className="
                    text-[11px]
                    font-semibold
                    tracking-wide
                    text-[#001858]/60
                    sm:text-xs
                  "
                >
                  {isRTL
                    ? 'آموزش . رشد . آینده'
                    : 'Education · Growth · Future'}
                </span>
              </div>


              {/* Title */}
              <h1
                className="
                  mx-auto
                  max-w-[22rem]
                  text-[2rem]
                  font-bold
                  leading-[1.35]
                  tracking-[-0.02em]
                  text-[#001858]
                  sm:max-w-xl
                  sm:text-[2.65rem]
                  lg:mx-0
                  lg:text-[3.35rem]
                "
              >
                {t('hero.title')}
              </h1>


              {/* Description */}
              <p
                className="
                  mx-auto
                  mt-5
                  max-w-[22rem]
                  text-sm
                  leading-7
                  text-[#66616A]
                  sm:max-w-lg
                  sm:text-base
                  sm:leading-8
                  lg:mx-0
                  lg:mt-6
                "
              >
                {isRTL
                  ? 'محیطی پویا، امن و الهام‌بخش برای پرورش دانش، خلاقیت و اعتمادبه‌نفس نسل آینده.'
                  : 'A thoughtful, inspiring and safe environment where knowledge, creativity and confidence can grow together.'}
              </p>


              {/* Actions */}
              <div
                className="
                  mx-auto
                  mt-7
                  grid
                  max-w-[22rem]
                  grid-cols-2
                  gap-3
                  lg:mx-0
                  lg:mt-8
                  lg:flex
                  lg:max-w-none
                  lg:flex-wrap
                "
              >
                <Button
                  href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister"
                  size="lg"
                  className="
                    w-full
                    border-[#001858]
                    bg-[#001858]
                    text-white
                    shadow-[0_10px_22px_rgba(0,24,88,0.14)]
                    hover:bg-[#002699]
                    hover:text-white
                    lg:w-auto
                  "
                >
                  {t('hero.register')}
                </Button>

                <Button
                  to="/collaborate"
                  variant="outline"
                  size="lg"
                  className="
                    w-full
                    border-[#F5A623]/40
                    bg-[#FFF7E8]
                    text-[#001858]
                    hover:border-[#F5A623]/70
                    hover:bg-[#FFE8B5]
                    hover:text-[#001858]
                    lg:w-auto
                  "
                >
                  {t('hero.collaborate')}
                </Button>
              </div>


              {/* Statistics */}
              <div
                className="
                  mx-auto
                  mt-8
                  flex
                  max-w-[22rem]
                  items-start
                  lg:mx-0
                  lg:mt-10
                  lg:max-w-lg
                "
              >
                {stats.map((stat, index) => (
                  <React.Fragment key={index}>
                    <div
                      className="
                        min-w-0
                        flex-1
                        px-2
                        text-center
                        first:ps-0
                        last:pe-0
                        sm:px-3
                        lg:text-start
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
                          text-[9px]
                          leading-4
                          text-[#66616A]
                          sm:text-xs
                          sm:leading-5
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
                          h-9
                          w-px
                          shrink-0
                          bg-[#001858]/10
                          sm:h-10
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
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              order-2
              mx-auto
              w-full
              max-w-[390px]
              px-3
              pb-3
              pt-1
              sm:max-w-[520px]
              lg:order-2
              lg:col-span-7
              lg:max-w-none
              lg:px-0
              lg:py-6
            "
          >

            {/* Navy plate */}
            <div
              aria-hidden="true"
              className="
                absolute
                end-[3%]
                top-[2%]
                h-[91%]
                w-[92%]
                rounded-[2rem]
                lg:end-[2%]
                lg:top-[3%]
                lg:h-[88%]
                lg:w-[92%]
                lg:rotate-[1.5deg]
                lg:rounded-[3rem]
              "
              style={{
                background:
                  'linear-gradient(145deg, #002699 0%, #001858 88%)',
                boxShadow:
                  '16px 20px 40px rgba(0,24,88,0.16)',
              }}
            />


            {/* Orange accent */}
            <div
              aria-hidden="true"
              className="
                absolute
                bottom-0
                start-[1%]
                z-[1]
                h-14
                w-14
                rounded-[1.2rem]
                bg-[#F5A623]
                shadow-[6px_8px_18px_rgba(245,166,35,0.16)]
                sm:h-20
                sm:w-20
                sm:rounded-[1.5rem]
                lg:bottom-[3%]
                lg:start-[2%]
                lg:h-24
                lg:w-24
                lg:rounded-[1.8rem]
              "
            />


            {/* Slider */}
            <div
              className="
                relative
                z-10
                overflow-hidden
                rounded-[1.8rem]
                bg-[#FFF9F1]
                p-1.5
                shadow-[8px_10px_24px_rgba(55,44,30,0.10)]
                sm:rounded-[2.2rem]
                sm:p-2
                lg:rounded-[2.6rem]
                lg:shadow-[10px_14px_30px_rgba(55,44,30,0.10)]
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
