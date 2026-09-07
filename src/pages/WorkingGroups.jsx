import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { djangoApi } from '@/api/djangoApi';
import Reveal from '@/components/ui/Reveal';
import { Image } from '@/components/ui/image';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  Brain,
  Calculator,
  Cpu,
  Globe,
  Palette,
  PenTool,
  Sparkles,
  Users,
} from 'lucide-react';
import '@/styles/working-groups-clay.css';

const ICON_MAP = {
  Globe,
  Palette,
  Sparkles,
  PenTool,
  Cpu,
  Atom,
  BookOpen,
  Calculator,
  Activity,
  Brain,
};

const CARD_ACCENTS = [
  { color: '#001858', soft: 'rgba(0, 24, 88, 0.15)' },
  { color: '#002699', soft: 'rgba(0, 38, 153, 0.14)' },
  { color: '#F5A623', soft: 'rgba(245, 166, 35, 0.17)' },
];

const cleanMarkdown = (value = '') =>
  value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export default function WorkingGroups() {
  const { language, isRTL, t } = useLanguage();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;
  const numberLocale = language === 'fa' ? 'fa-IR' : language === 'ar' ? 'ar-SA' : 'en-US';
  const numberFormatter = new Intl.NumberFormat(numberLocale, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  useEffect(() => {
    djangoApi.workingGroups
      .list()
      .then(setGroups)
      .catch((error) => {
        console.error('Failed to load working groups:', error);
        setGroups([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="wg-clay-page">
      <section className="wg-list-intro">
        <div className="container-institutional py-8 lg:py-12">
          <Reveal>
            <div className="wg-intro-panel">
              <div className="wg-intro-copy">
                <span className="wg-eyebrow">
                  {isRTL ? 'کارگروه‌های آموزشی' : 'Educational Working Groups'}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  {t('groups.title')}
                </h1>
                <p className="mt-4 max-w-2xl text-base lg:text-lg leading-relaxed text-muted-foreground">
                  {t('groups.subtitle')}
                </p>
              </div>

              <div className="wg-count-card" aria-label={isRTL ? 'تعداد کارگروه‌ها' : 'Working group count'}>
                <strong>{loading ? '—' : groups.length.toLocaleString(numberLocale)}</strong>
                <span>{isRTL ? 'کارگروه فعال' : 'active groups'}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-institutional pb-16 lg:pb-24">
        <Reveal className="mb-8 lg:mb-10">
          <p className="wg-section-note">{t('groups.description')}</p>
        </Reveal>

        {loading ? (
          <div className="wg-card-grid" aria-busy="true" aria-label={isRTL ? 'در حال بارگذاری' : 'Loading'}>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="wg-card wg-card-skeleton animate-pulse">
                <div className="wg-card-media bg-muted" />
                <div className="p-5 lg:p-6 space-y-4">
                  <div className="h-3.5 bg-muted rounded-full w-1/3" />
                  <div className="h-6 bg-muted rounded-lg w-4/5" />
                  <div className="space-y-2.5">
                    <div className="h-3.5 bg-muted rounded-full w-full" />
                    <div className="h-3.5 bg-muted rounded-full w-5/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : groups.length > 0 ? (
          <div className="wg-card-grid">
            {groups.map((group, index) => {
              const name = group[`name_${language}`] || group.name_fa || group.name_en || '';
              const description =
                group[`description_${language}`] || group.description_fa || group.description_en || '';
              const plainDescription = cleanMarkdown(description);
              const Icon = ICON_MAP[group.icon] || Users;
              const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

              return (
                <Reveal key={group.id} delay={(index % 6) * 0.045} className="h-full">
                  <Link
                    to={`/working-groups/${group.slug}`}
                    className="wg-card group"
                    style={{ '--wg-accent': accent.color, '--wg-accent-soft': accent.soft }}
                    aria-label={`${t('common.readMore')}: ${name}`}
                  >
                    <div className="wg-card-media">
                      {group.image ? (
                        <Image
                          src={group.image}
                          alt={name}
                          className="wg-card-image"
                          fittingType="fill"
                        />
                      ) : (
                        <div className="wg-image-fallback">
                          <Icon aria-hidden="true" />
                        </div>
                      )}
                      <div className="wg-card-image-shade" />
                      <div className="wg-card-icon">
                        <Icon aria-hidden="true" />
                      </div>
                      <span className="wg-card-index" aria-hidden="true">
                        {numberFormatter.format(index + 1)}
                      </span>
                    </div>

                    <div className="wg-card-body">
                      <span className="wg-card-kicker">
                        {isRTL ? 'کارگروه تخصصی' : 'Specialized group'}
                      </span>
                      <h2>{name}</h2>
                      <p className="wg-card-description">
                        {plainDescription ||
                          (isRTL
                            ? 'برنامه‌ها و اعضای این کارگروه را مشاهده کنید.'
                            : 'View this group’s programs and members.')}
                      </p>

                      <div className="wg-card-footer">
                        <span>{t('common.readMore')}</span>
                        <span className="wg-card-arrow" aria-hidden="true">
                          <ForwardArrow />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="wg-empty-state">
            <div className="wg-empty-icon">
              <Users aria-hidden="true" />
            </div>
            <h2>{t('page.noContent')}</h2>
            <p>{t('page.noContentHint')}</p>
          </div>
        )}
      </section>
    </main>
  );
}
