import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { Users, BookOpen, TrendingUp } from 'lucide-react';

export default function Statistics() {
  const { t, isRTL } = useLanguage();

  const stats = [
    { icon: TrendingUp, value: '۳۰+', en: '30+', label: t('stats.years') },
    { icon: Users, value: '۸۰۰۰+', en: '8000+', label: t('stats.students') },
    { icon: BookOpen, value: '۴', en: '4', label: t('stats.levels') },
  ];

  return (
    <section className="py-20 lg:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="container-institutional relative">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-balance">{isRTL ? 'آموزش با عدد و رقم' : 'Education in Numbers'}</h2>
          <p className="text-primary-foreground/70 text-sm">{isRTL ? 'بیش از دو دهه تعهد به آموزش کیفی' : 'Two decades of commitment to quality education'}</p>
        </Reveal>

        <div className="grid grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-1">{isRTL ? stat.value : stat.en}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}