import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import TeamSection from '@/components/workinggroups/TeamSection';
import { Image } from '@/components/ui/image';
import { Globe, Palette, Sparkles, PenTool, Cpu, Atom, BookOpen, Calculator, Activity, Brain, ArrowRight, ArrowLeft, Users } from 'lucide-react';

const ICON_MAP = { Globe, Palette, Sparkles, PenTool, Cpu, Atom, BookOpen, Calculator, Activity, Brain };

export default function WorkingGroupDetail() {
  const { slug } = useParams();
  const { language, isRTL, t } = useLanguage();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    setLoading(true);
    base44.entities.WorkingGroup.filter({ slug })
      .then((data) => setGroup(data[0] || null))
      .catch(() => setGroup(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container-institutional py-20">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-muted animate-pulse mb-6" />
          <div className="h-8 bg-muted rounded w-1/2 animate-pulse mb-4" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-muted rounded animate-pulse" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="container-institutional py-24 text-center">
        <div className="text-5xl mb-4 opacity-20"><Users className="w-16 h-16 mx-auto" /></div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{t('page.notFound')}</h1>
        <Link to="/working-groups" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
          <Arrow className="w-4 h-4 rotate-180 rtl:rotate-0" />
          {t('page.backToList')}
        </Link>
      </div>
    );
  }

  const name = group[`name_${language}`] || group.name_fa || group.name_en || '';
  const desc = group[`description_${language}`] || group.description_fa || group.description_en || '';
  const Icon = ICON_MAP[group.icon] || Users;

  return (
    <>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {group.image ? (
          <Image src={group.image} alt={name} className="w-full h-full" fittingType="fill" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-institutional pb-10">
            <Reveal>
              <Link to="/working-groups" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors">
                <Arrow className="w-4 h-4 rotate-180 rtl:rotate-0" />
                {t('page.backToList')}
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-5xl font-bold text-white mb-1">{name}</h1>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium">
                    {isRTL ? 'کارگروه آموزشی' : 'Working Group'}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-institutional py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-bold text-foreground mb-5">{isRTL ? 'درباره این کارگروه' : 'About This Group'}</h2>
              <div className="prose-mcoe">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-foreground mt-8 mb-3" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-primary mt-8 mb-3 flex items-center gap-2" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-foreground mt-6 mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="text-foreground/80 leading-relaxed mb-4 text-lg" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-none ps-0 mb-4 space-y-2.5 text-foreground/80" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal ps-6 mb-4 space-y-1.5 text-foreground/80" {...props} />,
                    li: ({ node, ...props }) => <li className="flex items-start gap-2.5 text-base" {...props} />,
                    a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
                  }}
                >
                  {desc}
                </ReactMarkdown>
              </div>
            </Reveal>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <Reveal delay={0.2}>
              <div className="sticky top-24 space-y-6">
                {/* Info card */}
                <div className="bg-card rounded-2xl p-6 institutional-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{name}</h3>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'کارگروه آموزشی' : 'Educational Working Group'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">
                    {isRTL ? 'برای مشارکت در فعالیت‌های این کارگروه یا کسب اطلاعات بیشتر، با ما در تماس باشید.' : 'To participate in this group\'s activities or for more information, get in touch with us.'}
                  </p>
                  <Button href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister" className="w-full mb-3 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground">
                    {t('hero.register')}
                  </Button>
                  <Button to="/collaborate" variant="outline" className="w-full" icon={false}>
                    {t('hero.collaborate')}
                  </Button>
                  <div className="mt-5 pt-5 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">{isRTL ? 'نیاز به مشاوره؟' : 'Need counseling?'}</p>
                    <a href="mailto:school@mcoe.ir" className="text-sm font-medium text-primary hover:underline">school@mcoe.ir</a>
                  </div>
                </div>

                {/* Explore card */}
                <div className="bg-primary/5 border-s-4 border-primary rounded-r-xl p-5">
                  <h3 className="font-bold text-foreground mb-2 text-sm">{isRTL ? 'کارگروه‌های دیگر' : 'Other Groups'}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {isRTL ? 'کارگروه‌های آموزشی دیگر موسسه را کشف کنید.' : 'Explore our other educational working groups.'}
                  </p>
                  <Link to="/working-groups" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                    {isRTL ? 'مشاهده همه' : 'View all'}
                    <Arrow className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Team members */}
        <div className="lg:col-span-3">
          <TeamSection groupSlug={group.slug} />
        </div>
      </div>
    </>
  );
}