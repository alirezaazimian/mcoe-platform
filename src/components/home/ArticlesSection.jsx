import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { ArticleCard } from '@/components/ui/ContentCards';
import { base44 } from '@/api/base44Client';

export default function ArticlesSection() {
  const { t, isRTL } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Article.filter({ status: 'published' }, '-publish_date', 3)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 lg:py-30 bg-muted/30">
      <div className="container-institutional">
        <Reveal className="flex items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-2 block">{isRTL ? 'مقالات' : 'Articles'}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">{t('common.latestArticles')}</h2>
          </div>
          <Button to="/articles" variant="ghost" size="sm" icon={false}>{t('common.viewAll')}</Button>
        </Reveal>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden institutional-shadow animate-pulse">
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <ArticleCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl bg-card border border-border">
            <p className="text-muted-foreground">{isRTL ? 'به‌زودی مقالات جدید منتشر خواهد شد.' : 'Articles will be published soon.'}</p>
          </div>
        )}
      </div>
    </section>
  );
}