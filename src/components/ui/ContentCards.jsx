import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { Calendar, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NewsCard({ item, featured = false }) {
  const { language, isRTL } = useLanguage();
  const title = item[`title_${language}`] || item.title_fa || item.title_en || '';
  const summary = item[`summary_${language}`] || item.summary_fa || item.summary_en || '';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const date = item.publish_date || item.created_date;

  if (featured) {
    return (
      <Link to={`/news/${item.id}`} className="group block glass neumorphic-inset rounded-2xl overflow-hidden hover-elevate h-full">
        <div className="relative aspect-[16/10] overflow-hidden">
          {item.featured_image ? (
            <img src={item.featured_image} alt={title} className="w-full h-full object-cover gentle-zoom" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10" />
          )}
          <div className="absolute top-4 start-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
            {isRTL ? 'ویژه' : 'Featured'}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{date ? new Date(date).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US') : ''}</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">{summary}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            {isRTL ? 'ادامه مطلب' : 'Read more'}
            <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/news/${item.id}`} className="group block glass neumorphic-inset rounded-2xl overflow-hidden hover-elevate h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        {item.featured_image ? (
          <img src={item.featured_image} alt={title} className="w-full h-full object-cover gentle-zoom" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10" />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2.5">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{date ? new Date(date).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US') : ''}</span>
        </div>
        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{summary}</p>
      </div>
    </Link>
  );
}

export function ArticleCard({ item }) {
  const { language, isRTL } = useLanguage();
  const title = item[`title_${language}`] || item.title_fa || item.title_en || '';
  const summary = item[`summary_${language}`] || item.summary_fa || item.summary_en || '';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <Link to={`/articles/${item.id}`} className="group block glass neumorphic-inset rounded-2xl overflow-hidden hover-elevate h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        {item.featured_image ? (
          <img src={item.featured_image} alt={title} className="w-full h-full object-cover gentle-zoom" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <span className="text-primary/20 text-4xl font-bold">{isRTL ? 'م' : 'A'}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2.5">
          {item.reading_time_min && (
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{item.reading_time_min} {isRTL ? 'دقیقه' : 'min'}</span>
          )}
          {item.category && <span className="px-2 py-0.5 rounded-md bg-muted text-foreground/60 capitalize">{item.category}</span>}
        </div>
        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{summary}</p>
      </div>
    </Link>
  );
}

export function EventCard({ item }) {
  const { language, isRTL, t } = useLanguage();
  const title = item[`title_${language}`] || item.title_fa || item.title_en || '';
  const desc = item[`description_${language}`] || item.description_fa || item.description_en || '';
  const venue = item[`venue_${language}`] || item.venue_fa || item.venue_en || '';
  const isUpcoming = item.status === 'upcoming';
  const eventDate = item.event_date ? new Date(item.event_date) : null;

  const day = eventDate ? eventDate.toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US', { day: 'numeric' }) : '—';
  const month = eventDate ? eventDate.toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US', { month: 'short' }) : '';

  return (
    <Link to={`/events/${item.id}`} className="group block glass neumorphic-inset rounded-2xl overflow-hidden hover-elevate h-full">
      <div className="relative aspect-[16/9] overflow-hidden">
        {item.banner_image ? (
          <img src={item.banner_image} alt={title} className="w-full h-full object-cover gentle-zoom" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/15 to-secondary/10" />
        )}
        <div className="absolute top-3 start-3 w-14 h-14 rounded-xl bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center institutional-shadow">
          <span className="text-lg font-bold text-primary leading-none">{day}</span>
          <span className="text-[10px] text-muted-foreground uppercase mt-0.5">{month}</span>
        </div>
        <span className={cn(
          "absolute top-3 end-3 px-2.5 py-1 rounded-full text-[10px] font-semibold",
          isUpcoming ? "bg-success text-white" : "bg-muted text-muted-foreground"
        )}>
          {isUpcoming ? t('page.upcoming') : t('page.completed')}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">{desc}</p>
        {venue && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span className="truncate">{venue}</span>
          </div>
        )}
      </div>
    </Link>
  );
}