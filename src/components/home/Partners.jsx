import React from 'react';
import {
  BookOpen,
  Lightbulb,
  Globe,
  GraduationCap,
  Library,
  Puzzle,
  Landmark,
  Heart,
  Scroll,
} from 'lucide-react';

import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';

export default function Partners() {
  const { isRTL } = useLanguage();

  const partners = [
    {
      icon: BookOpen,
      name: isRTL ? 'وزارت آموزش و پرورش' : 'Ministry of Education',
      url: 'https://medu.ir',
      tone: 'navy',
    },
    {
      icon: Lightbulb,
      name: isRTL
        ? 'کانون پرورشی فکری کودکان و نوجوانان'
        : 'KPF — Children & Young Adults Intellectual Dev.',
      url: 'https://kpf.ir',
      tone: 'amber',
    },
    {
      icon: Globe,
      name: isRTL
        ? 'موسسه پژوهشی کودکان دنیا'
        : "Children's World Research Institute",
      url: 'https://koodakandonya.org',
      tone: 'blue',
    },
    {
      icon: GraduationCap,
      name: isRTL ? 'موسسه نوجهان' : 'Nojahan Institute',
      url: 'https://nojahan.ir',
      tone: 'navy',
    },
    {
      icon: Library,
      name: isRTL ? 'انتشارات مدرسه' : 'Madraseh Publications',
      url: 'https://madresehpub.ir',
      tone: 'blue',
    },
    {
      icon: Puzzle,
      name: isRTL ? 'انتشارات بازی و اندیشه' : 'Bazi & Andisheh Publications',
      url: 'https://baziandisheh.com',
      tone: 'amber',
    },
    {
      icon: Landmark,
      name: isRTL ? 'موزه ایرانک' : 'Iranak Museum',
      url: 'https://iranak.org',
      tone: 'navy',
    },
    {
      icon: Heart,
      name: isRTL ? 'موسسه صلح درون' : 'Solhe Daroun Institute',
      url: 'https://solhedaroun.com',
      tone: 'amber',
    },
    {
      icon: Scroll,
      name: isRTL
        ? 'موسسه پژوهشی تاریخ و ادبیات'
        : 'History & Literature Research Institute',
      url: 'https://koodaki.org',
      tone: 'blue',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-background border-t border-border">
      <div className="container-institutional">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
            {isRTL
              ? 'موسسه‌هایی که با آن‌ها در ارتباط هستیم'
              : 'Institutions We Are Connected With'}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {partners.map((partner, i) => {
            const Icon = partner.icon;

            const content = (
              <>
                <div
                  className={`mcoe-partner-icon mcoe-partner-icon--${partner.tone}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span className="relative z-[1] text-xs font-medium text-foreground/75 text-center leading-snug">
                  {partner.name}
                </span>
              </>
            );

            return (
              <Reveal key={partner.name} delay={(i % 3) * 0.08}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mcoe-liquid-card mcoe-liquid-card--partner flex flex-col items-center justify-center gap-3 p-6 rounded-[24px] h-full"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="mcoe-liquid-card mcoe-liquid-card--partner flex flex-col items-center justify-center gap-3 p-6 rounded-[24px] h-full">
                    {content}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}