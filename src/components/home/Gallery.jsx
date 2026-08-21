import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { Image } from '@/components/ui/image';
import { Camera } from 'lucide-react';

const GALLERY_IMAGES = [
  '/media/site/d641eceeb_generated_8663238f.jpg',
  '/media/site/fc1ec2660_generated_c31ef5f8.jpg',
  '/media/site/762d5af46_generated_2f7e8049.jpg',
  '/media/site/79b290cdc_generated_d244f2b5.jpg',
  '/media/site/debb31be3_generated_a5d84b23.jpg',
];

export default function Gallery() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 lg:py-30 bg-background">
      <div className="container-institutional">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" />{isRTL ? 'گالری' : 'Gallery'}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">{isRTL ? 'نگاهی به مجتمع' : 'A Glimpse of Our Campus'}</h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-3">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <figure
                className={`group relative overflow-hidden rounded-xl bg-muted cursor-pointer ${
                  i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-[2/2]' : 'aspect-square'
                }`}
              >
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Minimal hover overlay — thin gradient line slides up from bottom */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-t from-primary/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                {/* Subtle dark veil on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}