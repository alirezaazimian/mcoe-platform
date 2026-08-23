import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import Button from '@/components/ui/AppButton';
import HeroSlider from '@/components/home/HeroSlider';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${isRTL ? 'to left' : 'to right'}, #001858 1px, transparent 1px), linear-gradient(to bottom, #001858 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="container-institutional relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh] py-12 lg:py-20">
          {/* Text content */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-accent/10 border border-accent/25 mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent shrink-0" />
              <span className="text-sm font-bold text-accent leading-tight">
                {isRTL ? 'پیش‌ثبت‌نام سال تحصیلی ۱۴۰۶-۱۴۰۵' : 'Pre-Registration 2026-2027'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-[1.25] text-balance mb-6 max-w-lg"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister" size="lg" className="bg-transparent text-primary hover:bg-primary hover:text-primary-foreground">
                {t('hero.register')}
              </Button>
              <Button to="/collaborate" variant="outline" size="lg">
                {t('hero.collaborate')}
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-border"
            >
              {[
                { num: '۳۰+', en: '30+', label: isRTL ? 'سال تجربه' : 'Years' },
                { num: '۸۰۰۰+', en: '8000+', label: isRTL ? 'دانش‌آموز' : 'Students' },
                { num: '۴', en: '4', label: isRTL ? 'مقطع' : 'Levels' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-primary">{isRTL ? stat.num : stat.en}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 order-1 lg:order-2 relative"
          >
            <HeroSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}