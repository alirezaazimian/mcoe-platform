import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { djangoApi } from '@/api/djangoApi';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/AppButton';
import ReactMarkdown from 'react-markdown';
import { Calendar, MapPin, Users, Clock, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';

export default function EventDetail() {
  const { id } = useParams();
  const { language, isRTL, t } = useLanguage();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
  setLoading(true);

  djangoApi.events
    .get(id)
    .then(async (data) => {
      setItem(data);

      const allEvents = await djangoApi.events.list();

      const relatedEvents = allEvents
        .filter(
          (event) =>
            String(event.id) !== String(id)
        )
        .slice(0, 3);

      setRelated(relatedEvents);
    })
    .catch((error) => {
      console.error(
        'Failed to load event detail:',
        error
      );

      setItem(null);
      setRelated([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [id]);

  if (loading) {
    return (
      <div className="container-institutional py-20">
        <div className="aspect-[2/1] bg-muted rounded-2xl animate-pulse mb-8 max-w-4xl mx-auto" />
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-10 bg-muted rounded w-2/3 animate-pulse" />
          <div className="h-4 bg-muted rounded w-full animate-pulse" />
          <div className="h-4 bg-muted rounded w-4/5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container-institutional py-24 text-center">
        <div className="text-5xl mb-4 opacity-20"><Calendar className="w-16 h-16 mx-auto" /></div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{t('page.notFound')}</h1>
        <p className="text-muted-foreground mb-6">{t('page.notFoundHint')}</p>
        <Link to="/events" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
          <Arrow className="w-4 h-4 rotate-180 rtl:rotate-0" />
          {t('page.backToList')}
        </Link>
      </div>
    );
  }

  const title = item[`title_${language}`] || item.title_fa || item.title_en || '';
  const desc = item[`description_${language}`] || item.description_fa || item.description_en || '';
  const venue = item[`venue_${language}`] || item.venue_fa || item.venue_en || '';
  const organizer = item[`organizer_${language}`] || item.organizer_fa || item.organizer_en || '';
  const eventDate = item.event_date ? new Date(item.event_date) : null;
  const deadline = item.registration_deadline ? new Date(item.registration_deadline) : null;
  const isUpcoming = item.status === 'upcoming';

  const fmtDate = (d) => d ? d.toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const fmtTime = (d) => d ? d.toLocaleTimeString(language === 'fa' ? 'fa-IR' : 'en-US', { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <>
      {/* Banner */}
      {item.banner_image && (
        <div className="relative h-[40vh] min-h-[280px] overflow-hidden">
          <img src={item.banner_image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
          <div className="absolute top-4 end-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${isUpcoming ? 'bg-success text-white' : 'bg-muted text-muted-foreground'}`}>
              {isUpcoming ? t('page.upcoming') : t('page.completed')}
            </span>
          </div>
        </div>
      )}

      <div className="container-institutional py-12 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Link to="/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <Arrow className="w-4 h-4 rotate-180 rtl:rotate-0" />
              {t('page.backToList')}
            </Link>

            {item.category && (
              <span className="inline-block px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-semibold mb-4 capitalize">
                {item.category}
              </span>
            )}

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6 text-balance">{title}</h1>

            <div className="prose-mcoe">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-foreground mt-8 mb-3" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold text-foreground mt-6 mb-3" {...props} />,
                  p: ({node, ...props}) => <p className="text-foreground/80 leading-relaxed mb-4" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc ps-6 mb-4 space-y-1.5 text-foreground/80" {...props} />,
                  a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-foreground" {...props} />,
                }}
              >
                {desc}
              </ReactMarkdown>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl p-6 institutional-shadow space-y-5">
              <h3 className="font-bold text-foreground mb-2">{isRTL ? 'جزئیات رویداد' : 'Event Details'}</h3>

              <div className="space-y-4 text-sm">
                {eventDate && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-0.5">{t('page.eventDate')}</div>
                      <div className="font-medium text-foreground">{fmtDate(eventDate)}</div>
                      <div className="text-muted-foreground text-xs">{fmtTime(eventDate)}</div>
                    </div>
                  </div>
                )}

                {venue && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-0.5">{t('page.venue')}</div>
                      <div className="font-medium text-foreground">{venue}</div>
                    </div>
                  </div>
                )}

                {organizer && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-0.5">{t('page.organizer')}</div>
                      <div className="font-medium text-foreground">{organizer}</div>
                    </div>
                  </div>
                )}

                {item.capacity != null && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-0.5">{t('page.capacity')}</div>
                      <div className="font-medium text-foreground">{item.capacity} {isRTL ? 'نفر' : 'people'}</div>
                    </div>
                  </div>
                )}

                {deadline && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-0.5">{t('page.deadline')}</div>
                      <div className="font-medium text-foreground">{fmtDate(deadline)}</div>
                    </div>
                  </div>
                )}
              </div>

              {isUpcoming && (
                <Button href={item.registration_url || 'https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister'} className="w-full">
                  {t('page.register')}
                </Button>
              )}

              {item.map_url && (
                <a href={item.map_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-primary border border-border rounded-lg hover:bg-muted/40 transition-colors">
                  <MapPin className="w-4 h-4" />
                  {isRTL ? 'مشاهده روی نقشه' : 'View on map'}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {t('page.related')}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel, i) => {
                const relTitle = rel[`title_${language}`] || rel.title_fa || rel.title_en || '';
                return (
                  <Reveal key={rel.id} delay={i * 0.08}>
                    <Link to={`/events/${rel.id}`} className="group block bg-card rounded-2xl overflow-hidden hover-elevate institutional-shadow h-full">
                      <div className="aspect-[16/9] overflow-hidden">
                        {rel.banner_image ? (
                          <img src={rel.banner_image} alt={relTitle} className="w-full h-full object-cover gentle-zoom" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/15 to-secondary/10" />
                        )}
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">{relTitle}</h4>
                        {rel.event_date && (
                          <span className="text-xs text-muted-foreground">{fmtDate(new Date(rel.event_date))}</span>
                        )}
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}