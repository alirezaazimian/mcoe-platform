import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

const CTA_IMG = '/media/site/7a95f3af1_IMG_7095.jpg';

export default function CallToAction() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 lg:py-30 bg-background">
      <div className="container-institutional">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden institutional-shadow-lg">
            <div className="absolute inset-0">
              <img src={CTA_IMG} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
            </div>

            <div className="relative px-6 py-16 lg:px-16 lg:py-24 text-center lg:text-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto lg:mx-0"
              >
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 text-balance leading-tight">
                  {isRTL ? 'آماده‌اید آینده‌ای روشن بسازید؟' : 'Ready to shape a brighter future?'}
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {isRTL ? 'همین امروز فرآیند پیش‌ثبت‌نام را آغاز کنید و به خانواده موسسه آموزشی معصومه عظیمیان بپیوندید.' : 'Start the pre-registration process today and join the Masoumeh Azimian Educational Institute family.'}
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <Button href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister" variant="accent" size="lg" className="neumorphic-cta bg-transparent text-white border-0 hover:bg-primary hover:text-white">
                    {t('hero.register')}
                  </Button>
                  <Button to="/collaborate" variant="outline" size="lg" className="neumorphic-cta bg-white/10 text-white hover:bg-white/15 hover:text-white">
                    {t('hero.collaborate')}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}