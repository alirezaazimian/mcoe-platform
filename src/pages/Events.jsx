import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { EventCard } from '@/components/ui/ContentCards';
import { djangoApi } from '@/api/djangoApi';
import { cn } from '@/lib/utils';

export default function Events() {
  const { t, isRTL } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
  setLoading(true);

  djangoApi.events
    .list(filter)
    .then((data) => {
      setItems(data);
    })
    .catch((error) => {
      console.error('Failed to load events:', error);
      setItems([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [filter]);

  const filters = [
    { key: 'upcoming', label: isRTL ? 'در پیش‌رو' : 'Upcoming' },
    { key: 'completed', label: isRTL ? 'برگزار شده' : 'Completed' },
    { key: 'all', label: isRTL ? 'همه' : 'All' },
  ];

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-20">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'رویدادها' : 'Events'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('page.events')}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{t('page.eventsSubtitle')}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-12 lg:py-16">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                filter === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground/70 hover:border-primary/30 hover:text-primary'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden institutional-shadow animate-pulse">
                <div className="aspect-[16/9] bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 0.08}>
                <EventCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl bg-muted/30">
            <div className="text-5xl mb-4 opacity-20">📅</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{t('page.noContent')}</h3>
            <p className="text-sm text-muted-foreground">{t('page.noContentHint')}</p>
          </div>
        )}
      </div>
    </>
  );
}