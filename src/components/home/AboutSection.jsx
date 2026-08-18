import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { Target, Eye, Heart } from 'lucide-react';

const ABOUT_IMG = 'https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/af4db7d64_6.jpg';

export default function AboutSection() {
  const { t, isRTL } = useLanguage();

  const pillars = [
    { icon: Target, title: t('about.mission'), text: t('about.missionText') },
    { icon: Eye, title: t('about.vision'), text: t('about.visionText') },
    { icon: Heart, title: t('about.values'), text: t('about.valuesText') },
  ];

  return (
    <section className="py-20 lg:py-30 bg-background">
      <div className="container-institutional">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden institutional-shadow">
                <img src={ABOUT_IMG} alt={t('about.title')} className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">
                {isRTL ? 'درباره ما' : 'About Us'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 text-balance">{t('about.title')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{t('about.body')}</p>
            </Reveal>

            <div className="space-y-5">
              {pillars.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-4 p-4 rounded-xl hover:bg-muted/40 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <p.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8">
                <Button to="/about" variant="outline">{t('common.about')}</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}