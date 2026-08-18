import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import ReactMarkdown from 'react-markdown';
import Reveal from '@/components/ui/Reveal';
import { Calendar, Clock, User, Tag, ArrowRight, ArrowLeft, Share2, BookOpen } from 'lucide-react';

export default function ArticleLayout({ item, type, related = [], loading }) {
  const { language, isRTL, t } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  if (loading) {
    return (
      <div className="container-institutional py-20 lg:py-30">
        <div className="max-w-3xl mx-auto">
          <div className="aspect-[16/9] bg-muted rounded-2xl animate-pulse mb-8" />
          <div className="h-4 bg-muted rounded w-1/3 animate-pulse mb-4" />
          <div className="h-10 bg-muted rounded w-full animate-pulse mb-6" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${Math.random() * 30 + 70}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container-institutional py-24 text-center">
        <div className="text-5xl mb-4 opacity-20"><BookOpen className="w-16 h-16 mx-auto" /></div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{t('page.notFound')}</h1>
        <p className="text-muted-foreground mb-6">{t('page.notFoundHint')}</p>
        <Link to={type === 'news' ? '/news' : '/articles'} className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
          <Arrow className="w-4 h-4 rotate-180 rtl:rotate-0" />
          {t('page.backToList')}
        </Link>
      </div>
    );
  }

  const title = item[`title_${language}`] || item.title_fa || item.title_en || '';
  const summary = item[`summary_${language}`] || item.summary_fa || item.summary_en || '';
  const body = item[`body_${language}`] || item.body_fa || item.body_en || '';
  const date = item.publish_date || item.created_date;
  const listPath = type === 'news' ? '/news' : '/articles';
  const detailPath = type === 'news' ? '/news' : '/articles';

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareUrl);
    }
  };

  return (
    <>
      {/* Hero banner */}
      {item.featured_image && (
        <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
          <img src={item.featured_image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        </div>
      )}

      <article className="container-institutional py-12 lg:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link to={listPath} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <Arrow className="w-4 h-4 rotate-180 rtl:rotate-0" />
            {t('page.backToList')}
          </Link>

          {/* Category badge */}
          {item.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-semibold mb-4 capitalize">
              {item.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4 text-balance">{title}</h1>

          {/* Summary */}
          {summary && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{summary}</p>
          )}

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground pb-6 mb-8 border-b border-border">
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(date).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
            {item.author_name && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {item.author_name}
              </span>
            )}
            {type === 'article' && item.reading_time_min && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {item.reading_time_min} {isRTL ? 'دقیقه' : 'min'}
              </span>
            )}
            <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-primary transition-colors ms-auto">
              <Share2 className="w-4 h-4" />
              {t('page.share')}
            </button>
          </div>

          {/* Body */}
          <div className="prose-mcoe">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-foreground mt-8 mb-3" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-foreground mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-bold text-foreground mt-5 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="text-foreground/80 leading-relaxed mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ps-6 mb-4 space-y-1.5 text-foreground/80" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ps-6 mb-4 space-y-1.5 text-foreground/80" {...props} />,
                a: ({node, ...props}) => <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-foreground" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-s-4 border-primary/30 ps-4 py-2 my-4 text-foreground/70 italic" {...props} />,
                img: ({node, ...props}) => <img className="rounded-xl my-4 w-full" {...props} />,
              }}
            >
              {body || summary}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-border">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {item.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-muted text-foreground/60 text-xs font-medium">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="max-w-5xl mx-auto mt-16 lg:mt-20">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {t('page.related')}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel, i) => {
                const relTitle = rel[`title_${language}`] || rel.title_fa || rel.title_en || '';
                const relSummary = rel[`summary_${language}`] || rel.summary_fa || rel.summary_en || '';
                return (
                  <Reveal key={rel.id} delay={i * 0.08}>
                    <Link to={`${detailPath}/${rel.id}`} className="group block bg-card rounded-2xl overflow-hidden hover-elevate institutional-shadow h-full">
                      <div className="aspect-[16/10] overflow-hidden">
                        {rel.featured_image ? (
                          <img src={rel.featured_image} alt={relTitle} className="w-full h-full object-cover gentle-zoom" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10" />
                        )}
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">{relTitle}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{relSummary}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </>
  );
}