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
    <section
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #FCF9F4 0%, #F8F4F8 38%, #EEF2FA 72%, #FFF7E8 100%)',
      }}
    >
      {/* soft ambient shapes */}
      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -end-32
          w-[32rem]
          h-[32rem]
          rounded-full
          bg-[#DDD5E8]/45
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-48
          -start-40
          w-[34rem]
          h-[34rem]
          rounded-full
          bg-[#E8D9BF]/35
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          top-[20%]
          start-[46%]
          w-48
          h-48
          rounded-full
          bg-white/70
          blur-3xl
        "
      />


      <div className="container-institutional relative z-10">
        <div
          className="
            grid
            lg:grid-cols-12
            items-center
            gap-12
            lg:gap-16
            min-h-[78vh]
            py-14
            lg:py-20
          "
        >
          {/* Copy */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                inline-flex
                items-center
                gap-3
                mb-7
              "
            >
              <span className="flex items-center gap-1">
                <span className="w-4 h-px bg-[#AE91B7]" />
                <span className="w-2 h-px bg-[#002699]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              </span>

              <span
                className="
                  text-xs
                  sm:text-sm
                  font-semibold
                  tracking-wide
                  text-[#75637E]
                "
              >
                {isRTL
                  ? 'فضایی برای یادگیری، رشد و شکوفایی'
                  : 'A place to learn, grow and flourish'}
              </span>
            </motion.div>


            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.08,
              }}
              className="
                max-w-xl
                text-[2.15rem]
                sm:text-5xl
                lg:text-[3.45rem]
                font-bold
                leading-[1.25]
                tracking-[-0.02em]
                text-[#001858]
              "
            >
              {t('hero.title')}
            </motion.h1>


            <motion.p
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.16,
              }}
              className="
                max-w-lg
                mt-6
                text-sm
                sm:text-base
                leading-8
                text-[#66616A]
              "
            >
              {isRTL
                ? 'محیطی پویا، امن و الهام‌بخش برای پرورش دانش، خلاقیت و اعتمادبه‌نفس نسل آینده.'
                : 'A thoughtful, inspiring and safe environment where knowledge, creativity and confidence can grow together.'}
            </motion.p>


            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.24,
              }}
              className="
                flex
                flex-wrap
                items-center
                gap-3
                mt-8
              "
            >
              <Button
                href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister"
                size="lg"
                className="
                  bg-[#14213D]
                  text-white
                  border-[#14213D]
                  hover:bg-[#263658]
                  hover:text-white
                  shadow-[0_12px_30px_rgba(20,33,61,0.16)]
                "
              >
                {t('hero.register')}
              </Button>

              <Button
                to="/collaborate"
                variant="outline"
                size="lg"
                className="
                  bg-white/60
                  border-[#D7CFDC]
                  text-[#14213D]
                  backdrop-blur-sm
                  hover:bg-white
                "
              >
                {t('hero.collaborate')}
              </Button>
            </motion.div>


            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.36,
              }}
              className="
                grid
                grid-cols-3
                gap-2
                sm:gap-3
                mt-11
                max-w-lg
              "
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="
                    rounded-2xl
                    border
                    border-white/80
                    bg-white/45
                    backdrop-blur-md
                    px-3
                    sm:px-4
                    py-4
                    shadow-[0_10px_35px_rgba(59,49,67,0.055)]
                  "
                >
                  <div
                    className="
                      text-xl
                      sm:text-2xl
                      font-bold
                      text-[#14213D]
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
                      sm:text-xs
                      leading-5
                      text-[#7B7580]
                    "
                  >
                    {isRTL
                      ? stat.faLabel
                      : stat.enLabel}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>


          {/* Visual composition */}
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
            className="
              relative
              lg:col-span-7
              order-1
              lg:order-2
              px-2
              sm:px-6
              lg:px-0
            "
          >
            {/* rear lavender layer */}
            <div
              className="
                absolute
                top-8
                -end-3
                sm:-end-5
                w-[85%]
                h-[82%]
                rounded-[3rem]
                bg-[#DCD5E7]
                rotate-[3deg]
              "
            />

            {/* rear champagne layer */}
            <div
              className="
                absolute
                bottom-4
                -start-2
                w-[72%]
                h-[72%]
                rounded-[3rem]
                bg-[#E8DCC9]
                -rotate-[3deg]
                opacity-85
              "
            />


            <div className="relative z-10">
              <HeroSlider />
            </div>


            {/* Floating top note */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`
                absolute
                z-20
                top-2
                ${isRTL ? '-right-2' : '-left-2'}
                sm:top-8
                sm:${isRTL ? '-right-5' : '-left-5'}
                hidden
                sm:flex
                items-center
                gap-3
                rounded-2xl
                bg-white/85
                backdrop-blur-xl
                border
                border-white
                px-4
                py-3
                shadow-[0_14px_36px_rgba(68,55,78,0.12)]
              `}
            >
              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-[#EEE9F3]
                  text-[#806B8C]
                  flex
                  items-center
                  justify-center
                "
              >
                <Sparkles className="w-4 h-4" />
              </div>

              <div>
                <div className="text-xs font-bold text-[#14213D]">
                  {isRTL
                    ? 'رشد با اعتماد'
                    : 'Grow with confidence'}
                </div>

                <div className="text-[10px] mt-0.5 text-[#807986]">
                  {isRTL
                    ? 'آموزش • خلاقیت • آینده'
                    : 'Learning • Creativity • Future'}
                </div>
              </div>
            </motion.div>


            {/* small accent */}
            <div
              className="
                absolute
                z-20
                -bottom-3
                end-8
                w-16
                h-16
                rounded-[1.4rem]
                bg-[#C8BCD3]
                opacity-80
                rotate-12
                hidden
                lg:block
              "
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}