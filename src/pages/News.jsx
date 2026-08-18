import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { NewsCard } from '@/components/ui/ContentCards';
import NewsFilters from '@/components/news/NewsFilters';
import { djangoApi } from '@/api/djangoApi';

export default function News() {
  const { t, isRTL } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTag, setActiveTag] = useState(null);

useEffect(() => {
  setLoading(true);

  djangoApi.news
    .list()
    .then((data) => {
      setItems(data);
    })
    .catch((error) => {
      console.error('Failed to load news:', error);
      setItems([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  const filtered = items.filter((item) => {
    if (activeCategory && item.category !== activeCategory) return false;
    if (activeTag && !(item.tags || []).includes(activeTag)) return false;
    return true;
  });

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-20">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'اخبار مجتمع' : 'Complex News'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('page.news')}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{t('page.newsSubtitle')}</p>
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
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-5 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {items.length > 0 && (
              <NewsFilters
                items={items}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeTag={activeTag}
                setActiveTag={setActiveTag}
              />
            )}
            {filtered.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item, i) => (
                  <Reveal key={item.id} delay={(i % 3) * 0.08}>
                    <NewsCard item={item} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 rounded-2xl bg-muted/30">
                <div className="text-5xl mb-4 opacity-20">📰</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{t('page.noContent')}</h3>
                <p className="text-sm text-muted-foreground">{t('page.noContentHint')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}