import {
  useEffect,
  useState,
} from 'react';

import { djangoApi } from '@/api/djangoApi';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import {
  FlaskConical,
  Landmark,
  Leaf,
  PenLine,
  UsersRound,
} from 'lucide-react';

const ASSOCIATION_ICONS = {
  'flask-conical': FlaskConical,
  landmark: Landmark,
  leaf: Leaf,
  'pen-line': PenLine,
  'users-round': UsersRound,
};


const DEFAULT_ASSOCIATIONS = [
  {
    id: 'science',
    slug: 'science',
    name_fa: 'انجمن علمی',
    name_en: 'Science Association',
    description_fa:
      'پژوهش، آزمایش و تجربه‌های علمی دانش‌آموزی',
    description_en:
      'Student research, experiments and scientific discovery',
    icon: 'flask-conical',
    accent_color: '#2E7D32',
  },
  {
    id: 'literary',
    slug: 'literary',
    name_fa: 'انجمن ادبی',
    name_en: 'Literary Association',
    description_fa:
      'برگزاری محفل‌های ادبی و ترویج کتاب‌خوانی',
    description_en:
      'Literary gatherings and promoting reading',
    icon: 'pen-line',
    accent_color: '#6C5CE7',
  },
  {
    id: 'environment',
    slug: 'environment',
    name_fa: 'انجمن محیط زیست',
    name_en: 'Environment Association',
    description_fa:
      'حفاظت از طبیعت و ترویج فرهنگ سبز',
    description_en:
      'Nature conservation and green culture',
    icon: 'leaf',
    accent_color: '#2E7D32',
  },
  {
    id: 'social-studies',
    slug: 'social-studies',
    name_fa: 'انجمن مطالعات اجتماعی',
    name_en: 'Social Studies Association',
    description_fa:
      'شناخت جامعه، فرهنگ و مشارکت مسئولانه',
    description_en:
      'Exploring society, culture and responsible participation',
    icon: 'landmark',
    accent_color: '#D81B60',
  },
];

export default function StudentAssociations() {
  const { t, isRTL } = useLanguage();

  const [associations, setAssociations] =
    useState(
      DEFAULT_ASSOCIATIONS
    );

  useEffect(() => {
    let cancelled = false;

    djangoApi.studentAssociations
      .list()
      .then((response) => {
        const records =
          Array.isArray(response)
            ? response
            : response?.results;

        if (
          !cancelled &&
          Array.isArray(records)
        ) {
          setAssociations(records);
        }
      })
      .catch(() => {
        // Keep the bundled cards available during API outages.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-24">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'انجمن‌ها' : 'Associations'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('associations.title')}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{t('associations.subtitle')}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-16 lg:py-24">
        <Reveal className="mb-12">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{t('associations.body')}</p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {associations.map((assoc, i) => {
            const Icon =
              ASSOCIATION_ICONS[
                assoc.icon
              ] || UsersRound;

            const name =
              assoc[
                `name_${isRTL ? 'fa' : 'en'}`
              ] ||
              assoc[
                `name_${isRTL ? 'en' : 'fa'}`
              ];

            const description =
              assoc[
                `description_${isRTL ? 'fa' : 'en'}`
              ] ||
              assoc[
                `description_${isRTL ? 'en' : 'fa'}`
              ];

            return (
              <Reveal
                key={
                  assoc.id ||
                  assoc.slug
                }
                delay={
                  (i % 3) * 0.08
                }
              >
                <div className="glass association-style-card rounded-2xl p-6 h-full">
                  <div className="w-14 h-14 rounded-2xl glass association-style-card flex items-center justify-center mb-5">
                    <Icon
                      className="w-6 h-6"
                      style={{
                        color:
                          assoc.accent_color ||
                          '#2E7D32',
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}
