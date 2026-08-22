import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Blocks,
  BookOpen,
  Circle,
  Heart,
  Palette,
  Play,
  Sparkles,
  Sprout,
  Star,
  Sun,
  UsersRound,
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import { useLanguage } from '@/lib/LanguageContext';


const HERO_IMAGE =
  '/media/site/fc1ec2660_generated_c31ef5f8.jpg';


const COLORS = {
  cream: '#FBF6EE',
  creamSoft: '#FFF9F1',

  navy: '#001858',
  blue: '#002699',

  sunlight: '#F5A623',
  

  text: '#222222',

  paleBlue: '#DCE5FF',
  paleBlue2: '#E8EDFF',
  paleYellow: '#FFE8B5',

  navySoft: '#C8D2EF',
};


const shadows = {
  cream:
    '18px 18px 38px rgba(80, 65, 45, 0.12), -14px -14px 30px rgba(255, 255, 255, 0.95), inset 1px 1px 2px rgba(255,255,255,0.9)',

  blue:
    '16px 18px 32px rgba(0, 24, 88, 0.24), -10px -10px 24px rgba(255,255,255,0.45), inset 2px 2px 3px rgba(255,255,255,0.22)',

  soft:
    '10px 12px 25px rgba(60, 48, 32, 0.12), -9px -9px 22px rgba(255,255,255,0.94)',

  yellow:
    '12px 14px 26px rgba(168, 109, 18, 0.18), -8px -8px 20px rgba(255,255,255,0.75)',

  inset:
    'inset 6px 6px 12px rgba(0,24,88,0.13), inset -6px -6px 12px rgba(255,255,255,0.75)',
};


