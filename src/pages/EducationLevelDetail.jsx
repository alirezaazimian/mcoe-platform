import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { GraduationCap, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const IMAGES = {
  kindergarten: '/media/site/fc1ec2660_generated_c31ef5f8.jpg',
  elementary1: '/media/site/762d5af46_generated_2f7e8049.jpg',
  elementary2: '/media/site/762d5af46_generated_2f7e8049.jpg',
  middleSchool: '/media/site/79b290cdc_generated_d244f2b5.jpg',
};

const LEVEL_DATA = {
  kindergarten: {
    fa: {
      title: 'کودکستان رویای کودکی',
      ages: '۳ تا ۶ سال',
      desc: 'مرکز پیش‌دبستانی و آمادگی برای ورود به دبستان که در راستای رویکرد انسان‌گرایی تلاش می‌کند تا فضایی برای رشد و شکوفایی کودکان فراهم کند. ما با الگوبرداری از روش رجیوامیلیا، اهداف رشد همه‌جانبه در بستری غنی و متنوع از تجربیات را دنبال می‌کنیم.',
      features: ['رویکرد رجیوامیلیا', 'رشد همه‌جانبه', 'پروژه‌های مبتنی بر دغدغه‌های کودک', 'ارتباط با محیط پیرامون', 'توجه به نیازهای خانواده', 'خروج از کلاس و تجربه شهری'],
      approach: 'کودک یک شهروند است — نه فقط شهروند فردا بلکه شهروند امروز. پس زندگی و تجربیات امروز او به اندازه آینده اهمیت دارد.',
    },
    en: {
      title: 'Kindergarten "Childhood Dream"',
      ages: 'Ages 3 to 6',
      desc: 'A pre-school and school-readiness center that, in line with a humanistic approach, strives to create a space for the growth and flourishing of children. Inspired by the Reggio Emilia approach, we pursue holistic development through a rich and diverse range of experiences.',
      features: ['Reggio Emilia approach', 'Holistic development', 'Project-based learning', 'Connection with surroundings', 'Attention to family needs', 'Beyond-classroom experiences'],
      approach: 'A child is a citizen — not just a citizen of tomorrow, but of today. So their present life and experiences matter as much as the future.',
    },
  },
  elementary1: {
    fa: {
      title: 'دبستان دوره اول',
      ages: 'پایه‌های اول تا سوم',
      desc: 'در دوره اول دبستان، پایه‌های یادگیری بنیادین شکل می‌گیرد. ما با تمرکز بر سواد خواندن و نوشتن، تفکر ریاضی و مهارت‌های اجتماعی، فضایی امن و الهام‌بخش برای کشف دنیای دانش فراهم می‌کنیم.',
      features: ['رشد سواد خواندن و فرهنگ نوشتن', 'تفکر ریاضی بنیادین', 'مهارت‌های اجتماعی', 'هنر و خلاقیت', 'آموزش فعال و تعاملی', 'ارزیابی تکوینی', 'تفکر علمی', 'توجه به سلامت جسمی و حرکتی'],
      approach: 'یادگیری در این سن باید شاد و معنادار باشد — یادگیری‌ای که با کنجکاوی کودک همراه است.',
    },
    en: {
      title: 'Elementary — First Cycle',
      ages: 'Grades 1 to 3',
      desc: 'In the first cycle of elementary school, the foundations of learning are laid. With a focus on literacy, mathematical thinking, and social skills, we provide a safe and inspiring environment for discovering the world of knowledge.',
      features: ['Growth of reading literacy & writing culture', 'Basic mathematical thinking', 'Social skills', 'Art & creativity', 'Active & interactive learning', 'Formative assessment', 'Scientific thinking', 'Physical & motor health'],
      approach: 'Learning at this age should be joyful and meaningful — learning that accompanies the child\'s curiosity.',
    },
  },
  elementary2: {
    fa: {
      title: 'دبستان دوره دوم',
      ages: 'پایه‌های چهارم تا ششم',
      desc: 'در دوره دوم دبستان، مهارت‌های تحلیلی و تفکر انتقادی دانش‌آموزان توسعه می‌یابد. ما با ارائه پروژه‌های میان‌رشته‌ای و فرصت‌های یادگیری عملی، آماده‌سازی برای متوسطه را هدفمند پیش می‌بریم.',
      features: ['تفکر انتقادی', 'پروژه‌های میان‌رشته‌ای', 'علوم تجربی عملی', 'مهارت‌های پژوهشی', 'کار گروهی', 'تسلط بر فرهنگ و ادبیات فارسی'],
      approach: 'در این مرحله، دانش‌آموز از یادگیرنده‌ی منفعل به پژوهشگر فعال تبدیل می‌شود.',
    },
    en: {
      title: 'Elementary — Second Cycle',
      ages: 'Grades 4 to 6',
      desc: 'In the second cycle, students\' analytical skills and critical thinking are developed. Through interdisciplinary projects and hands-on learning opportunities, we purposefully prepare them for middle school.',
      features: ['Critical thinking', 'Interdisciplinary projects', 'Hands-on science', 'Research skills', 'Collaborative work', 'Mastery of Persian culture & literature'],
      approach: 'At this stage, the student transforms from a passive learner into an active researcher.',
    },
  },
  middleSchool: {
    fa: {
      title: 'متوسطه دوره اول',
      ages: 'پایه‌های هفتم تا نهم',
      desc: 'دوره متوسطه اول، مرحله گذار مهمی در زندگی دانش‌آموز است. ما با ارائه برنامه‌ریزی تحصیلی دقیق، مشاوره تحصیلی و رشد مهارت‌های زندگی، دانش‌آموزان را برای مسیر متوسطه دوم و آینده تحصیلی آماده می‌کنیم.',
      features: ['برنامه‌ریزی تحصیلی دقیق', 'مشاوره تحصیلی و فردی', 'آزمایشگاه‌های مجهز', 'مهارت‌های زندگی', 'رشد تفکر نقاد و حل مسئله', 'توجه به زیست سالم در دوره نوجوانی', 'روش‌های آموزشی و پژوهشی مبتنی بر حل مسئله'],
      approach: 'نوجوان نیازمند فضایی است که استقلال و مسئولیت‌پذیری او را در کنار حمایت تربیتی پرورش دهد.',
    },
    en: {
      title: 'Middle School — First Cycle',
      ages: 'Grades 7 to 9',
      desc: 'The first cycle of middle school is an important transition in a student\'s life. With precise academic planning, counseling, and life skills development, we prepare students for the secondary pathway and their academic future.',
      features: ['Precise academic planning', 'Academic & personal counseling', 'Equipped laboratories', 'Life skills', 'Critical thinking & problem-solving growth', 'Healthy living in adolescence', 'Problem-solving-based teaching & research methods'],
      approach: 'Adolescents need an environment that fosters independence and responsibility alongside educational support.',
    },
  },
};

export default function EducationLevelDetail() {
  const { id } = useParams();
  const { isRTL, t } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const lang = isRTL ? 'fa' : 'en';
  const data = LEVEL_DATA[id]?.[lang] || LEVEL_DATA[id]?.fa;
  const img = IMAGES[id];

  if (!data) {
    return (
      <div className="container-institutional py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">{isRTL ? 'مقطع یافت نشد' : 'Level not found'}</h1>
        <Link to="/levels" className="text-primary hover:underline">{isRTL ? 'بازگشت به مقاطع' : 'Back to levels'}</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={img} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-institutional pb-10">
            <Reveal>
              <Link to="/levels" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors">
                <Arrow className="w-4 h-4 rotate-180 rtl:rotate-0" />
                {isRTL ? 'همه مقاطع' : 'All levels'}
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">{data.title}</h1>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium">{data.ages}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-institutional py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-bold text-foreground mb-5">{isRTL ? 'درباره این مقطع' : 'About This Level'}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{data.desc}</p>

              <div className="bg-primary/5 border-s-4 border-primary rounded-r-xl p-6 mb-8">
                <p className="text-foreground/80 italic leading-relaxed text-lg">"{data.approach}"</p>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-4">{isRTL ? 'ویژگی‌ها و برنامه‌ها' : 'Features & Programs'}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.features.map((feature, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <Reveal delay={0.2}>
              <div className="sticky top-24 bg-card rounded-2xl p-6 institutional-shadow">
                <h3 className="font-bold text-foreground mb-2">{isRTL ? 'پیش‌ثبت‌نام' : 'Pre-Registration'}</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {isRTL ? 'برای ثبت‌نام در این مقطع، فرم پیش‌ثبت‌نام را تکمیل کنید.' : 'To enroll in this level, complete the pre-registration form.'}
                </p>
                <Button href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister" className="w-full mb-3 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground">
                  {t('hero.register')}
                </Button>
                <Button href="https://survey.porsline.ir/s/qP6AU8hR" variant="outline" className="w-full" icon={false}>
                  {t('hero.collaborate')}
                </Button>
                <div className="mt-5 pt-5 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">{isRTL ? 'نیاز به مشاوره؟' : 'Need counseling?'}</p>
                  <a href="mailto:school@mcoe.ir" className="text-sm font-medium text-primary hover:underline">school@mcoe.ir</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}