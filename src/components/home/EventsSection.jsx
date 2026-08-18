import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { EventCard } from '@/components/ui/ContentCards';
import { base44 } from '@/api/base44Client';

export default function EventsSection() {
  const { t, isRTL } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Event.filter({ status: 'upcoming' }, 'event_date', 3)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 lg:py-30 bg-background">
      <div className="container-institutional">
        <Reveal className="flex items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-2 block">{isRTL ? 'رویدادها' : 'Events'}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">{t('common.upcomingEvents')}</h2>
          </div>
          <Button to="/events" variant="ghost" size="sm" icon={false}>{t('common.viewAll')}</Button>
        </Reveal>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass neumorphic-inset rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[16/9] bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <EventCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl bg-muted/30">
            <p className="text-muted-foreground">{isRTL ? 'در حال حاضر رویداد پیش‌رویی وجود ندارد.' : 'No upcoming events at this time.'}</p>
          </div>
        )}
      </div>
    </section>
  );
}