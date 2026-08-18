import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { Building2, FlaskConical, Library, Palette, Dumbbell, Trees, UtensilsCrossed, Monitor, Puzzle } from 'lucide-react';

// MCOE logo-derived brand palette — each facility block gets its own accent.
const BLOCK_COLORS = [
  'text-[#001858]',   // navy   — classrooms
  'text-[#2E7D32]',   // green  — labs
  'text-[#8E44AD]',   // purple — library
  'text-[#E1306C]',   // pink   — art
  'text-[#F5A623]',   // amber  — sports
  'text-[#2E7D32]',   // green  — yard
  'text-[#EB5757]',   // red    — kitchen
  'text-[#0A66C2]',   // blue   — computer
  'text-[#6B4226]',   // brown  — montessori
];

const SPACES = [
  'https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/d641eceeb_generated_8663238f.png',
  'https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/fc1ec2660_generated_c31ef5f8.png',
  'https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/762d5af46_generated_2f7e8049.png',
  'https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/79b290cdc_generated_d244f2b5.png',
];

export default function EducationalSpace() {
  const { t, isRTL } = useLanguage();

  const facilities = [
    { icon: Building2, name: isRTL ? 'کلاس‌های استاندارد' : 'Standard Classrooms', desc: isRTL ? 'مجهز به ابزار IT و امکانات چند رسانه‌ای' : 'Equipped with IT tools and multimedia facilities' },
    { icon: FlaskConical, name: isRTL ? 'آزمایشگاه‌های مجهز' : 'Equipped Labs', desc: isRTL ? 'آزمایشگاه علوم، زمین‌شناسی، زیست‌شناسی و تشریح، فیزیک الکترونیک و اپتیک برای آموزش عملی' : 'Science, geology, biology & anatomy, electronic physics and optics labs for hands-on learning' },
    { icon: Library, name: isRTL ? 'کتابخانه' : 'Library', desc: isRTL ? 'منبع غنی منابع آموزشی و فضای مطالعه' : 'Rich resource center and reading space' },
    { icon: Palette, name: isRTL ? 'فضای هنر' : 'Art Space', desc: isRTL ? 'کارگاه نقاشی، سفال و هنرهای دستی' : 'Painting, pottery, and crafts workshop' },
    { icon: Dumbbell, name: isRTL ? 'سالن ورزشی' : 'Sports Hall', desc: isRTL ? 'فضای مناسب برای تربیت بدنی و فعالیت ورزشی' : 'Space for physical education and sports' },
    { icon: Trees, name: isRTL ? 'حیاط و فضای باز' : 'Yard & Open Space', desc: isRTL ? 'فضای بازی و فعالیت‌های برون‌کلاسی' : 'Playground and outdoor activities space' },
    { icon: UtensilsCrossed, name: isRTL ? 'آشپزخانه و ناهارخوری' : 'Kitchen & Dining Hall', desc: isRTL ? 'امکان پخت غذای روزانه و سرو غذای گرم' : 'Daily meal preparation with hot food service' },
    { icon: Monitor, name: isRTL ? 'سایت کامپیوتر' : 'Computer Site', desc: isRTL ? 'شامل سیستم‌های بروز و شبکه داخلی فعال' : 'Modern systems with an active internal network' },
    { icon: Puzzle, name: isRTL ? 'کارگاه مونته سوری' : 'Montessori Workshop', desc: isRTL ? 'کارگاه کودک توانا' : 'Play and cognitive tools' },
  ];

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-24">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'فضا' : 'Space'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('space.title')}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{t('space.subtitle')}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-16 lg:py-24">
        <Reveal className="mb-12">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{t('space.body')}</p>
        </Reveal>

        {/* Image gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-16">
          {SPACES.map((img, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="aspect-square rounded-xl overflow-hidden institutional-shadow group">
                <img src={img} alt={`Space ${i + 1}`} className="w-full h-full object-cover gentle-zoom" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Facilities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="glass neumorphic-inset rounded-2xl p-6 h-full">
                <div className="w-14 h-14 rounded-2xl glass neumorphic-inset flex items-center justify-center mb-5">
                  <f.icon className={`w-6 h-6 ${BLOCK_COLORS[i]}`} />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{f.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}