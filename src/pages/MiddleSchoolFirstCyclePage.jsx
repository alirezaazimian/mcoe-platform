import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Brain,
  Compass,
  FlaskConical,
  HeartPulse,
  Microscope,
  Target,
  UsersRound,
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import { useLanguage } from '@/lib/LanguageContext';


const HERO_IMAGE =
  '/media/site/79b290cdc_generated_d244f2b5.jpg';


const COLORS = {
  cream: '#FBF6EE',
  paper: '#FFFDF8',

  navy: '#001858',
  blue: '#002699',
  sunlight: '#F5A623',

  text: '#222222',
  muted: '#746F68',

  paleBlue: '#E6ECFF',
  paleYellow: '#FFE8B5',

  border: '#DDD6CC',
};


const SHADOWS = {
  image:
    'inset 9px 9px 20px rgba(0, 24, 88, 0.12), inset -7px -7px 18px rgba(255, 255, 255, 0.18), 0 1px 0 rgba(255,255,255,0.12)',

  soft:
    'inset 7px 7px 16px rgba(80, 65, 45, 0.09), inset -7px -7px 16px rgba(255, 255, 255, 0.90), 0 1px 0 rgba(255,255,255,0.45)',

  yellow:
    'inset 8px 8px 18px rgba(168, 109, 18, 0.18), inset -8px -8px 18px rgba(255, 226, 166, 0.42), 0 1px 0 rgba(255,255,255,0.28)',
};


