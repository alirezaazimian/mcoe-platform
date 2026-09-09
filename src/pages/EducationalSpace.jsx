import React from 'react';
import {
  Building2,
  Dumbbell,
  FlaskConical,
  Library,
  Monitor,
  Palette,
  Puzzle,
  Trees,
  UtensilsCrossed,
} from 'lucide-react';

import { djangoApi } from '@/api/djangoApi';
import Reveal from '@/components/ui/Reveal';
import { Image } from '@/components/ui/image';
import {
  usePublicContent,
  useSiteSection,
} from '@/hooks/useSiteContent';
import { useLanguage } from '@/lib/LanguageContext';


const ICONS = {
  Building2,
  Dumbbell,
  FlaskConical,
  Library,
  Monitor,
  Palette,
  Puzzle,
  Trees,
  UtensilsCrossed,
};


const FALLBACK_FACILITIES = [
  ['کلاس‌های استاندارد', 'Standard Classrooms', 'مجهز به ابزار فناوری اطلاعات و امکانات چندرسانه‌ای', 'Equipped with IT tools and multimedia facilities', 'Building2'],
  ['آزمایشگاه‌های مجهز', 'Equipped Labs', 'آزمایشگاه‌های علوم، زیست‌شناسی، فیزیک و اپتیک برای آموزش عملی', 'Science, biology, physics and optics labs for hands-on learning', 'FlaskConical'],
  ['کتابخانه', 'Library', 'منبع غنی آموزشی و محیطی آرام برای مطالعه', 'A rich learning resource and a calm reading environment', 'Library'],
  ['فضای هنر', 'Art Space', 'کارگاه نقاشی، سفال و هنرهای دستی', 'Painting, pottery and crafts workshops', 'Palette'],
  ['سالن ورزشی', 'Sports Hall', 'فضای مناسب تربیت بدنی و فعالیت‌های ورزشی', 'A dedicated space for physical education and sports', 'Dumbbell'],
  ['حیاط و فضای باز', 'Yard & Open Space', 'فضای بازی و فعالیت‌های برون‌کلاسی', 'Playground and outdoor learning activities', 'Trees'],
  ['آشپزخانه و ناهارخوری', 'Kitchen & Dining Hall', 'پخت روزانه و سرو غذای گرم', 'Daily preparation and service of hot meals', 'UtensilsCrossed'],
  ['سایت کامپیوتر', 'Computer Lab', 'سیستم‌های به‌روز و شبکه داخلی فعال', 'Modern systems with an active internal network', 'Monitor'],
  ['کارگاه مونته‌سوری', 'Montessori Workshop', 'ابزارهای بازی، یادگیری و پرورش توانایی‌های شناختی', 'Play and learning tools for cognitive development', 'Puzzle'],
].map((values, index) => ({
  id: `fallback-${index}`,
  name_fa: values[0],
  name_en: values[1],
  description_fa: values[2],
  description_en: values[3],
  icon: values[4],
}));


export default function EducationalSpace() {
  const {
    language,
    isRTL,
  } = useLanguage();
  const locale = language === 'en'
    ? 'en'
    : 'fa';
  const { data: imageData } =
    usePublicContent(
      'educational-space-images',
      () =>
        djangoApi.siteImages.listBySection(
          'educational_space'
        )
    );
  const { data: facilityData } =
    usePublicContent(
      'facilities',
      djangoApi.facilities.list
    );
  const { data: section } =
    useSiteSection(
      'educational-space'
    );
  const images = Array.isArray(imageData)
    ? imageData.filter((item) => item.image)
    : [];
  const facilities =
    Array.isArray(facilityData) &&
    facilityData.length
      ? facilityData
      : FALLBACK_FACILITIES;
  const title =
    section?.[`title_${locale}`] ||
    (isRTL
      ? 'فضای آموزشی'
      : 'Educational Space');
  const subtitle =
    section?.[`subtitle_${locale}`] ||
    (isRTL
      ? 'فضایی برای یادگیری و رشد'
      : 'A place to learn and grow');
  const body =
    section?.[`body_${locale}`] ||
    (isRTL
      ? 'فضاهای آموزشی مجتمع برای تجربه، خلاقیت، تعامل و یادگیری ایمن طراحی شده‌اند.'
      : 'Our educational spaces are designed for safe learning, creativity, interaction and experience.');

  return (
    <main className="space-clay-page">
      <section className="border-b border-[#001858]/[0.07] py-16 lg:py-24">
        <div className="container-institutional">
          <Reveal>
            <div className="space-clay-heading">
              <span>{subtitle}</span>
              <h1>{title}</h1>
              {body && <p>{body}</p>}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-institutional py-14 lg:py-20">
        {images.length ? (
          <div className="mb-16 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {images.map((item, index) => {
              const alt =
                item[`alt_${locale}`] ||
                item.alt_fa ||
                title;
              const caption =
                item[`caption_${locale}`] ||
                item.caption_fa;

              return (
                <Reveal
                  key={item.id}
                  delay={(index % 4) * 0.055}
                  className={
                    index === 0
                      ? 'col-span-2 row-span-2'
                      : ''
                  }
                >
                  <figure className="space-clay-media group relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={alt}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-[1.025]"
                      fittingType="fill"
                    />
                    {caption && (
                      <figcaption className="absolute inset-x-4 bottom-4 z-20 rounded-xl bg-[#001858]/90 px-3 py-2 text-xs leading-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {caption}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="space-clay-panel mb-16 rounded-2xl px-6 py-12 text-center text-sm text-[#001858]/55">
            {isRTL
              ? 'تصاویر واقعی مدرسه از بخش «محتوای سایت» در داشبورد قابل افزودن هستند.'
              : 'Authentic school photos can be added from Site Content in the dashboard.'}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => {
            const Icon =
              ICONS[facility.icon] ||
              Building2;
            const name =
              facility[`name_${locale}`] ||
              facility.name_fa;
            const description =
              facility[`description_${locale}`] ||
              facility.description_fa;

            return (
              <Reveal
                key={facility.id || name}
                delay={(index % 3) * 0.07}
                className="h-full"
              >
                <article className="glass association-style-card h-full rounded-2xl p-6">
                  <div className="glass association-style-card mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-[#002699]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mb-2 text-lg font-bold text-[#001858]">
                    {name}
                  </h2>
                  <p className="text-sm leading-7 text-[#001858]/58">
                    {description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