export default function KindergartenDreamPage() {
  const { isRTL, t } = useLanguage();

  const BackArrow =
    isRTL ? ArrowRight : ArrowLeft;

  const content = isRTL
    ? {
        eyebrow: 'کودکستان رویای کودکی',

        titleTop: 'دنیای کودکی،',
        titleAccent: 'جایی برای کشف کردن است.',

        subtitle:
          'در رویای کودکی، یادگیری از تجربه آغاز می‌شود؛ از بازی، هنر، طبیعت، گفت‌وگو و صدها پرسشی که جهان کودک را شکل می‌دهند.',

        back: 'همه مقاطع',

        age: '۳ تا ۶ سال',
        approach: 'رویکرد رجیوامیلیا',

        explore: 'کشف رویای کودکی',
        register: 'پیش‌ثبت‌نام',

        quote:
          'کودک فقط شهروند فردا نیست؛ او شهروند امروز است.',

        storyEyebrow:
          'یادگیری با صد زبان',

        storyTitle:
          'هر کودک مسیر خودش را برای فهم جهان می‌سازد.',

        story:
          'ما محیط را به‌عنوان بخشی از فرایند یادگیری می‌بینیم. کودک فرصت دارد ببیند، لمس کند، بسازد، خراب کند، دوباره بسازد، سؤال بپرسد و با دیگران معنا خلق کند.',

        worlds: [
          {
            icon: Palette,
            number: '01',
            title: 'هنر و بیان',
            text: 'رنگ، حجم، موسیقی و ساختن راه‌هایی برای بیان دنیای درون کودک هستند.',
            theme: 'blue',
          },
          {
            icon: Sprout,
            number: '02',
            title: 'طبیعت و تجربه',
            text: 'یادگیری فقط پشت میز اتفاق نمی‌افتد؛ محیط پیرامون بخشی از کلاس ماست.',
            theme: 'yellow',
          },
          {
            icon: UsersRound,
            number: '03',
            title: 'زندگی اجتماعی',
            text: 'گفت‌وگو، مشارکت و ارتباط با دیگران بخشی اساسی از رشد کودک است.',
            theme: 'cream',
          },
          {
            icon: Blocks,
            number: '04',
            title: 'بازی و ساختن',
            text: 'بازی یک وقفه از یادگیری نیست؛ خودِ یادگیری است.',
            theme: 'navy',
          },
        ],

        nextTitle:
          'اینجا قرار نیست کودک فقط آماده مدرسه شود.',

        nextText:
          'قرار است آماده زندگی، انتخاب، تجربه و کشف جهان شود.',

        cta:
          'شروع مسیر رویای کودکی',
      }
    : {
        eyebrow: 'Childhood Dream Kindergarten',

        titleTop: 'Childhood is',
        titleAccent: 'a world to discover.',

        subtitle:
          'At Childhood Dream, learning begins with experience, through play, art, nature, conversation and the many questions that shape a child’s world.',

        back: 'All levels',

        age: 'Ages 3–6',
        approach: 'Reggio Emilia inspired',

        explore: 'Explore Childhood Dream',
        register: 'Pre-registration',

        quote:
          'A child is not only a citizen of tomorrow. A child is a citizen of today.',

        storyEyebrow:
          'Learning through a hundred languages',

        storyTitle:
          'Every child builds their own way of understanding the world.',

        story:
          'We see the environment as part of learning itself. Children are given space to observe, touch, build, rebuild, ask questions and create meaning together.',

        worlds: [
          {
            icon: Palette,
            number: '01',
            title: 'Art & Expression',
            text: 'Color, form, music and making become languages for expressing a child’s inner world.',
            theme: 'blue',
          },
          {
            icon: Sprout,
            number: '02',
            title: 'Nature & Experience',
            text: 'Learning does not happen only at a desk. The surrounding world is part of our classroom.',
            theme: 'yellow',
          },
          {
            icon: UsersRound,
            number: '03',
            title: 'Social Life',
            text: 'Conversation, collaboration and relationships are fundamental parts of development.',
            theme: 'cream',
          },
          {
            icon: Blocks,
            number: '04',
            title: 'Play & Making',
            text: 'Play is not a break from learning. Play is learning.',
            theme: 'navy',
          },
        ],

        nextTitle:
          'Children are not simply preparing for school here.',

        nextText:
          'They are preparing to experience, choose, explore and participate in life.',

        cta:
          'Begin the Childhood Dream journey',
      };


      const slides = isRTL
    ? [
        {
          image: HERO_IMAGE,
          title: 'یادگیری از مسیر بازی',
          text: 'بازی برای کودک فقط سرگرمی نیست؛ راهی برای تجربه، کشف و فهم جهان است.',
          tag: 'بازی گروهی',
        },
        {
          image: '/media/site/af4db7d64_6.jpg',
          title: 'هنر، خلاقیت و بیان',
          text: 'کودکان با رنگ، فرم، ساختن و تخیل، دنیای درونی خود را بیان می‌کنند.',
          tag: 'کارگاه خلاقیت',
        },
        {
          image: '/media/site/7a95f3af1_IMG_7095.jpg',
          title: 'تجربه، لمس و کشف',
          text: 'کشف جهان با مشاهده، لمس، گفت‌وگو و ارتباط با محیط اطراف اتفاق می‌افتد.',
          tag: 'کشف و تجربه',
        },
      ]
    : [
        {
          image: HERO_IMAGE,
          title: 'Learning through play',
          text: 'For children, play is not just entertainment. It is a way to explore, experience and understand the world.',
          tag: 'Group play',
        },
        {
          image: '/media/site/af4db7d64_6.jpg',
          title: 'Art, creativity and expression',
          text: 'Children express their inner worlds through color, form, making and imagination.',
          tag: 'Creative workshop',
        },
        {
          image: '/media/site/7a95f3af1_IMG_7095.jpg',
          title: 'Touch, experience and discover',
          text: 'Discovery happens through observation, touch, dialogue and connection with the environment.',
          tag: 'Explore & discover',
        },
      ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };


  const scrollToStory = () => {
    document
      .getElementById('childhood-story')
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };


  const getWorldStyle = (theme) => {
    switch (theme) {
      case 'blue':
        return {
          background: COLORS.paleBlue,
          color: COLORS.navy,
          boxShadow: shadows.soft,
        };

      case 'yellow':
        return {
          background: COLORS.paleYellow,
          color: '#75500F',
          boxShadow: shadows.yellow,
        };

      case 'navy':
        return {
          background: COLORS.navy,
          color: '#FFFFFF',
          boxShadow: shadows.blue,
        };

      default:
        return {
          background: COLORS.creamSoft,
          color: COLORS.text,
          boxShadow: shadows.cream,
        };
    }
  };


  return (
    <main
      className="relative overflow-hidden"
      style={{
        background: COLORS.cream,
        color: COLORS.text,
      }}
    >

      {/* ==========================================
          HERO
      ========================================== */}
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">

        {/* Giant MCOE blue clay form */}
        <div
          aria-hidden="true"
          className="
            absolute
            -top-40
            -end-40
            w-[34rem]
            h-[34rem]
            lg:w-[46rem]
            lg:h-[46rem]
            rounded-[42%_58%_65%_35%/45%_39%_61%_55%]
            rotate-[-12deg]
          "
          style={{
            background:
              'linear-gradient(145deg, #002699 0%, #001858 78%)',
            boxShadow:
              '26px 28px 60px rgba(0,24,88,.23), inset 8px 8px 22px rgba(255,255,255,.08), inset -12px -12px 26px rgba(0,0,0,.12)',
          }}
        />


        {/* Sunlight shape */}
        <div
          aria-hidden="true"
          className="
            absolute
            top-28
            start-[46%]
            hidden lg:flex
            w-24
            h-24
            rounded-[34%_66%_45%_55%]
            rotate-12
            items-center
            justify-center
          "
          style={{
            background: COLORS.sunlight,
            boxShadow: shadows.yellow,
          }}
        >
          <Sun
            className="w-9 h-9"
            style={{
              color: COLORS.navy,
            }}
          />
        </div>


        {/* tiny decorative circles */}
        <div
          aria-hidden="true"
          className="absolute top-[22%] start-[7%] w-5 h-5 rounded-full"
          style={{
            background: COLORS.blue,
          }}
        />

        <div
          aria-hidden="true"
          className="absolute top-[30%] start-[10%] w-3 h-3 rounded-full"
          style={{
            background: COLORS.sunlight,
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
                font-semibold
                transition-all
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


          <div className="
            grid
            lg:grid-cols-[0.95fr_1.05fr]
            gap-12
            lg:gap-16
            items-center
            min-h-[78vh]
          ">

            {/* ==========================
                HERO TEXT
            ========================== */}
            <div className="relative z-20">

              <Reveal>
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-5
                    py-3
                    rounded-[1.25rem]
                    text-sm
                    font-black
                    mb-8
                  "
                  style={{
                    background:
                      COLORS.paleYellow,
                    color:
                      COLORS.navy,
                    boxShadow:
                      shadows.yellow,
                  }}
                >
                  <Sparkles className="w-4 h-4" />

                  {content.eyebrow}
                </div>
              </Reveal>


              <Reveal delay={0.05}>
                <h1
                  className="
                    max-w-3xl
                    text-[3rem]
                    sm:text-6xl
                    lg:text-[5rem]
                    leading-[1.08]
                    tracking-[-0.045em]
                    font-black
                  "
                  style={{
                    color: COLORS.navy,
                  }}
                >
                  <span className="block">
                    {content.titleTop}
                  </span>

                  <span
                    className="block mt-2"
                    style={{
                      color: COLORS.blue,
                    }}
                  >
                    {content.titleAccent}
                  </span>
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
                    color:
                      'rgba(34,34,34,.68)',
                  }}
                >
                  {content.subtitle}
                </p>
              </Reveal>


              {/* Chips */}
              <Reveal delay={0.15}>
                <div className="flex flex-wrap gap-4 mt-8">

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-3
                      rounded-2xl
                      font-bold
                      text-sm
                    "
                    style={{
                      background:
                        COLORS.creamSoft,
                      color:
                        COLORS.navy,
                      boxShadow:
                        shadows.soft,
                    }}
                  >
                    <Heart className="w-4 h-4" />

                    {content.age}
                  </div>


                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-3
                      rounded-2xl
                      font-bold
                      text-sm
                    "
                    style={{
                      background:
                        COLORS.paleBlue2,
                      color:
                        COLORS.blue,
                      boxShadow:
                        shadows.soft,
                    }}
                  >
                    <Sprout className="w-4 h-4" />

                    {content.approach}
                  </div>

                </div>
              </Reveal>


              {/* CTA */}
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-4 mt-10">

                  <button
                    type="button"
                    onClick={scrollToStory}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-3
                      min-h-14
                      px-7
                      rounded-[1.4rem]
                      font-black
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                    style={{
                      background:
                        COLORS.navy,
                      color: '#FFFFFF',
                      boxShadow:
                        shadows.blue,
                    }}
                  >
                    <Play className="w-4 h-4 fill-current" />

                    {content.explore}
                  </button>


                  <a
                    href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      min-h-14
                      px-7
                      rounded-[1.4rem]
                      font-black
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                    style={{
                      background:
                        COLORS.sunlight,
                      color:
                        COLORS.navy,
                      boxShadow:
                        shadows.yellow,
                    }}
                  >
                    {content.register}
                  </a>

                </div>
              </Reveal>

            </div>


            {/* ==========================
                HERO CLAY ART
            ========================== */}
            <Reveal delay={0.12}>
              <div
                className="
                  relative
                  max-w-[650px]
                  mx-auto
                  w-full
                  py-14
                  lg:py-20
                "
              >

                {/* Back blue plate */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    top-[8%]
                    start-[7%]
                    w-[85%]
                    h-[83%]
                    rounded-[38%_62%_55%_45%/45%_35%_65%_55%]
                    rotate-[-7deg]
                  "
                  style={{
                    background:
                      COLORS.blue,
                    boxShadow:
                      shadows.blue,
                  }}
                />


                {/* Main image clay object */}
                <div
                  className="
                    relative
                    z-10
                    ms-auto
                    w-[88%]
                    rounded-[3.5rem_2rem_4.5rem_2.6rem]
                    p-4
                    rotate-[2deg]
                  "
                  style={{
                    background:
                      COLORS.creamSoft,
                    boxShadow:
                      shadows.cream,
                  }}
                >

                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-[2.8rem_1.5rem_3.8rem_2rem]
                      aspect-[4/4.7]
                      sm:aspect-square
                    "
                  >
                    <img
                      src={HERO_IMAGE}
                      alt={content.eyebrow}
                      className="
                        w-full
                        h-full
                        object-cover
                        scale-[1.02]
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


                    {/* quote */}
                    <div
                      className="
                        absolute
                        bottom-5
                        start-5
                        end-5
                        px-5
                        py-5
                        rounded-[1.6rem]
                        backdrop-blur-md
                      "
                      style={{
                        background:
                          'rgba(251,246,238,.90)',
                        color:
                          COLORS.navy,
                        boxShadow:
                          shadows.soft,
                      }}
                    >
                      <div className="flex gap-3 items-start">

                        <Star
                          className="
                            w-5
                            h-5
                            shrink-0
                            mt-1
                          "
                          style={{
                            color:
                              COLORS.sunlight,
                            fill:
                              COLORS.sunlight,
                          }}
                        />

                        <p className="font-black leading-7">
                          {content.quote}
                        </p>

                      </div>
                    </div>
                  </div>
                </div>


                {/* floating block 1 */}
                <div
                  className="
                    absolute
                    z-20
                    -top-1
                    end-[2%]
                    w-28
                    h-28
                    sm:w-36
                    sm:h-36
                    rounded-[2.4rem]
                    rotate-[9deg]
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                  "
                  style={{
                    background:
                      COLORS.sunlight,
                    color:
                      COLORS.navy,
                    boxShadow:
                      shadows.yellow,
                  }}
                >
                  <Palette className="w-8 h-8" />

                  <span className="text-sm font-black">
                    {isRTL
                      ? 'خلق کردن'
                      : 'Create'}
                  </span>
                </div>


                {/* floating block 2 */}
                <div
                  className="
                    absolute
                    z-20
                    bottom-[3%]
                    -start-[3%]
                    w-28
                    h-32
                    sm:w-36
                    sm:h-40
                    rounded-[45%_55%_42%_58%]
                    rotate-[-8deg]
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-3
                  "
                  style={{
                    background:
                      COLORS.paleBlue,
                    color:
                      COLORS.navy,
                    boxShadow:
                      shadows.soft,
                  }}
                >
                  <Blocks className="w-8 h-8" />

                  <span className="text-sm font-black">
                    {isRTL
                      ? 'بازی کردن'
                      : 'Play'}
                  </span>
                </div>


                {/* mini sun sphere */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    z-30
                    top-[48%]
                    -end-3
                    w-14
                    h-14
                    rounded-full
                  "
                  style={{
                    background:
                      COLORS.sunlight,
                    boxShadow:
                      shadows.yellow,
                  }}
                />

              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* ==========================================
          STORY
      ========================================== */}
      <section
        id="childhood-story"
        className="
          relative
          py-24
          lg:py-32
        "
      >

        <div className="container-institutional">

          <Reveal>
            <div className="
              max-w-4xl
              mx-auto
              text-center
            ">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-2xl
                  text-sm
                  font-black
                "
                style={{
                  background:
                    COLORS.paleBlue2,
                  color:
                    COLORS.navy,
                  boxShadow:
                    shadows.soft,
                }}
              >
                <BookOpen className="w-4 h-4" />

                {content.storyEyebrow}
              </div>


              <h2
                className="
                  mt-7
                  text-3xl
                  sm:text-4xl
                  lg:text-6xl
                  font-black
                  leading-[1.25]
                  tracking-[-0.03em]
                "
                style={{
                  color:
                    COLORS.navy,
                }}
              >
                {content.storyTitle}
              </h2>


              <p
                className="
                  max-w-3xl
                  mx-auto
                  mt-7
                  text-base
                  sm:text-lg
                  leading-9
                "
                style={{
                  color:
                    'rgba(34,34,34,.68)',
                }}
              >
                {content.story}
              </p>

            </div>
          </Reveal>


          {/* ======================================
              CLAY WORLD COMPOSITION
          ====================================== */}
          <div
            className="
              mt-20
              grid
              md:grid-cols-2
              lg:grid-cols-12
              gap-6
              items-stretch
            "
          >

            {content.worlds.map(
              ({
                icon: Icon,
                number,
                title,
                text,
                theme,
              }, index) => {

                const spanClass =
                  index === 0
                    ? 'lg:col-span-7'
                    : index === 1
                      ? 'lg:col-span-5'
                      : index === 2
                        ? 'lg:col-span-5'
                        : 'lg:col-span-7';

                const rotateClass =
                  index === 0
                    ? 'lg:rotate-[-1deg]'
                    : index === 1
                      ? 'lg:translate-y-10 lg:rotate-[1.5deg]'
                      : index === 2
                        ? 'lg:-translate-y-2 lg:rotate-[1deg]'
                        : 'lg:translate-y-7 lg:rotate-[-1deg]';


                return (
                  <Reveal
                    key={title}
                    delay={
                      index * 0.06
                    }
                    className={spanClass}
                  >
                    <article
                      className={`
                        ${rotateClass}
                        relative
                        min-h-[260px]
                        sm:min-h-[300px]
                        rounded-[2.8rem]
                        p-7
                        sm:p-9
                        overflow-hidden
                        transition-all
                        duration-500
                        hover:-translate-y-2
                      `}
                      style={
                        getWorldStyle(
                          theme
                        )
                      }
                    >

                      <div
                        className="
                          relative
                          z-10
                          h-full
                          flex
                          flex-col
                        "
                      >

                        <div className="
                          flex
                          items-start
                          justify-between
                          gap-5
                        ">

                          <div
                            className="
                              w-14
                              h-14
                              rounded-[1.4rem]
                              flex
                              items-center
                              justify-center
                            "
                            style={{
                              background:
                                theme === 'navy'
                                  ? 'rgba(255,255,255,.13)'
                                  : 'rgba(255,255,255,.5)',

                              boxShadow:
                                theme === 'navy'
                                  ? 'inset 3px 3px 7px rgba(255,255,255,.08)'
                                  : shadows.inset,
                            }}
                          >
                            <Icon className="w-7 h-7" />
                          </div>


                          <span
                            className="
                              text-5xl
                              font-black
                              opacity-15
                            "
                          >
                            {number}
                          </span>

                        </div>


                        <div className="mt-auto pt-14">

                          <h3 className="
                            text-2xl
                            sm:text-3xl
                            font-black
                          ">
                            {title}
                          </h3>

                          <p className="
                            mt-4
                            leading-7
                            opacity-75
                            max-w-xl
                          ">
                            {text}
                          </p>

                        </div>

                      </div>


                      <Circle
                        aria-hidden="true"
                        className="
                          absolute
                          -bottom-12
                          -end-12
                          w-40
                          h-40
                          opacity-[0.06]
                        "
                        strokeWidth={6}
                      />

                    </article>
                  </Reveal>
                );
              }
            )}

          </div>
        </div>
      </section>


      {/* ==========================================
          PLAYFUL SLIDER
      ========================================== */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="container-institutional">
          <Reveal>
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
              
              {/* Text side */}
              <div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-black"
                  style={{
                    background: COLORS.creamSoft,
                    color: COLORS.sunlight,
                    boxShadow: shadows.soft,
                  }}
                >
                  <Circle
                    className="w-3 h-3"
                    style={{
                      fill: COLORS.sunlight,
                      color: COLORS.sunlight,
                    }}
                  />
                  {isRTL ? 'لحظه‌هایی از رویای کودکی' : 'Moments from Childhood Dream'}
                </div>

                <h2
                  className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.03em]"
                  style={{ color: COLORS.navy }}
                >
                  {isRTL
                    ? 'بازی، خلاقیت و تجربه در زندگی روزمره کودک'
                    : 'Play, creativity and discovery in everyday childhood'}
                </h2>

                <p
                  className="mt-6 text-base sm:text-lg leading-8"
                  style={{ color: 'rgba(34,34,34,.68)' }}
                >
                  {isRTL
                    ? 'در اینجا کودک فقط آموزش نمی‌بیند؛ زندگی می‌کند، بازی می‌کند، می‌سازد، سؤال می‌پرسد و جهان را با تمام حواس خود تجربه می‌کند.'
                    : 'Here, children do not simply receive instruction. They live, play, build, ask questions and experience the world with all their senses.'}
                </p>

                <div className="flex flex-wrap gap-3 mt-8">
                  {[
                    isRTL ? 'بازی آزاد' : 'Free play',
                    isRTL ? 'کار گروهی' : 'Collaboration',
                    isRTL ? 'خلق کردن' : 'Making',
                  ].map((item) => (
                    <div
                      key={item}
                      className="px-4 py-3 rounded-2xl text-sm font-bold"
                      style={{
                        background: COLORS.paleBlue2,
                        color: COLORS.blue,
                        boxShadow: shadows.soft,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider side */}
              <div className="relative">
                <div
                  className="relative rounded-[3rem] p-4 sm:p-5"
                  style={{
                    background: COLORS.creamSoft,
                    boxShadow: shadows.cream,
                  }}
                >
                  <div className="relative overflow-hidden rounded-[2.4rem] aspect-[4/5] sm:aspect-[16/13]">
                    <img
                      src={slides[activeSlide].image}
                      alt={slides[activeSlide].title}
                      className="w-full h-full object-cover transition-all duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#001858]/55 via-[#001858]/15 to-transparent" />

                    {/* tag */}
                    <div
                      className="absolute top-5 start-5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black"
                      style={{
                        background: COLORS.sunlight,
                        color: '#fff',
                        boxShadow: '10px 12px 22px rgba(216,76,87,.22), -6px -6px 16px rgba(255,255,255,.35)',
                      }}
                    >
                      {slides[activeSlide].tag}
                    </div>

                    {/* caption */}
                    <div
                      className="absolute bottom-5 start-5 end-5 rounded-[1.7rem] px-5 py-5"
                      style={{
                        background: 'rgba(251,246,238,.92)',
                        color: COLORS.navy,
                        boxShadow: shadows.soft,
                      }}
                    >
                      <h3 className="text-lg sm:text-xl font-black">
                        {slides[activeSlide].title}
                      </h3>

                      <p className="mt-3 text-sm sm:text-base leading-7 text-[#4D4D4D]">
                        {slides[activeSlide].text}
                      </p>
                    </div>

                    {/* arrows */}
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="absolute top-1/2 -translate-y-1/2 start-4 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105"
                      style={{
                        background: 'rgba(251,246,238,.92)',
                        color: COLORS.navy,
                        boxShadow: shadows.soft,
                      }}
                      aria-label={isRTL ? 'اسلاید قبلی' : 'Previous slide'}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={nextSlide}
                      className="absolute top-1/2 -translate-y-1/2 end-4 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105"
                      style={{
                        background: 'rgba(251,246,238,.92)',
                        color: COLORS.navy,
                        boxShadow: shadows.soft,
                      }}
                      aria-label={isRTL ? 'اسلاید بعدی' : 'Next slide'}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* dots */}
                <div className="flex items-center justify-center gap-3 mt-6">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToSlide(index)}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: index === activeSlide ? '34px' : '12px',
                        height: '12px',
                        background:
                          index === activeSlide
                            ? COLORS.sunlight
                            : COLORS.navySoft,
                        boxShadow:
                          index === activeSlide
                            ? '8px 10px 18px rgba(216,76,87,.22)'
                            : 'none',
                      }}
                      aria-label={`${isRTL ? 'اسلاید' : 'Slide'} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          CLOSING CTA
      ========================================== */}
      <section className="
        relative
        py-24
        lg:py-32
      ">
        <div className="container-institutional">

          <Reveal>
            <div
              className="
                relative
                overflow-hidden
                rounded-[3rem]
                px-7
                py-14
                sm:px-12
                lg:px-20
                lg:py-20
              "
              style={{
                background:
                  COLORS.navy,
                boxShadow:
                  shadows.blue,
              }}
            >

              {/* giant accent */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  -top-24
                  -end-20
                  w-80
                  h-80
                  rounded-full
                "
                style={{
                  background:
                    COLORS.blue,
                }}
              />


              <div
                aria-hidden="true"
                className="
                  absolute
                  -bottom-16
                  start-[18%]
                  w-44
                  h-44
                  rounded-[40%]
                  rotate-12
                "
                style={{
                  background:
                    COLORS.sunlight,
                }}
              />


              <div className="
                relative
                z-10
                grid
                lg:grid-cols-[1fr_auto]
                gap-10
                items-center
              ">

                <div className="max-w-3xl">

                  <h2 className="
                    text-3xl
                    sm:text-4xl
                    lg:text-5xl
                    font-black
                    leading-tight
                    text-white
                  ">
                    {content.nextTitle}
                  </h2>

                  <p className="
                    mt-5
                    text-base
                    sm:text-lg
                    leading-8
                    text-white/70
                  ">
                    {content.nextText}
                  </p>

                </div>


                <a
                  href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister"
                  className="
                    relative
                    inline-flex
                    items-center
                    justify-center
                    min-h-16
                    px-8
                    rounded-[1.5rem]
                    font-black
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    whitespace-nowrap
                  "
                  style={{
                    background:
                      COLORS.sunlight,
                    color:
                      COLORS.navy,
                    boxShadow:
                      shadows.yellow,
                  }}
                >
                  {content.cta}
                </a>

              </div>

            </div>
          </Reveal>

        </div>
      </section>

    </main>
  );
}