export default function MiddleSchoolFirstCyclePage() {
  const { isRTL } = useLanguage();

  const BackArrow =
    isRTL ? ArrowRight : ArrowLeft;


  const content = isRTL
    ? {
        title: 'متوسطه دوره اول',

        ages: 'پایه‌های هفتم تا نهم',

        desc:
          'دوره متوسطه اول، مرحله گذار مهمی در زندگی دانش‌آموز است. ما با ارائه برنامه‌ریزی تحصیلی دقیق، مشاوره تحصیلی و رشد مهارت‌های زندگی، دانش‌آموزان را برای مسیر متوسطه دوم و آینده تحصیلی آماده می‌کنیم.',

        features: [
          'برنامه‌ریزی تحصیلی دقیق',
          'مشاوره تحصیلی و فردی',
          'آزمایشگاه‌های مجهز',
          'مهارت‌های زندگی',
          'رشد تفکر نقاد و حل مسئله',
          'توجه به زیست سالم در دوره نوجوانی',
          'روش‌های آموزشی و پژوهشی مبتنی بر حل مسئله',
        ],

        approach:
          'نوجوان نیازمند فضایی است که استقلال و مسئولیت‌پذیری او را در کنار حمایت تربیتی پرورش دهد.',

        back: 'همه مقاطع',
        about: 'درباره این مقطع',
        programs: 'ویژگی‌ها و برنامه‌ها',
        registration: 'پیش‌ثبت‌نام',

        registrationText:
          'برای ثبت‌نام در این مقطع، فرم پیش‌ثبت‌نام را تکمیل کنید.',

        counseling: 'نیاز به مشاوره؟',
      }
    : {
        title: 'Middle School — First Cycle',

        ages: 'Grades 7 to 9',

        desc:
          'The first cycle of middle school is an important transition in a student\'s life. With precise academic planning, counseling, and life skills development, we prepare students for the secondary pathway and their academic future.',

        features: [
          'Precise academic planning',
          'Academic & personal counseling',
          'Equipped laboratories',
          'Life skills',
          'Critical thinking & problem-solving growth',
          'Healthy living in adolescence',
          'Problem-solving-based teaching & research methods',
        ],

        approach:
          'Adolescents need an environment that fosters independence and responsibility alongside educational support.',

        back: 'All levels',
        about: 'About This Level',
        programs: 'Features & Programs',
        registration: 'Pre-Registration',

        registrationText:
          'To enroll in this level, complete the pre-registration form.',

        counseling: 'Need counseling?',
      };


  const icons = [
    Target,
    UsersRound,
    FlaskConical,
    Compass,
    Brain,
    HeartPulse,
    Microscope,
  ];


  return (
    <main
      className="relative overflow-hidden"
      style={{
        background: COLORS.cream,
        color: COLORS.text,
      }}
    >

      {/* =====================================================
          HERO — SCIENTIFIC EDITORIAL
      ===================================================== */}
      <section
        className="
          relative
          min-h-[94vh]
          overflow-hidden
          pt-10
          lg:pt-14
        "
      >

        {/* large background number */}
        <div
          aria-hidden="true"
          className="
            absolute
            -top-8
            end-[3%]
            hidden
            lg:block
            text-[15rem]
            xl:text-[20rem]
            font-black
            leading-none
            select-none
          "
          style={{
            color: COLORS.navy,
            opacity: 0.035,
          }}
        >
          07
        </div>


        {/* scientific horizontal axis */}
        <div
          aria-hidden="true"
          className="
            absolute
            top-[46%]
            start-0
            end-0
            hidden
            lg:block
            h-px
          "
          style={{
            background: COLORS.border,
          }}
        >

          <motion.span
            className="
              absolute
              top-1/2
              -translate-y-1/2
              w-3
              h-3
              rounded-full
            "
            style={{
              background: COLORS.sunlight,
              boxShadow: SHADOWS.yellow,
            }}
            animate={{
              left: ['12%', '82%', '12%'],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

        </div>


        <div className="container-institutional relative z-10">

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


          {/* top content */}
          <div
            className="
              grid
              lg:grid-cols-[1.15fr_0.85fr]
              gap-10
              lg:gap-20
              items-end
              pt-16
              lg:pt-20
            "
          >

            <div>

              <Reveal>
                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <span
                    className="
                      inline-flex
                      items-center
                      justify-center
                      w-10
                      h-10
                      rounded-full
                    "
                    style={{
                      background: COLORS.sunlight,
                      color: COLORS.navy,
                    }}
                  >
                    <Atom className="w-5 h-5" />
                  </span>


                  <span
                    className="
                      text-sm
                      font-black
                      tracking-wide
                    "
                    style={{
                      color: COLORS.blue,
                    }}
                  >
                    {content.ages}
                  </span>

                </div>
              </Reveal>


              <Reveal delay={0.05}>
                <h1
                  className="
                    mt-8
                    max-w-4xl
                    text-[3.5rem]
                    sm:text-6xl
                    lg:text-[6.3rem]
                    xl:text-[7rem]
                    font-black
                    leading-[0.98]
                    tracking-[-0.055em]
                  "
                  style={{
                    color: COLORS.navy,
                  }}
                >
                  {content.title}
                </h1>
              </Reveal>

            </div>


            <Reveal delay={0.08}>
              <p
                className="
                  max-w-xl
                  pb-2
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
            </Reveal>

          </div>


          {/* lower hero */}
          <div
            className="
              grid
              lg:grid-cols-[0.72fr_1.28fr]
              gap-12
              lg:gap-20
              items-center
              mt-16
              lg:mt-20
              pb-20
            "
          >

            {/* approach + actions */}
            <div>

              <Reveal delay={0.12}>
                <div
                  className="
                    relative
                    ps-8
                  "
                >

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      start-0
                      top-1
                      bottom-1
                      w-[3px]
                      rounded-full
                    "
                    style={{
                      background: COLORS.sunlight,
                    }}
                  />


                  <p
                    className="
                      text-lg
                      sm:text-xl
                      lg:text-2xl
                      font-black
                      leading-10
                    "
                    style={{
                      color: COLORS.navy,
                    }}
                  >
                    {content.approach}
                  </p>

                </div>
              </Reveal>


              <Reveal delay={0.18}>
                <div
                  className="
                    flex
                    flex-wrap
                    gap-4
                    mt-10
                  "
                >

                  <a
                    href="#middle-research-path"
                    className="
                      inline-flex
                      min-h-14
                      items-center
                      justify-center
                      px-7
                      rounded-lg
                      font-black
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                    style={{
                      background: COLORS.navy,
                      color: '#FFFFFF',
                    }}
                  >
                    {content.programs}
                  </a>


                  <a
                    href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister"
                    className="
                      inline-flex
                      min-h-14
                      items-center
                      justify-center
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
                    }}
                  >
                    {content.registration}
                  </a>

                </div>
              </Reveal>

            </div>


            {/* HERO IMAGE / SCIENCE COMPOSITION */}
            <Reveal delay={0.1}>
              <div
                className="
                  relative
                  w-full
                  max-w-[820px]
                  mx-auto
                "
              >

                {/* formula */}
                <motion.div
                  aria-hidden="true"
                  className="
                    absolute
                    -top-10
                    end-[4%]
                    z-20
                    text-sm
                    sm:text-base
                    font-black
                  "
                  style={{
                    color: COLORS.sunlight,
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  π &nbsp; · &nbsp; ∑ &nbsp; · &nbsp; x²
                </motion.div>


                {/* photo */}
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[1.5rem]
                  "
                  style={{
                    boxShadow: SHADOWS.image,
                  }}
                >

                  <img
                    src={HERO_IMAGE}
                    alt={content.title}
                    className="
                      w-full
                      aspect-[16/9.5]
                      lg:aspect-[16/10]
                      object-cover
                      transition-transform
                      duration-1000
                      hover:scale-[1.025]
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


                  {/* tiny scientific coordinates */}
                  <div
                    className="
                      absolute
                      top-5
                      start-5
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <span
                      className="
                        w-2.5
                        h-2.5
                        rounded-full
                      "
                      style={{
                        background: COLORS.sunlight,
                      }}
                    />


                    <span
                      className="
                        text-[11px]
                        font-black
                        tracking-[0.2em]
                        text-white
                      "
                    >
                      07 / 09
                    </span>

                  </div>


                  <div
                    className="
                      absolute
                      bottom-5
                      end-5
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <Microscope
                      className="
                        w-7
                        h-7
                        text-white
                      "
                    />

                  </div>

                </div>


                {/* H2O floating label */}
                <motion.div
                  className="
                    absolute
                    -bottom-7
                    start-[8%]
                    z-20
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-5
                    py-4
                  "
                  style={{
                    background: COLORS.sunlight,
                    color: COLORS.navy,
                    boxShadow: SHADOWS.yellow,
                  }}
                  animate={{
                    y: [0, 6, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >

                  <FlaskConical className="w-5 h-5" />

                  <span className="font-black">
                    H₂O
                  </span>

                </motion.div>

              </div>
            </Reveal>

          </div>

        </div>
      </section>


      {/* =====================================================
          ABOUT
      ===================================================== */}
      <section className="py-24 lg:py-36">

        <div className="container-institutional">

          <div
            className="
              grid
              lg:grid-cols-[220px_1fr]
              gap-12
              lg:gap-24
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
                  01
                </span>


                <h2
                  className="
                    mt-5
                    text-3xl
                    sm:text-4xl
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

                <div
                  className="
                    w-20
                    h-[3px]
                    mb-8
                  "
                  style={{
                    background: COLORS.sunlight,
                  }}
                />


                <p
                  className="
                    max-w-4xl
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

              </div>
            </Reveal>

          </div>

        </div>
      </section>


      {/* =====================================================
          RESEARCH PATH
      ===================================================== */}
      <section
        id="middle-research-path"
        className="relative py-24 lg:py-36"
      >

        <div className="container-institutional">

          <Reveal>
            <div
              className="
                flex
                items-end
                justify-between
                gap-10
                mb-20
              "
            >

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
                  02
                </span>


                <h2
                  className="
                    mt-5
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


              <Atom
                className="
                  hidden
                  lg:block
                  w-9
                  h-9
                "
                style={{
                  color: COLORS.blue,
                }}
              />

            </div>
          </Reveal>


          <div
            className="
              relative
              max-w-5xl
              mx-auto
            "
          >

            {/* central path */}
            <div
              aria-hidden="true"
              className="
                absolute
                top-0
                bottom-0
                start-[22px]
                lg:start-1/2
                w-px
              "
              style={{
                background: COLORS.border,
              }}
            />


            {content.features.map(
              (feature, index) => {

                const Icon = icons[index];

                const left =
                  index % 2 === 0;

                const highlight =
                  index === 2 ||
                  index === 4 ||
                  index === 6;


                return (
                  <Reveal
                    key={feature}
                    delay={index * 0.04}
                  >

                    <div
                      className="
                        relative
                        grid
                        lg:grid-cols-2
                        gap-8
                        lg:gap-20
                        min-h-[150px]
                        pb-12
                      "
                    >

                      {/* NODE */}
                      <motion.div
                        aria-hidden="true"
                        className="
                          absolute
                          start-[15px]
                          lg:start-1/2
                          top-4
                          lg:-translate-x-1/2
                          w-4
                          h-4
                          rounded-full
                          z-20
                        "
                        style={{
                          background:
                            highlight
                              ? COLORS.sunlight
                              : COLORS.blue,

                          boxShadow:
                            `0 0 0 7px ${COLORS.cream}`,
                        }}
                        whileHover={{
                          scale: 1.4,
                        }}
                      />


                      {/* desktop left */}
                      <div
                        className={`
                          ps-14
                          lg:ps-0
                          ${
                            left
                              ? 'lg:pe-10'
                              : 'lg:col-start-2 lg:ps-10'
                          }
                        `}
                      >

                        <motion.div
                          className="
                            group
                            relative
                            border-b
                            pb-7
                          "
                          style={{
                            borderColor: COLORS.border,
                          }}
                          whileHover={{
                            x:
                              isRTL
                                ? -6
                                : 6,
                          }}
                          transition={{
                            duration: 0.22,
                          }}
                        >

                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-6
                            "
                          >

                            <div>

                              <span
                                className="
                                  text-xs
                                  font-black
                                "
                                style={{
                                  color:
                                    highlight
                                      ? COLORS.sunlight
                                      : COLORS.blue,
                                }}
                              >
                                {String(index + 1).padStart(2, '0')}
                              </span>


                              <h3
                                className="
                                  mt-3
                                  text-lg
                                  sm:text-xl
                                  lg:text-2xl
                                  font-black
                                  leading-9
                                "
                                style={{
                                  color: COLORS.navy,
                                }}
                              >
                                {feature}
                              </h3>

                            </div>


                            <div
                              className="
                                shrink-0
                                w-12
                                h-12
                                rounded-full
                                flex
                                items-center
                                justify-center
                                opacity-40
                                group-hover:opacity-100
                                group-hover:scale-110
                                transition-all
                                duration-300
                              "
                              style={{
                                background:
                                  highlight
                                    ? COLORS.paleYellow
                                    : COLORS.paleBlue,

                                color:
                                  highlight
                                    ? COLORS.navy
                                    : COLORS.blue,
                              }}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                          </div>

                        </motion.div>

                      </div>

                    </div>

                  </Reveal>
                );
              }
            )}

          </div>

        </div>
      </section>


      {/* =====================================================
          SCIENCE FOCUS
      ===================================================== */}
      <section className="py-24 lg:py-36">

        <div className="container-institutional">

          <Reveal>

            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
              "
              style={{
                background: COLORS.navy,
              }}
            >

              {/* slow atom */}
              <motion.div
                aria-hidden="true"
                className="
                  absolute
                  -top-24
                  -end-20
                  opacity-[0.08]
                "
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 32,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Atom className="w-80 h-80 text-white" />
              </motion.div>


              <div
                className="
                  relative
                  z-10
                  px-8
                  py-14
                  sm:px-12
                  lg:px-16
                  lg:py-20
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    mb-14
                  "
                >

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


                  <div
                    className="
                      w-16
                      h-px
                      bg-white/20
                    "
                  />


                  <FlaskConical
                    className="w-5 h-5"
                    style={{
                      color: COLORS.sunlight,
                    }}
                  />

                </div>


                <div
                  className="
                    grid
                    lg:grid-cols-3
                    gap-0
                  "
                >

                  {[2, 4, 6].map(
                    (featureIndex, position) => (
                      <motion.div
                        key={featureIndex}
                        className={`
                          relative
                          py-7
                          lg:px-10
                          ${
                            position > 0
                              ? 'lg:border-s lg:border-white/15'
                              : ''
                          }
                        `}
                        whileHover={{
                          y: -4,
                        }}
                      >

                        <span
                          className="
                            text-xs
                            font-black
                          "
                          style={{
                            color: COLORS.sunlight,
                          }}
                        >
                          0{featureIndex + 1}
                        </span>


                        <h3
                          className="
                            mt-5
                            text-xl
                            sm:text-2xl
                            font-black
                            leading-9
                            text-white
                          "
                        >
                          {content.features[featureIndex]}
                        </h3>

                      </motion.div>
                    )
                  )}

                </div>


                {/* subtle formulas */}
                <div
                  aria-hidden="true"
                  className="
                    mt-14
                    pt-8
                    border-t
                    border-white/10
                    flex
                    flex-wrap
                    items-center
                    gap-8
                    text-white/25
                    text-lg
                    font-black
                  "
                >
                  <span>H₂O</span>
                  <span>π</span>
                  <span>∑</span>
                  <span>x²</span>
                </div>

              </div>

            </div>

          </Reveal>

        </div>
      </section>


      {/* =====================================================
          APPROACH
      ===================================================== */}
      <section className="relative py-24 lg:py-36">

        <div className="container-institutional">

          <div
            className="
              grid
              lg:grid-cols-[180px_1fr]
              gap-12
              lg:gap-20
              items-start
            "
          >

            <Reveal>

              <div
                className="
                  relative
                  w-32
                  h-32
                  flex
                  items-center
                  justify-center
                "
              >

                <motion.div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    rounded-full
                    border
                  "
                  style={{
                    borderColor: COLORS.sunlight,
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >

                  <span
                    className="
                      absolute
                      top-1/2
                      -start-2
                      w-4
                      h-4
                      rounded-full
                    "
                    style={{
                      background: COLORS.sunlight,
                    }}
                  />

                </motion.div>


                <Atom
                  className="w-9 h-9"
                  style={{
                    color: COLORS.navy,
                  }}
                />

              </div>

            </Reveal>


            <Reveal delay={0.08}>

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
                  04
                </span>


                <p
                  className="
                    mt-6
                    max-w-5xl
                    text-3xl
                    sm:text-4xl
                    lg:text-5xl
                    font-black
                    leading-[1.55]
                  "
                  style={{
                    color: COLORS.navy,
                  }}
                >
                  {content.approach}
                </p>

              </div>

            </Reveal>

          </div>

        </div>
      </section>


      {/* =====================================================
          REGISTRATION
      ===================================================== */}
      <section className="py-24 lg:py-32">

        <div className="container-institutional">

          <div
            className="
              border-t
              pt-14
              grid
              lg:grid-cols-[1fr_auto]
              gap-12
              items-center
            "
            style={{
              borderColor: COLORS.border,
            }}
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
                    mt-5
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
                    mt-5
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

              <div className="min-w-[300px]">

                <a
                  href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister"
                  className="
                    flex
                    min-h-14
                    items-center
                    justify-center
                    px-8
                    rounded-lg
                    font-black
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                  style={{
                    background: COLORS.navy,
                    color: '#FFFFFF',
                  }}
                >
                  {content.registration}
                </a>


                <div
                  className="
                    mt-6
                    text-sm
                  "
                >

                  <span
                    style={{
                      color: COLORS.muted,
                    }}
                  >
                    {content.counseling}
                  </span>


                  <a
                    href="mailto:school@mcoe.ir"
                    className="
                      block
                      mt-2
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