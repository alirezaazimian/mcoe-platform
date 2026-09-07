import React from 'react';
import {
  BookOpen,
  Globe,
  GraduationCap,
  Heart,
  Landmark,
  Library,
  Lightbulb,
  Puzzle,
  Scroll,
} from 'lucide-react';

import { djangoApi } from '@/api/djangoApi';
import Reveal from '@/components/ui/Reveal';
import { useLanguage } from '@/lib/LanguageContext';
import {
  usePublicContent,
  useSiteSection,
} from '@/hooks/useSiteContent';


const ICONS = {
  BookOpen,
  Globe,
  GraduationCap,
  Heart,
  Landmark,
  Library,
  Lightbulb,
  Puzzle,
  Scroll,
};


const FALLBACK_PARTNERS = [
  ['وزارت آموزش و پرورش', 'Ministry of Education', 'https://medu.ir', 'BookOpen'],
  ['کانون پرورش فکری کودکان و نوجوانان', 'Institute for the Intellectual Development of Children and Young Adults', 'https://kpf.ir', 'Lightbulb'],
  ['مؤسسه پژوهشی کودکان دنیا', "Children's World Research Institute", 'https://koodakandonya.org', 'Globe'],
  ['مؤسسه نوجهان', 'Nojahan Institute', 'https://nojahan.ir', 'GraduationCap'],
  ['انتشارات مدرسه', 'Madraseh Publications', 'https://madresehpub.ir', 'Library'],
  ['انتشارات بازی و اندیشه', 'Bazi & Andisheh Publications', 'https://baziandisheh.com', 'Puzzle'],
  ['موزه ایرانک', 'Iranak Museum', 'https://iranak.org', 'Landmark'],
  ['مؤسسه صلح درون', 'Solhe Daroun Institute', 'https://solhedaroun.com', 'Heart'],
  ['مؤسسه پژوهشی تاریخ و ادبیات', 'History & Literature Research Institute', 'https://koodaki.org', 'Scroll'],
].map(([name_fa, name_en, url, icon], index) => ({
  id: `fallback-${index}`,
  name_fa,
  name_en,
  url,
  icon,
}));


export default function Partners() {
  const {
    isRTL,
    language,
  } = useLanguage();
  const locale = language === 'en'
    ? 'en'
    : 'fa';
  const { data } = usePublicContent(
    'partners',
    djangoApi.partners.list
  );
  const { data: section } =
    useSiteSection('partners');
  const partners =
    Array.isArray(data) && data.length
      ? data
      : FALLBACK_PARTNERS;
  const title =
    section?.[`title_${locale}`] ||
    (isRTL
      ? 'مؤسسه‌هایی که با آن‌ها در ارتباط هستیم'
      : 'Institutions We Are Connected With');
  const subtitle =
    section?.[`subtitle_${locale}`] ||
    (isRTL
      ? 'همراهان آموزشی'
      : 'Educational Partners');

  return (
    <section className="home-clay-section border-t border-[#001858]/[0.07] py-16 lg:py-20">
      <div className="container-institutional">
        <Reveal className="mx-auto mb-11 max-w-2xl text-center">
          <span className="home-clay-eyebrow">
            {subtitle}
          </span>
          <h2 className="text-balance text-2xl font-bold text-[#001858] lg:text-3xl">
            {title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
          {partners.map((partner, index) => {
            const Icon =
              ICONS[partner.icon] ||
              Landmark;
            const name =
              partner[`name_${locale}`] ||
              partner.name_fa;
            const content = (
              <>
                <div className="home-clay-icon">
                  {partner.image ? (
                    <img
                      src={partner.image}
                      alt=""
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className="max-w-[15rem] text-center text-xs font-semibold leading-6 text-[#001858]/72 sm:text-sm">
                  {name}
                </span>
              </>
            );

            return (
              <Reveal
                key={partner.id || name}
                delay={(index % 3) * 0.07}
                className="h-full"
              >
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-clay-card group flex h-full min-h-40 flex-col items-center justify-center gap-4 rounded-[24px] p-6"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="home-clay-card flex h-full min-h-40 flex-col items-center justify-center gap-4 rounded-[24px] p-6">
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
