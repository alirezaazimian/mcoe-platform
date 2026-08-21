import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { Target, Eye, Heart } from 'lucide-react';

const ABOUT_IMG = '/media/site/d641eceeb_generated_8663238f.jpg';

export default function About() {
  const { t, isRTL } = useLanguage();

  const pillars = [
    { icon: Target, title: t('about.mission'), text: t('about.missionText') },
    { icon: Eye, title: t('about.vision'), text: t('about.visionText') },
    { icon: Heart, title: t('about.values'), text: t('about.valuesText') },
  ];

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-24">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'درباره ما' : 'About Us'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl text-balance">{t('about.title')}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">{t('about.body')}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <Reveal>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden glass neumorphic-inset">
              <img src={ABOUT_IMG} alt={t('about.title')} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                {isRTL ? 'رویکرد انسان‌گرای ما' : 'Our Humanistic Approach'}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {isRTL
                  ? 'موسسه آموزشی معصومه عظیمیان با الهام از رویکردهای نوین آموزشی مانند رجیوامیلیا، محیطی فراهم کرده است که در آن کودک به عنوان یک شهروند امروز و فردا دیده می‌شود. ما بر چگونگی یادگیری تمرکز می‌کنیم، نه صرفاً بر نتایج.'
                  : 'Inspired by modern educational approaches such as Reggio Emilia, the Masoumeh Azimian Educational Institute has created an environment where the child is seen as a citizen of today and tomorrow. We focus on how learning happens, not just on outcomes.'}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isRTL
                  ? 'ارتباط و فضای مشترک کودکستان و مجتمع آموزشی، اولین دریچه گسترش دنیای کودک است. ما کودکان را از دیوارهای کلاس بیرون می‌بریم تا فرصت تجربه را بیشتر کنیم.'
                  : 'The shared space between kindergarten and the educational complex is the first window to expanding the child\'s world. We take children beyond classroom walls to increase their opportunities for experience.'}
              </p>
              <Button href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister" className="bg-transparent text-primary hover:bg-primary hover:text-primary-foreground">{t('hero.register')}</Button>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="glass neumorphic-inset rounded-2xl p-8 hover-elevate h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-5">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}