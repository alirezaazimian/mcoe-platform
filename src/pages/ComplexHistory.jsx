import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { Award, Users, Building } from 'lucide-react';

export default function ComplexHistory() {
  const { t, isRTL } = useLanguage();

  const milestones = [
    { year: isRTL ? '۱۳۷۱' : '1992', title: isRTL ? 'تأسیس موسسه' : 'Foundation', desc: isRTL ? 'آغاز فعالیت با کودکستان و دبستان' : 'Started with kindergarten and elementary' },
    { year: isRTL ? '۱۳۷۴' : '1995', title: isRTL ? 'گسترش مجتمع' : 'Expansion', desc: isRTL ? 'افزودن مقطع متوسطه به مجتمع آموزشی' : 'Added middle school to the complex' },
    { year: isRTL ? '۱۳۸۸' : '2009', title: isRTL ? 'رویکرد انسان‌گرا' : 'Humanistic Approach', desc: isRTL ? 'بازنگری در رویکرد آموزشی و الگوبرداری از رجیوامیلیا' : 'Revision of educational approach, adopting Reggio Emilia' },
    { year: isRTL ? '۱۴۰۲' : '2023', title: isRTL ? 'توسعه کارگروه‌ها' : 'Working Groups', desc: isRTL ? 'تشکیل کارگروه‌های تخصصی برای ارتقای آموزش' : 'Formation of specialized working groups' },
    { year: isRTL ? '۱۴۰۵' : '2026', title: isRTL ? 'امروز' : 'Today', desc: isRTL ? 'یکی از مجتمع‌های پیشرو در آموزش انسان‌گرا و رشد همه جانبه' : 'One of the leading complexes in humanistic education and holistic growth' },
  ];

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-24">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'تاریخچه' : 'History'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('history.title')}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{t('history.subtitle')}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-16 lg:py-24">
        <Reveal className="mb-16">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{t('history.body')}</p>
        </Reveal>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute start-4 lg:start-1/2 top-0 bottom-0 w-0.5 bg-border lg:-translate-x-1/2" />

          {milestones.map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Dot */}
                <div className="absolute start-4 lg:start-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background lg:-translate-x-1/2 mt-6" />

                {/* Content */}
                <div className={`ps-12 lg:ps-0 lg:w-1/2 ${i % 2 === 0 ? 'lg:ps-12' : 'lg:pe-12'}`}>
                  <div className="glass neumorphic-inset rounded-2xl p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-3">{m.year}</span>
                    <h3 className="font-bold text-foreground text-lg mb-2">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Key figures */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: Building, num: '۳۰+', numEn: '30+', label: isRTL ? 'سال فعالیت' : 'Years Active' },
            { icon: Users, num: '۸۰۰۰+', numEn: '8000+', label: isRTL ? 'دانش‌آموز' : 'Students' },
            { icon: Award, num: '۱۰', numEn: '10', label: isRTL ? 'کارگروه تخصصی' : 'Working Groups' },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center glass neumorphic-inset rounded-2xl p-8">
                <div className="w-14 h-14 rounded-2xl glass neumorphic-inset flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{isRTL ? stat.num : stat.numEn}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}