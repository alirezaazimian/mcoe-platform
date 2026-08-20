import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { Search as SearchIcon, FileText, Newspaper, CalendarDays } from 'lucide-react';
import { djangoApi } from '@/api/djangoApi';

export default function Search() {
  const { language, isRTL, t } = useLanguage();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = (params.get('q') || '').trim();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!q) {
      setResults([]);
      return;
    }
    setLoading(true);
    Promise.all([
      djangoApi.articles.list().catch(() => []),
      djangoApi.News.list().catch(() => []),
      djangoApi.events.list().catch(() => []),
    ])
      .then(([articles, news, events]) => {
        if (cancelled) return;
        const needle = q.toLowerCase();
        const match = (text) => (text || '').toLowerCase().includes(needle);

        const mapped = [
          ...articles.map((a) => ({
            type: 'article',
            to: `/articles/${a.id}`,
            title: a[`title_${language}`] || a.title_fa || a.title_en || '',
            summary: a[`summary_${language}`] || a.summary_fa || a.summary_en || '',
          })),
          ...news.map((n) => ({
            type: 'news',
            to: `/news/${n.id}`,
            title: n[`title_${language}`] || n.title_fa || n.title_en || '',
            summary: n[`summary_${language}`] || n.summary_fa || n.summary_en || '',
          })),
          ...events.map((e) => ({
            type: 'event',
            to: `/events/${e.id}`,
            title: e[`title_${language}`] || e.title_fa || e.title_en || '',
            summary: e[`description_${language}`] || e.description_fa || e.description_en || '',
          })),
        ];

        setResults(mapped.filter((r) => match(r.title) || match(r.summary)));
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [q, language]);

  const typeMeta = useMemo(
    () => ({
      article: { icon: FileText, label: isRTL ? 'مقاله' : 'Article' },
      news: { icon: Newspaper, label: isRTL ? 'خبر' : 'News' },
      event: { icon: CalendarDays, label: isRTL ? 'رویداد' : 'Event' },
    }),
    [isRTL]
  );

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-24">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">
              {isRTL ? 'جستجو' : 'Search'}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {q ? `${isRTL ? 'نتایج جستجو برای:' : 'Search results for:'} “${q}”` : t('common.searchPlaceholder')}
            </h1>
            {q && (
              <p className="text-muted-foreground text-lg">
                {loading
                  ? isRTL ? 'در حال جستجو…' : 'Searching…'
                  : isRTL
                    ? `${results.length} نتیجه یافت شد`
                    : `${results.length} result${results.length === 1 ? '' : 's'} found`}
              </p>
            )}
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-16 lg:py-24">
        {!q ? (
          <div className="text-center py-24 rounded-2xl glass neumorphic-inset">
            <SearchIcon className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">{isRTL ? 'عبارتی برای جستجو وارد کنید.' : 'Enter a term to search the site.'}</p>
          </div>
        ) : loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass neumorphic-inset rounded-2xl p-6 animate-pulse">
                <div className="h-5 bg-muted rounded w-1/3 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((r, i) => {
              const meta = typeMeta[r.type];
              const Icon = meta.icon;
              return (
                <Reveal key={`${r.type}-${r.to}-${i}`} delay={i * 0.04}>
                  <Link to={r.to} className="group block glass neumorphic-inset rounded-2xl p-6 hover-elevate">
                    <div className="flex items-center gap-2 text-xs text-secondary font-semibold mb-2">
                      <Icon className="w-4 h-4" />
                      {meta.label}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">{r.title}</h3>
                    {r.summary && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{r.summary}</p>}
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl glass neumorphic-inset">
            <SearchIcon className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">{t('page.noContent')}</h3>
            <p className="text-sm text-muted-foreground">
              {isRTL ? `نتیجه‌ای برای «${q}» یافت نشد.` : `No results for “${q}”.`}
            </p>
          </div>
        )}
      </div>
    </>
  );
}