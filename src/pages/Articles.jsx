import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { ArticleCard } from '@/components/ui/ContentCards';
import { djangoApi } from '@/api/djangoApi';

export default function Articles() {
  const { t, isRTL } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setLoading(true);

  djangoApi.articles
    .list()
    .then((data) => {
      setItems(data);
    })
    .catch((error) => {
      console.error('Failed to load articles:', error);
      setItems([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-20">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'مقالات' : 'Articles'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('page.articles')}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{t('page.articlesSubtitle')}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-16 lg:py-20">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass neumorphic-inset rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 0.08}>
                <ArticleCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl bg-muted/30">
            <div className="text-5xl mb-4 opacity-20">📚</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{t('page.noContent')}</h3>
            <p className="text-sm text-muted-foreground">{t('page.noContentHint')}</p>
          </div>
        )}
      </div>
    </>
  );
}