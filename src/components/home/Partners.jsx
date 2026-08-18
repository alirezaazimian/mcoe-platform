import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { BookOpen, Lightbulb, Globe, GraduationCap, Library, Puzzle, Landmark, Heart, Scroll } from 'lucide-react';

export default function Partners() {
  const { t, isRTL } = useLanguage();

  // MCOE logo-derived brand palette — each partner block gets its own accent.
  const PARTNER_COLORS = [
    'text-[#001858]',   // navy   — Ministry of Education
    'text-[#F5A623]',   // amber  — KPF
    'text-[#2E7D32]',   // green  — Children's World
    'text-[#0A66C2]',   // blue   — Nojahan
    'text-[#8E44AD]',   // purple — Madraseh Publications
    'text-[#E1306C]',   // pink   — Bazi & Andisheh
    'text-[#6B4226]',   // brown  — Iranak Museum
    'text-[#EB5757]',   // red    — Solhe Daroun
    'text-[#001858]',   // navy   — History & Literature
  ];

  const partners = [
    { icon: BookOpen, name: isRTL ? 'وزارت آموزش و پرورش' : 'Ministry of Education', url: 'https://medu.ir' },
    { icon: Lightbulb, name: isRTL ? 'کانون پرورشی فکری کودکان و نوجوانان' : 'KPF — Children & Young Adults Intellectual Dev.', url: 'https://kpf.ir' },
    { icon: Globe, name: isRTL ? 'موسسه پژوهشی کودکان دنیا' : "Children's World Research Institute", url: 'https://koodakandonya.org' },
    { icon: GraduationCap, name: isRTL ? 'موسسه نوجهان' : 'Nojahan Institute', url: 'https://nojahan.ir' },
    { icon: Library, name: isRTL ? 'انتشارات مدرسه' : 'Madraseh Publications', url: 'https://madresehpub.ir' },
    { icon: Puzzle, name: isRTL ? 'انتشارات بازی و اندیشه' : 'Bazi & Andisheh Publications', url: 'https://baziandisheh.com' },
    { icon: Landmark, name: isRTL ? 'موزه ایرانک' : 'Iranak Museum', url: 'https://iranak.org' },
    { icon: Heart, name: isRTL ? 'موسسه صلح درون' : 'Solhe Daroun Institute', url: 'https://solhedaroun.com' },
    { icon: Scroll, name: isRTL ? 'موسسه پژوهشی تاریخ و ادبیات' : 'History & Literature Research Institute', url: 'https://koodaki.org' },
  ];

  return (
    <section className="py-16 lg:py-20 bg-background border-t border-border">
      <div className="container-institutional">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">{isRTL ? 'موسسه‌هایی که با آن‌ها در ارتباط هستیم' : 'Institutions We Are Connected With'}</h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {partners.map((p, i) => {
            const inner = (
              <>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                  <p.icon className={`w-5 h-5 ${PARTNER_COLORS[i]}`} />
                </div>
                <span className="text-xs font-medium text-foreground/70 text-center leading-snug">{p.name}</span>
              </>
            );
            return (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass neumorphic-inset flex flex-col items-center justify-center gap-3 p-6 rounded-xl h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="glass neumorphic-inset flex flex-col items-center justify-center gap-3 p-6 rounded-xl h-full">
                    {inner}
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