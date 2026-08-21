import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { Link } from 'react-router-dom';

const IMG_KG = '/media/site/fc1ec2660_generated_c31ef5f8.jpg';
const IMG_E1 = '/media/site/762d5af46_generated_2f7e8049.jpg';
const IMG_MS = '/media/site/79b290cdc_generated_d244f2b5.jpg';

export default function EducationLevels() {
  const { t, isRTL } = useLanguage();

  const levels = [
    { id: 'kindergarten', title: t('levels.kindergarten'), desc: t('levels.kindergartenDesc'), img: IMG_KG, ages: isRTL ? '۳-۶ سال' : 'Ages 3–6' },
    { id: 'elementary1', title: t('levels.elementary1'), desc: t('levels.elementary1Desc'), img: IMG_E1, ages: isRTL ? 'پایه ۱-۳' : 'Grades 1–3' },
    { id: 'elementary2', title: t('levels.elementary2'), desc: t('levels.elementary2Desc'), img: IMG_E1, ages: isRTL ? 'پایه ۴-۶' : 'Grades 4–6' },
    { id: 'middleSchool', title: t('levels.middleSchool'), desc: t('levels.middleSchoolDesc'), img: IMG_MS, ages: isRTL ? 'پایه ۷-۹' : 'Grades 7–9' },
  ];

  return (
    <section className="py-20 lg:py-30 bg-muted/30">
      <div className="container-institutional">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'مسیر آموزشی' : 'Educational Path'}</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">{t('levels.title')}</h2>
          <p className="text-muted-foreground">{t('levels.subtitle')}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {levels.map((level, i) => (
            <Reveal key={level.id} delay={i * 0.08}>
              <Link
                to={`/levels/${level.id}`}
                className="group block glass neumorphic-inset rounded-2xl overflow-hidden hover-elevate h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={level.img} alt={level.title} className="w-full h-full object-cover gentle-zoom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <div className="absolute top-3 end-3 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-[10px] font-semibold text-primary">
                    {level.ages}
                  </div>
                  <h3 className="absolute bottom-3 inset-x-4 text-white font-bold text-base leading-snug">{level.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{level.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                    {t('common.readMore')}
                    <span className={isRTL ? 'rotate-180' : ''}>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}