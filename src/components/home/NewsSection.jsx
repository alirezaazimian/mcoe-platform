import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { NewsCard } from '@/components/ui/ContentCards';
import { djangoApi } from '@/api/djangoApi';

export default function NewsSection() {
  const { t, isRTL } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

  djangoApi.news
    .list()
    .then((data) => {
      setItems(data.slice(0, 4));
    })
    .catch((error) => {
      console.error(
        'Failed to load home news:',
        error
      );

      setItems([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  return (
    <section className="py-20 lg:py-30 bg-background">
      <div className="container-institutional">
        <Reveal className="flex items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-2 block">{isRTL ? 'اخبار' : 'News'}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">{t('common.latestNews')}</h2>
          </div>
          <Button to="/news" variant="ghost" size="sm" icon={false}>{t('common.viewAll')}</Button>
        </Reveal>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden institutional-shadow animate-pulse">
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-5 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl bg-muted/30">
            <p className="text-muted-foreground">{isRTL ? 'به‌زودی اخبار جدید منتشر خواهد شد.' : 'News will be published soon.'}</p>
          </div>
        )}
      </div>
    </section>
  );
}