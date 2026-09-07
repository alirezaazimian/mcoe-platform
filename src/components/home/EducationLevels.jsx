import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';

import { djangoApi } from '@/api/djangoApi';
import Reveal from '@/components/ui/Reveal';
import { useLanguage } from '@/lib/LanguageContext';
import {
  usePublicContent,
  useSiteSection,
} from '@/hooks/useSiteContent';


const FALLBACK_LEVELS = [
  {
    slug: 'kindergarten',
    title_fa: 'پیش‌دبستانی',
    title_en: 'Kindergarten',
    description_fa: 'یادگیری شاد و هدفمند با محوریت بازی، تجربه و رشد همه‌جانبه کودک.',
    description_en: 'Joyful, purposeful learning through play, experience and whole-child development.',
    age_label_fa: '۳ تا ۶ سال',
    age_label_en: 'Ages 3–6',
  },
  {
    slug: 'elementary1',
    title_fa: 'دوره اول دبستان',
    title_en: 'Elementary — First Cycle',
    description_fa: 'ساخت پایه‌های سواد، تفکر، خلاقیت و مهارت‌های فردی در محیطی امن.',
    description_en: 'Building foundations in literacy, thinking, creativity and personal skills.',
    age_label_fa: 'پایه ۱ تا ۳',
    age_label_en: 'Grades 1–3',
  },
  {
    slug: 'elementary2',
    title_fa: 'دوره دوم دبستان',
    title_en: 'Elementary — Second Cycle',
    description_fa: 'تعمیق دانش، مسئولیت‌پذیری و پرورش توانایی حل مسئله و همکاری.',
    description_en: 'Deepening knowledge, responsibility, problem-solving and collaboration.',
    age_label_fa: 'پایه ۴ تا ۶',
    age_label_en: 'Grades 4–6',
  },
  {
    slug: 'middleSchool',
    title_fa: 'دوره اول متوسطه',
    title_en: 'Middle School — First Cycle',
    description_fa: 'هدایت استعدادها و تقویت استقلال فکری برای ورود آگاهانه به نوجوانی.',
    description_en: 'Guiding talents and strengthening independent thought through early adolescence.',
    age_label_fa: 'پایه ۷ تا ۹',
    age_label_en: 'Grades 7–9',
  },
];


export default function EducationLevels() {
  const {
    t,
    language,
    isRTL,
  } = useLanguage();
  const ForwardArrow = isRTL
    ? ArrowLeft
    : ArrowRight;

  const { data } = usePublicContent(
    'education-levels',
    djangoApi.educationLevels.list
  );
  const { data: section } =
    useSiteSection(
      'education-levels'
    );

  const levels =
    Array.isArray(data) && data.length
      ? data
      : FALLBACK_LEVELS;
  const locale = language === 'en'
    ? 'en'
    : 'fa';
  const title =
    section?.[`title_${locale}`] ||
    t('levels.title');
  const subtitle =
    section?.[`subtitle_${locale}`] ||
    (isRTL
      ? 'مسیر آموزشی'
      : 'Educational Path');
  const body =
    section?.[`body_${locale}`] ||
    t('levels.subtitle');

  return (
    <section className="home-clay-section py-20 lg:py-28">
      <div className="container-institutional">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="home-clay-eyebrow">
            {subtitle}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#001858] mb-4 text-balance">
            {title}
          </h2>
          {body && (
            <p className="text-[#001858]/60 leading-8">
              {body}
            </p>
          )}
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {levels.map((level, index) => {
            const levelTitle =
              level[`title_${locale}`] ||
              level.title_fa;
            const description =
              level[`description_${locale}`] ||
              level.description_fa;
            const age =
              level[`age_label_${locale}`] ||
              level.age_label_fa;

            return (
              <Reveal
                key={level.slug}
                delay={index * 0.07}
                className="h-full"
              >
                <Link
                  to={`/levels/${level.slug}`}
                  className="home-clay-card group flex h-full flex-col rounded-[26px] p-3"
                >
                  <div className="home-clay-image relative aspect-[4/3] overflow-hidden rounded-[19px]">
                    {level.image ? (
                      <img
                        src={level.image}
                        alt={levelTitle}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#002699]">
                        <GraduationCap className="h-12 w-12" />
                      </div>
                    )}
                    {age && (
                      <span className="home-clay-chip absolute end-3 top-3 rounded-full px-3 py-1.5 text-[10px] font-bold text-[#001858]">
                        {age}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                    <h3 className="font-bold leading-7 text-[#001858]">
                      {levelTitle}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-7 text-[#001858]/58">
                      {description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#002699]">
                      {t('common.readMore')}
                      <ForwardArrow className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
