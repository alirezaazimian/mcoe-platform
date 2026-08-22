import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  BookOpen,
  Brain,
  FlaskConical,
  Layers3,
  Search,
  UsersRound,
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
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
  muted: '#756F67',

  paleBlue: '#E5EBFF',
  paleBlueStrong: '#D5DFFF',
  paleYellow: '#FFE8B5',

  border: '#DED7CD',
};


const SHADOWS = {
  soft:
    '0 20px 50px rgba(45, 37, 27, 0.09)',

  blue:
    '0 22px 48px rgba(0, 24, 88, 0.16)',

  yellow:
    '0 16px 34px rgba(245, 166, 35, 0.17)',
};


export default function ElementarySecondCyclePage() {
  const { isRTL, t } = useLanguage();

  const BackArrow =
    isRTL ? ArrowRight : ArrowLeft;


  const content = isRTL
    ? {
        title: 'دبستان دوره دوم',

        ages: 'پایه‌های چهارم تا ششم',

        desc:
          'در دوره دوم دبستان، مهارت‌های تحلیلی و تفکر انتقادی دانش‌آموزان توسعه می‌یابد. ما با ارائه پروژه‌های میان‌رشته‌ای و فرصت‌های یادگیری عملی، آماده‌سازی برای متوسطه را هدفمند پیش می‌بریم.',

        features: [
          'تفکر انتقادی',
          'پروژه‌های میان‌رشته‌ای',
          'علوم تجربی عملی',
          'مهارت‌های پژوهشی',
          'کار گروهی',
          'تسلط بر فرهنگ و ادبیات فارسی',
        ],

        approach:
          'در این مرحله، دانش‌آموز از یادگیرنده‌ی منفعل به پژوهشگر فعال تبدیل می‌شود.',

        back: 'همه مقاطع',
        about: 'درباره این مقطع',
        programs: 'ویژگی‌ها و برنامه‌ها',
        registration: 'پیش‌ثبت‌نام',

        registrationText:
          'برای ثبت‌نام در این مقطع، فرم پیش‌ثبت‌نام را تکمیل کنید.',

        counseling: 'نیاز به مشاوره؟',
      }
    : {
        title: 'Elementary — Second Cycle',

        ages: 'Grades 4 to 6',

        desc:
          'In the second cycle, students\' analytical skills and critical thinking are developed. Through interdisciplinary projects and hands-on learning opportunities, we purposefully prepare them for middle school.',

        features: [
          'Critical thinking',
          'Interdisciplinary projects',
          'Hands-on science',
          'Research skills',
          'Collaborative work',
          'Mastery of Persian culture & literature',
        ],

        approach:
          'At this stage, the student transforms from a passive learner into an active researcher.',

        back: 'All levels',
        about: 'About This Level',
        programs: 'Features & Programs',
        registration: 'Pre-Registration',

        registrationText:
          'To enroll in this level, complete the pre-registration form.',

        counseling: 'Need counseling?',
      };


  const featureIcons = [
    Brain,
    Layers3,
    FlaskConical,
    Search,
    UsersRound,
    BookOpen,
  ];


  return (
    <main
      className="relative overflow-hidden"
      style={{
        background: COLORS.cream,
        color: COLORS.text,
      }}
    >

      {/* ========================================
          HERO
      ======================================== */}
      <section className="relative min-h-[92vh] overflow-hidden">

        {/* restrained blue background mass */}
        <div
          aria-hidden="true"
          className="
            absolute
            top-0
            end-0
            w-[46%]
            h-full
            hidden
            lg:block
          "
          style={{
            background:
              'linear-gradient(165deg, #002699 0%, #001858 78%)',
          }}
        />


        {/* sunlight marker */}
        <motion.div
          aria-hidden="true"
          className="
            absolute
            top-[17%]
            end-[43%]
            hidden
            lg:block
            w-20
            h-20
            rounded-2xl
            rotate-12
          "
          style={{
            background: COLORS.sunlight,
            boxShadow: SHADOWS.yellow,
          }}
          animate={{
            y: [0, -6, 0],
            rotate: [12, 15, 12],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
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
              lg:grid-cols-[0.92fr_1.08fr]
              gap-12
              lg:gap-20
              items-center
              min-h-[78vh]
            "
          >

            {/* Hero copy */}
            <div>

              <Reveal>
                <div
                  className="
                    inline-flex
                    items-center
                    gap-3
                    px-4
                    py-2
                    rounded-lg
                    border
                    text-sm
                    font-black
                  "
                  style={{
                    background: COLORS.paper,
                    borderColor: COLORS.border,
                    color: COLORS.navy,
                  }}
                >
                  <span
                    className="
                      w-9
                      h-9
                      rounded-md
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      background: COLORS.sunlight,
                    }}
                  >
                    <Search className="w-4 h-4" />
                  </span>

                  {content.ages}
                </div>
              </Reveal>


              <Reveal delay={0.05}>
                <h1
                  className="
                    mt-8
                    text-[3rem]
                    sm:text-6xl
                    lg:text-[5.1rem]
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
                <p
                  className="
                    mt-8
                    max-w-xl
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


              <Reveal delay={0.15}>
                <div
                  className="
                    mt-9
                    max-w-xl
                    flex
                    gap-5
                    items-start
                  "
                >
                  <div
                    className="
                      mt-1
                      w-2
                      min-h-24
                      rounded-full
                      shrink-0
                    "
                    style={{
                      background: COLORS.sunlight,
                    }}
                  />

                  <p
                    className="
                      text-lg
                      sm:text-xl
                      font-black
                      leading-9
                    "
                    style={{
                      color: COLORS.navy,
                    }}
                  >
                    {content.approach}
                  </p>
                </div>
              </Reveal>


              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-4 mt-10">

                  <a
                    href="#second-cycle-programs"
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
                      boxShadow: SHADOWS.blue,
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


            {/* ==================================
                PROJECT BOARD
            ================================== */}
            <Reveal delay={0.1}>
              <div className="relative max-w-[720px] mx-auto w-full py-14">

                {/* background sheet */}
                <motion.div
                  aria-hidden="true"
                  className="
                    absolute
                    top-[6%]
                    start-[3%]
                    w-[90%]
                    h-[88%]
                    rounded-[2rem]
                    border
                  "
                  style={{
                    background: COLORS.paleBlueStrong,
                    borderColor: 'rgba(255,255,255,.35)',
                  }}
                  animate={{
                    rotate: [-3, -2, -3],
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />


                {/* main project sheet */}
                <div
                  className="
                    relative
                    z-10
                    ms-auto
                    w-[92%]
                    rounded-[2rem]
                    overflow-hidden
                    border
                  "
                  style={{
                    background: COLORS.paper,
                    borderColor: COLORS.border,
                    boxShadow: SHADOWS.soft,
                  }}
                >

                  {/* image */}
                  <div className="relative aspect-[16/11] overflow-hidden">

                    <img
                      src={HERO_IMAGE}
                      alt={content.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        hover:scale-[1.025]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#001858]/45
                        via-transparent
                        to-transparent
                      "
                    />


                    <div
                      className="
                        absolute
                        bottom-5
                        start-5
                      "
                    >
                      <div
                        className="
                          px-4
                          py-3
                          rounded-lg
                          font-black
                          text-sm
                        "
                        style={{
                          background: COLORS.sunlight,
                          color: COLORS.navy,
                          boxShadow: SHADOWS.yellow,
                        }}
                      >
                        {content.ages}
                      </div>
                    </div>

                  </div>


                  {/* project metadata */}
                  <div
                    className="
                      grid
                      sm:grid-cols-3
                      divide-y
                      sm:divide-y-0
                      sm:divide-x
                      rtl:sm:divide-x-reverse
                    "
                    style={{
                      borderColor: COLORS.border,
                    }}
                  >

                    <div className="p-5">
                      <span
                        className="text-xs font-black"
                        style={{
                          color: COLORS.sunlight,
                        }}
                      >
                        01
                      </span>

                      <p
                        className="mt-2 font-black"
                        style={{
                          color: COLORS.navy,
                        }}
                      >
                        {content.features[0]}
                      </p>
                    </div>


                    <div className="p-5">
                      <span
                        className="text-xs font-black"
                        style={{
                          color: COLORS.sunlight,
                        }}
                      >
                        02
                      </span>

                      <p
                        className="mt-2 font-black"
                        style={{
                          color: COLORS.navy,
                        }}
                      >
                        {content.features[1]}
                      </p>
                    </div>


                    <div className="p-5">
                      <span
                        className="text-xs font-black"
                        style={{
                          color: COLORS.sunlight,
                        }}
                      >
                        03
                      </span>

                      <p
                        className="mt-2 font-black"
                        style={{
                          color: COLORS.navy,
                        }}
                      >
                        {content.features[2]}
                      </p>
                    </div>

                  </div>

                </div>


                {/* research badge */}
                <motion.div
                  className="
                    absolute
                    -bottom-1
                    -start-2
                    z-30
                    max-w-[210px]
                    rounded-xl
                    px-5
                    py-4
                  "
                  style={{
                    background: COLORS.navy,
                    color: '#fff',
                    boxShadow: SHADOWS.blue,
                  }}
                  animate={{
                    y: [0, 7, 0],
                  }}
                  transition={{
                    duration: 6.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Search className="w-5 h-5 mb-3" />

                  <p className="text-sm font-black leading-6">
                    {content.approach}
                  </p>
                </motion.div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* ========================================
          ABOUT
      ======================================== */}
      <section className="relative py-24 lg:py-32">

        <div className="container-institutional">

          <div
            className="
              grid
              lg:grid-cols-12
              gap-10
              lg:gap-16
              items-start
            "
          >

            <Reveal className="lg:col-span-4">
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
                  {content.about}
                </h2>

              </div>
            </Reveal>


            <Reveal
              delay={0.08}
              className="lg:col-span-8"
            >
              <div
                className="
                  border-t
                  pt-8
                "
                style={{
                  borderColor: COLORS.border,
                }}
              >

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

              </div>
            </Reveal>

          </div>

        </div>
      </section>


      {/* ========================================
          PROGRAMS / PROJECT MAP
      ======================================== */}
      <section
        id="second-cycle-programs"
        className="relative py-24 lg:py-32"
      >

        <div className="container-institutional">

          <Reveal>
            <div
              className="
                flex
                flex-col
                lg:flex-row
                lg:items-end
                lg:justify-between
                gap-6
                mb-16
              "
            >

              <div>
                <span
                  className="text-sm font-black"
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


              <div
                className="
                  hidden
                  lg:flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="w-16 h-[2px]"
                  style={{
                    background: COLORS.sunlight,
                  }}
                />

                <Search
                  className="w-5 h-5"
                  style={{
                    color: COLORS.blue,
                  }}
                />
              </div>

            </div>
          </Reveal>


          {/* asymmetric feature composition */}
          <div className="grid lg:grid-cols-12 gap-5">

            {content.features.map(
              (feature, index) => {

                const Icon =
                  featureIcons[index];

                const layouts = [
                  'lg:col-span-5',
                  'lg:col-span-7',
                  'lg:col-span-4',
                  'lg:col-span-4',
                  'lg:col-span-4',
                  'lg:col-span-12',
                ];

                const isPrimary =
                  index === 1 ||
                  index === 5;

                const isYellow =
                  index === 2;


                return (
                  <Reveal
                    key={feature}
                    className={layouts[index]}
                    delay={index * 0.05}
                  >
                    <motion.article
                      className={`
                        relative
                        overflow-hidden
                        min-h-[240px]
                        rounded-[1.6rem]
                        border
                        p-7
                        ${
                          index === 5
                            ? 'lg:min-h-[190px]'
                            : ''
                        }
                      `}
                      style={{
                        background:
                          isPrimary
                            ? COLORS.navy
                            : isYellow
                              ? COLORS.paleYellow
                              : COLORS.paper,

                        borderColor:
                          isPrimary
                            ? COLORS.navy
                            : isYellow
                              ? COLORS.sunlight
                              : COLORS.border,

                        color:
                          isPrimary
                            ? '#fff'
                            : COLORS.navy,

                        boxShadow:
                          isPrimary
                            ? SHADOWS.blue
                            : isYellow
                              ? SHADOWS.yellow
                              : SHADOWS.soft,
                      }}
                      whileHover={{
                        y: -6,
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
                          gap-5
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
                              isPrimary
                                ? 'rgba(255,255,255,.12)'
                                : COLORS.paleBlue,

                            color:
                              isPrimary
                                ? COLORS.sunlight
                                : COLORS.blue,
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>


                        <span
                          className="
                            text-5xl
                            font-black
                            opacity-10
                          "
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                      </div>


                      <div
                        className={
                          index === 5
                            ? 'mt-10 lg:mt-5'
                            : 'mt-16'
                        }
                      >
                        <h3
                          className="
                            text-xl
                            sm:text-2xl
                            font-black
                            leading-8
                          "
                        >
                          {feature}
                        </h3>
                      </div>


                      {isPrimary && (
                        <div
                          aria-hidden="true"
                          className="
                            absolute
                            -bottom-16
                            -end-16
                            w-48
                            h-48
                            rounded-full
                          "
                          style={{
                            background:
                              'rgba(0,38,153,.55)',
                          }}
                        />
                      )}

                    </motion.article>
                  </Reveal>
                );
              }
            )}

          </div>

        </div>
      </section>


      {/* ========================================
          ACTIVE RESEARCHER
      ======================================== */}
      <section className="relative py-24 lg:py-32">

        <div className="container-institutional">

          <Reveal>
            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                grid
                lg:grid-cols-[0.36fr_1fr]
              "
              style={{
                background: COLORS.paper,
                border: `1px solid ${COLORS.border}`,
                boxShadow: SHADOWS.soft,
              }}
            >

              {/* visual rail */}
              <div
                className="
                  min-h-[260px]
                  p-10
                  flex
                  flex-col
                  justify-between
                "
                style={{
                  background: COLORS.sunlight,
                  color: COLORS.navy,
                }}
              >

                <Beaker className="w-10 h-10" />

                <span className="text-6xl font-black opacity-25">
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

                <Search
                  className="
                    absolute
                    top-8
                    end-8
                    w-24
                    h-24
                    opacity-[0.035]
                  "
                />


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
                  "
                  style={{
                    color: COLORS.navy,
                  }}
                >
                  {content.approach}
                </p>

              </div>

            </div>
          </Reveal>

        </div>
      </section>


      {/* ========================================
          REGISTRATION
      ======================================== */}
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
                  className="text-sm font-black"
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
                  rounded-[1.6rem]
                  border
                  p-7
                "
                style={{
                  background: COLORS.paper,
                  borderColor: COLORS.border,
                  boxShadow: SHADOWS.soft,
                }}
              >

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    top-0
                    start-7
                    end-7
                    h-1.5
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
                    borderColor: COLORS.border,
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