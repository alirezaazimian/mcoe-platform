import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  HeartPulse,
  Lightbulb,
  Palette,
  PenLine,
  Sparkles,
  UsersRound,
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/AppButton';
import { useLanguage } from '@/lib/LanguageContext';


const HERO_IMAGE =
  '/media/site/762d5af46_generated_2f7e8049.jpg';


const COLORS = {
  cream: '#FBF6EE',
  paper: '#FFFDF8',
  navy: '#001858',
  blue: '#002699',
  sunlight: '#F5A623',
  text: '#222222',

  paleBlue: '#E4EAFF',
  paleBlueStrong: '#D5DFFF',
  paleYellow: '#FFE8B5',

  line: '#D8D1C6',
  muted: '#77716A',
};


const SHADOWS = {
  paper:
    '0 20px 55px rgba(44, 35, 24, 0.10)',

  lifted:
    '0 18px 35px rgba(0, 24, 88, 0.13)',

  yellow:
    '0 14px 30px rgba(245, 166, 35, 0.18)',
};


export default function ElementaryFirstCyclePage() {
  const { isRTL, t } = useLanguage();

  const BackArrow =
    isRTL ? ArrowRight : ArrowLeft;


  const content = isRTL
    ? {
        title: 'دبستان دوره اول',

        ages: 'پایه‌های اول تا سوم',

        desc:
          'در دوره اول دبستان، پایه‌های یادگیری بنیادین شکل می‌گیرد. ما با تمرکز بر سواد خواندن و نوشتن، تفکر ریاضی و مهارت‌های اجتماعی، فضایی امن و الهام‌بخش برای کشف دنیای دانش فراهم می‌کنیم.',

        features: [
          'رشد سواد خواندن و فرهنگ نوشتن',
          'تفکر ریاضی بنیادین',
          'مهارت‌های اجتماعی',
          'هنر و خلاقیت',
          'آموزش فعال و تعاملی',
          'ارزیابی تکوینی',
          'تفکر علمی',
          'توجه به سلامت جسمی و حرکتی',
        ],

        approach:
          'یادگیری در این سن باید شاد و معنادار باشد — یادگیری‌ای که با کنجکاوی کودک همراه است.',

        back: 'همه مقاطع',
        about: 'درباره این مقطع',
        programs: 'ویژگی‌ها و برنامه‌ها',
        registration: 'پیش‌ثبت‌نام',

        registrationText:
          'برای ثبت‌نام در این مقطع، فرم پیش‌ثبت‌نام را تکمیل کنید.',

        counseling: 'نیاز به مشاوره؟',
      }
    : {
        title: 'Elementary — First Cycle',

        ages: 'Grades 1 to 3',

        desc:
          'In the first cycle of elementary school, the foundations of learning are laid. With a focus on literacy, mathematical thinking, and social skills, we provide a safe and inspiring environment for discovering the world of knowledge.',

        features: [
          'Growth of reading literacy & writing culture',
          'Basic mathematical thinking',
          'Social skills',
          'Art & creativity',
          'Active & interactive learning',
          'Formative assessment',
          'Scientific thinking',
          'Physical & motor health',
        ],

        approach:
          'Learning at this age should be joyful and meaningful — learning that accompanies the child\'s curiosity.',

        back: 'All levels',
        about: 'About This Level',
        programs: 'Features & Programs',
        registration: 'Pre-Registration',

        registrationText:
          'To enroll in this level, complete the pre-registration form.',

        counseling: 'Need counseling?',
      };


  const icons = [
    PenLine,
    Calculator,
    UsersRound,
    Palette,
    Sparkles,
    Check,
    Lightbulb,
    HeartPulse,
  ];


  return (
    <main
      className="relative overflow-hidden"
      style={{
        background: COLORS.cream,
        color: COLORS.text,
      }}
    >

      {/* =========================================
          HERO — LEARNING JOURNAL
      ========================================= */}
      <section className="relative min-h-[92vh] overflow-hidden">

        {/* notebook-grid background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage: `
              linear-gradient(${COLORS.blue} 1px, transparent 1px),
              linear-gradient(90deg, ${COLORS.blue} 1px, transparent 1px)
            `,
            backgroundSize: '52px 52px',
          }}
        />


        {/* vertical notebook margin */}
        <div
          aria-hidden="true"
          className="
            absolute
            top-0
            bottom-0
            start-[7%]
            hidden
            lg:block
            w-px
          "
          style={{
            background: COLORS.sunlight,
            opacity: 0.6,
          }}
        />


        <div className="container-institutional relative z-10 py-10 lg:py-16">

          <Reveal>
            <Link
              to="/levels"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                transition-transform
                hover:-translate-x-1
                rtl:hover:translate-x-1
              "
              style={{
                color: COLORS.navy,
              }}
            >
              <BackArrow className="w-4 h-4" />

              {content.back}
            </Link>
          </Reveal>


          <div
            className="
              grid
              lg:grid-cols-[0.9fr_1.1fr]
              gap-12
              lg:gap-20
              items-center
              min-h-[78vh]
            "
          >

            {/* ======================
                HERO TEXT
            ====================== */}
            <div>

              <Reveal>
                <div
                  className="
                    inline-flex
                    items-center
                    gap-3
                    px-4
                    py-2
                    border
                    rounded-lg
                    text-sm
                    font-black
                  "
                  style={{
                    background: COLORS.paper,
                    borderColor: COLORS.line,
                    color: COLORS.navy,
                  }}
                >
                  <span
                    className="
                      inline-flex
                      w-8
                      h-8
                      rounded-md
                      items-center
                      justify-center
                      font-black
                    "
                    style={{
                      background: COLORS.sunlight,
                    }}
                  >
                    01
                  </span>

                  {content.ages}
                </div>
              </Reveal>


              <Reveal delay={0.05}>
                <h1
                  className="
                    mt-8
                    text-[3.2rem]
                    sm:text-6xl
                    lg:text-[5.3rem]
                    font-black
                    leading-[1.05]
                    tracking-[-0.045em]
                  "
                  style={{
                    color: COLORS.navy,
                  }}
                >
                  {content.title}
                </h1>
              </Reveal>


              <Reveal delay={0.1}>
                <div
                  className="
                    mt-8
                    max-w-xl
                    ps-6
                    border-s-4
                  "
                  style={{
                    borderColor: COLORS.sunlight,
                  }}
                >
                  <p
                    className="
                      text-base
                      sm:text-lg
                      leading-8
                    "
                    style={{
                      color: COLORS.muted,
                    }}
                  >
                    {content.desc}
                  </p>
                </div>
              </Reveal>


              <Reveal delay={0.16}>
                <div className="flex flex-wrap gap-4 mt-10">

                  <a
                    href="#programs"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      min-h-14
                      px-7
                      rounded-lg
                      font-black
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                    style={{
                      background: COLORS.navy,
                      color: '#fff',
                      boxShadow: SHADOWS.lifted,
                    }}
                  >
                    {content.programs}
                  </a>


                  <a
                    href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      min-h-14
                      px-7
                      rounded-lg
                      font-black
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                    style={{
                      background: COLORS.sunlight,
                      color: COLORS.navy,
                      boxShadow: SHADOWS.yellow,
                    }}
                  >
                    {content.registration}
                  </a>

                </div>
              </Reveal>

            </div>


            {/* ======================
                HERO JOURNAL
            ====================== */}
            <Reveal delay={0.08}>
              <div className="relative max-w-[720px] mx-auto w-full py-16">

                {/* back blue sheet */}
                <motion.div
                  aria-hidden="true"
                  className="
                    absolute
                    top-[8%]
                    end-[2%]
                    w-[88%]
                    h-[80%]
                    rounded-[2rem]
                  "
                  style={{
                    background: COLORS.blue,
                  }}
                  animate={{
                    rotate: [4, 5, 4],
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />


                {/* yellow bookmark */}
                <motion.div
                  aria-hidden="true"
                  className="
                    absolute
                    top-5
                    end-[12%]
                    z-30
                    w-16
                    h-28
                    rounded-b-2xl
                  "
                  style={{
                    background: COLORS.sunlight,
                    boxShadow: SHADOWS.yellow,
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />


                {/* Main journal */}
                <div
                  className="
                    relative
                    z-10
                    grid
                    sm:grid-cols-[1.18fr_0.82fr]
                    overflow-hidden
                    rounded-[2rem]
                    border
                  "
                  style={{
                    background: COLORS.paper,
                    borderColor: COLORS.line,
                    boxShadow: SHADOWS.paper,
                  }}
                >

                  {/* left visual page */}
                  <div className="relative min-h-[520px]">

                    <img
                      src={HERO_IMAGE}
                      alt={content.title}
                      className="
                        absolute
                        inset-0
                        w-full
                        h-full
                        object-cover
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#001858]/55
                        via-transparent
                        to-transparent
                      "
                    />


                    <div
                      className="
                        absolute
                        bottom-7
                        start-7
                        end-7
                      "
                    >
                      <span
                        className="
                          inline-flex
                          px-3
                          py-2
                          rounded-md
                          text-xs
                          font-black
                        "
                        style={{
                          background: COLORS.sunlight,
                          color: COLORS.navy,
                        }}
                      >
                        {content.ages}
                      </span>
                    </div>

                  </div>


                  {/* right notebook page */}
                  <div
                    className="
                      relative
                      p-7
                      sm:p-8
                      flex
                      flex-col
                    "
                  >

                    {/* notebook lines */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.11]"
                      style={{
                        backgroundImage:
                          `linear-gradient(${COLORS.blue} 1px, transparent 1px)`,

                        backgroundSize:
                          '100% 38px',
                      }}
                    />


                    <div className="relative z-10">

                      <BookOpen
                        className="w-8 h-8"
                        style={{
                          color: COLORS.blue,
                        }}
                      />


                      <p
                        className="
                          mt-8
                          text-lg
                          leading-9
                          font-black
                        "
                        style={{
                          color: COLORS.navy,
                        }}
                      >
                        {content.approach}
                      </p>

                    </div>


                    {/* subject markers */}
                    <div
                      className="
                        relative
                        z-10
                        mt-auto
                        pt-10
                        grid
                        grid-cols-2
                        gap-3
                      "
                    >

                      <motion.div
                        className="
                          aspect-square
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          text-xl
                          font-black
                        "
                        style={{
                          background: COLORS.paleYellow,
                          color: COLORS.navy,
                        }}
                        whileHover={{
                          rotate: -4,
                          scale: 1.04,
                        }}
                      >
                        A B
                      </motion.div>


                      <motion.div
                        className="
                          aspect-square
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          text-xl
                          font-black
                        "
                        style={{
                          background: COLORS.paleBlue,
                          color: COLORS.blue,
                        }}
                        whileHover={{
                          rotate: 4,
                          scale: 1.04,
                        }}
                      >
                        1 2 3
                      </motion.div>

                    </div>

                  </div>
                </div>


                {/* loose paper note */}
                <motion.div
                  className="
                    absolute
                    -bottom-3
                    -start-4
                    z-30
                    max-w-[220px]
                    px-5
                    py-4
                    rounded-xl
                    font-bold
                    text-sm
                  "
                  style={{
                    background: COLORS.paleYellow,
                    color: COLORS.navy,
                    boxShadow: SHADOWS.yellow,
                  }}
                  animate={{
                    y: [0, 6, 0],
                    rotate: [-4, -2, -4],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {content.approach}
                </motion.div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* =========================================
          ABOUT — EDITORIAL
      ========================================= */}
      <section className="relative py-24 lg:py-32">

        <div className="container-institutional">

          <div
            className="
              grid
              lg:grid-cols-[0.55fr_1.45fr]
              gap-10
              lg:gap-20
            "
          >

            <Reveal>
              <div>

                <span
                  className="
                    text-sm
                    font-black
                    tracking-wider
                  "
                  style={{
                    color: COLORS.sunlight,
                  }}
                >
                  02
                </span>


                <h2
                  className="
                    mt-4
                    text-3xl
                    lg:text-5xl
                    font-black
                  "
                  style={{
                    color: COLORS.navy,
                  }}
                >
                  {content.about}
                </h2>

              </div>
            </Reveal>


            <Reveal delay={0.08}>
              <div>

                <p
                  className="
                    text-xl
                    lg:text-2xl
                    leading-10
                  "
                  style={{
                    color: COLORS.muted,
                  }}
                >
                  {content.desc}
                </p>


                <div
                  className="
                    mt-10
                    h-px
                    w-full
                  "
                  style={{
                    background: COLORS.line,
                  }}
                />

              </div>
            </Reveal>

          </div>

        </div>
      </section>


      {/* =========================================
          LEARNING PATH
      ========================================= */}
      <section
        id="programs"
        className="relative py-24 lg:py-32"
      >

        <div className="container-institutional">

          <Reveal>
            <div className="max-w-3xl">

              <span
                className="
                  text-sm
                  font-black
                "
                style={{
                  color: COLORS.sunlight,
                }}
              >
                03
              </span>


              <h2
                className="
                  mt-4
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-black
                "
                style={{
                  color: COLORS.navy,
                }}
              >
                {content.programs}
              </h2>

            </div>
          </Reveal>


          {/* learning timeline */}
          <div className="relative mt-20">

            {/* desktop path */}
            <div
              aria-hidden="true"
              className="
                absolute
                hidden
                lg:block
                top-1/2
                start-0
                end-0
                h-[3px]
              "
              style={{
                background:
                  `linear-gradient(90deg,
                    ${COLORS.blue},
                    ${COLORS.sunlight},
                    ${COLORS.blue}
                  )`,
              }}
            />


            <div
              className="
                relative
                grid
                sm:grid-cols-2
                lg:grid-cols-4
                gap-6
                lg:gap-y-20
              "
            >

              {content.features.map(
                (feature, index) => {

                  const Icon =
                    icons[index];

                  const isUpper =
                    index % 2 === 0;

                  const isYellow =
                    index === 1 ||
                    index === 3 ||
                    index === 6;


                  return (
                    <Reveal
                      key={feature}
                      delay={index * 0.04}
                    >
                      <motion.article
                        className={`
                          relative
                          min-h-[220px]
                          rounded-2xl
                          border
                          p-6
                          ${
                            isUpper
                              ? 'lg:-translate-y-12'
                              : 'lg:translate-y-12'
                          }
                        `}
                        style={{
                          background:
                            isYellow
                              ? COLORS.paleYellow
                              : COLORS.paper,

                          borderColor:
                            isYellow
                              ? COLORS.sunlight
                              : COLORS.line,

                          boxShadow:
                            isYellow
                              ? SHADOWS.yellow
                              : SHADOWS.paper,
                        }}
                        whileHover={{
                          y:
                            isUpper
                              ? -55
                              : 42,

                          rotate:
                            index % 2 === 0
                              ? -1
                              : 1,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >

                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-4
                          "
                        >

                          <div
                            className="
                              w-12
                              h-12
                              rounded-xl
                              flex
                              items-center
                              justify-center
                            "
                            style={{
                              background:
                                isYellow
                                  ? COLORS.sunlight
                                  : COLORS.navy,

                              color:
                                isYellow
                                  ? COLORS.navy
                                  : '#fff',
                            }}
                          >
                            <Icon className="w-6 h-6" />
                          </div>


                          <span
                            className="
                              font-black
                              text-sm
                            "
                            style={{
                              color: COLORS.blue,
                              opacity: 0.35,
                            }}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>

                        </div>


                        <p
                          className="
                            mt-12
                            text-lg
                            font-black
                            leading-8
                          "
                          style={{
                            color: COLORS.navy,
                          }}
                        >
                          {feature}
                        </p>

                      </motion.article>
                    </Reveal>
                  );
                }
              )}

            </div>

          </div>
        </div>
      </section>


      {/* =========================================
          APPROACH QUOTE
      ========================================= */}
      <section className="relative py-24 lg:py-32">

        <div className="container-institutional">

          <Reveal>
            <div
              className="
                relative
                overflow-hidden
                grid
                lg:grid-cols-[120px_1fr]
                rounded-[2rem]
              "
              style={{
                background: COLORS.navy,
                boxShadow: SHADOWS.lifted,
              }}
            >

              {/* number rail */}
              <div
                className="
                  flex
                  lg:flex-col
                  items-center
                  justify-center
                  gap-3
                  px-6
                  py-7
                "
                style={{
                  background: COLORS.sunlight,
                  color: COLORS.navy,
                }}
              >

                <BookOpen className="w-7 h-7" />

                <span className="font-black">
                  04
                </span>

              </div>


              <div
                className="
                  relative
                  px-8
                  py-12
                  sm:px-12
                  lg:px-16
                  lg:py-16
                "
              >

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    top-8
                    end-10
                    text-[10rem]
                    leading-none
                    font-black
                    text-white/[0.04]
                  "
                >
                  “
                </div>


                <p
                  className="
                    relative
                    z-10
                    max-w-4xl
                    text-2xl
                    sm:text-3xl
                    lg:text-4xl
                    font-black
                    leading-[1.65]
                    text-white
                  "
                >
                  {content.approach}
                </p>

              </div>

            </div>
          </Reveal>

        </div>
      </section>


      {/* =========================================
          REGISTRATION
      ========================================= */}
      <section className="relative py-24 lg:py-32">

        <div className="container-institutional">

          <div
            className="
              grid
              lg:grid-cols-[1fr_400px]
              gap-10
              lg:gap-16
              items-center
            "
          >

            <Reveal>
              <div>

                <span
                  className="
                    text-sm
                    font-black
                  "
                  style={{
                    color: COLORS.sunlight,
                  }}
                >
                  05
                </span>


                <h2
                  className="
                    mt-4
                    text-3xl
                    sm:text-4xl
                    lg:text-5xl
                    font-black
                  "
                  style={{
                    color: COLORS.navy,
                  }}
                >
                  {content.registration}
                </h2>


                <p
                  className="
                    mt-6
                    max-w-xl
                    text-lg
                    leading-8
                  "
                  style={{
                    color: COLORS.muted,
                  }}
                >
                  {content.registrationText}
                </p>

              </div>
            </Reveal>


            <Reveal delay={0.08}>
              <div
                className="
                  relative
                  rounded-[2rem]
                  border
                  p-7
                "
                style={{
                  background: COLORS.paper,
                  borderColor: COLORS.line,
                  boxShadow: SHADOWS.paper,
                }}
              >

                {/* notebook-top strip */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    top-0
                    start-8
                    end-8
                    h-2
                    rounded-b-full
                  "
                  style={{
                    background: COLORS.sunlight,
                  }}
                />


                <Button
                  href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister"
                  className="w-full mb-3"
                >
                  {t('hero.register')}
                </Button>


                <Button
                  href="https://survey.porsline.ir/s/qP6AU8hR"
                  variant="outline"
                  className="w-full"
                  icon={false}
                >
                  {t('hero.collaborate')}
                </Button>


                <div
                  className="
                    mt-6
                    pt-5
                    border-t
                  "
                  style={{
                    borderColor: COLORS.line,
                  }}
                >

                  <p
                    className="
                      text-xs
                      mb-2
                    "
                    style={{
                      color: COLORS.muted,
                    }}
                  >
                    {content.counseling}
                  </p>


                  <a
                    href="mailto:school@mcoe.ir"
                    className="
                      text-sm
                      font-black
                      hover:underline
                    "
                    style={{
                      color: COLORS.blue,
                    }}
                  >
                    school@mcoe.ir
                  </a>

                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

    </main>
  );
}