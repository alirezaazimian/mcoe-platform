import React from 'react';
import { Camera } from 'lucide-react';

import { djangoApi } from '@/api/djangoApi';
import Reveal from '@/components/ui/Reveal';
import { Image } from '@/components/ui/image';
import {
  usePublicContent,
  useSiteSection,
} from '@/hooks/useSiteContent';
import { useLanguage } from '@/lib/LanguageContext';


export default function Gallery() {
  const {
    language,
    isRTL,
  } = useLanguage();
  const locale = language === 'en'
    ? 'en'
    : 'fa';
  const {
    data,
    isLoading,
  } = usePublicContent(
    'home-gallery',
    () =>
      djangoApi.siteImages.listBySection(
        'home_gallery'
      )
  );
  const { data: section } =
    useSiteSection('home-gallery');
  const images = Array.isArray(data)
    ? data.filter((item) => item.image)
    : [];
  const title =
    section?.[`title_${locale}`] ||
    (isRTL
      ? 'نگاهی به مجتمع'
      : 'A Glimpse of Our Campus');
  const eyebrow =
    section?.[`subtitle_${locale}`] ||
    (isRTL ? 'گالری' : 'Gallery');

  return (
    <section className="bg-[#FBF6EE] py-20 lg:py-28">
      <div className="container-institutional">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#002699]">
            <Camera className="h-4 w-4" />
            {eyebrow}
          </span>
          <h2 className="text-balance text-3xl font-bold text-[#001858] lg:text-4xl">
            {title}
          </h2>
        </Reveal>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4" aria-busy="true">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`animate-pulse rounded-2xl bg-[#EFE7DA] ${
                  index === 0
                    ? 'col-span-2 row-span-2 aspect-square'
                    : 'aspect-square'
                }`}
              />
            ))}
          </div>
        ) : images.length ? (
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 lg:gap-3.5">
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
                  delay={index * 0.045}
                  className={
                    index === 0
                      ? 'col-span-2 row-span-2'
                      : ''
                  }
                >
                  <figure
                    className={`group relative overflow-hidden rounded-2xl bg-[#EFE7DA] ${
                      index === 0
                        ? 'aspect-square'
                        : 'aspect-square'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={alt}
                      className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      fittingType="fill"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001858]/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {caption && (
                      <figcaption className="absolute inset-x-4 bottom-4 z-20 translate-y-2 text-xs font-semibold leading-6 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {caption}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="home-clay-card rounded-2xl px-6 py-12 text-center text-sm text-[#001858]/55">
            {isRTL
              ? 'تصاویر گالری به‌زودی از پنل مدیریت افزوده می‌شوند.'
              : 'Gallery images will be added from the administration panel.'}
          </div>
        )}
      </div>
    </section>
  );
}
