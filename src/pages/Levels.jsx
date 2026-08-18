import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';

const IMAGES = {
  kindergarten: 'https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/fc1ec2660_generated_c31ef5f8.png',
  elementary1: 'https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/762d5af46_generated_2f7e8049.png',
  elementary2: 'https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/762d5af46_generated_2f7e8049.png',
  middleSchool: 'https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/79b290cdc_generated_d244f2b5.png',
};

export default function Levels() {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const levels = [
    { id: 'kindergarten', title: t('levels.kindergarten'), desc: t('levels.kindergartenDesc'), img: IMAGES.kindergarten, ages: isRTL ? '۳-۶ سال' : 'Ages 3–6' },
    { id: 'elementary1', title: t('levels.elementary1'), desc: t('levels.elementary1Desc'), img: IMAGES.elementary1, ages: isRTL ? 'پایه ۱-۳' : 'Grades 1–3' },
    { id: 'elementary2', title: t('levels.elementary2'), desc: t('levels.elementary2Desc'), img: IMAGES.elementary2, ages: isRTL ? 'پایه ۴-۶' : 'Grades 4–6' },
    { id: 'middleSchool', title: t('levels.middleSchool'), desc: t('levels.middleSchoolDesc'), img: IMAGES.middleSchool, ages: isRTL ? 'پایه ۷-۹' : 'Grades 7–9' },
  ];

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-24">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'مسیر آموزشی' : 'Educational Path'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('levels.title')}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{t('levels.subtitle')}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-16 lg:py-24">
        <div className="space-y-6">
          {levels.map((level, i) => (
            <Reveal key={level.id} delay={i * 0.08}>
              <Link
                to={`/levels/${level.id}`}
                className="group grid md:grid-cols-12 gap-0 glass neumorphic-inset rounded-2xl overflow-hidden hover-elevate"
              >
                <div className="md:col-span-4 relative aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img src={level.img} alt={level.title} className="w-full h-full object-cover gentle-zoom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent md:bg-gradient-to-r" />
                </div>
                <div className="md:col-span-8 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-primary/8 text-primary text-xs font-semibold">{level.ages}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {isRTL ? `گام ${i + 1} از ۴` : `Step ${i + 1} of 4`}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{level.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{level.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {t('common.readMore')}
                    <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}