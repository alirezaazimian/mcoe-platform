import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import Reveal from '@/components/ui/Reveal';
import { Image } from '@/components/ui/image';
import { Globe, Palette, Sparkles, PenTool, Cpu, Atom, BookOpen, Calculator, Activity, Brain, ArrowRight, ArrowLeft, Users } from 'lucide-react';

const ICON_MAP = { Globe, Palette, Sparkles, PenTool, Cpu, Atom, BookOpen, Calculator, Activity, Brain };

export default function WorkingGroups() {
  const { language, isRTL, t } = useLanguage();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    base44.entities.WorkingGroup.list('sort_order', 50)
      .then(setGroups)
      .catch(() => setGroups([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-24">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'کارگروه‌ها' : 'Working Groups'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('groups.title')}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{t('groups.subtitle')}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-16 lg:py-24">
        <Reveal className="mb-12">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{t('groups.description')}</p>
        </Reveal>

        {loading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-0 glass neumorphic-inset rounded-2xl overflow-hidden animate-pulse">
                <div className="md:col-span-4 aspect-[4/3] md:aspect-auto bg-muted" />
                <div className="md:col-span-8 p-8 space-y-3">
                  <div className="h-6 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : groups.length > 0 ? (
          <div className="space-y-6">
            {groups.map((group, i) => {
              const name = group[`name_${language}`] || group.name_fa || group.name_en || '';
              const desc = group[`description_${language}`] || group.description_fa || group.description_en || '';
              const plainDesc = desc.replace(/[#*_-]/g, '').replace(/\n+/g, ' ').trim();
              const Icon = ICON_MAP[group.icon] || Users;
              return (
                <Reveal key={group.id} delay={i * 0.06}>
                  <Link
                    to={`/working-groups/${group.slug}`}
                    className="group grid md:grid-cols-12 gap-0 glass neumorphic-inset rounded-2xl overflow-hidden hover-elevate"
                  >
                    <div className="md:col-span-4 relative aspect-[4/3] md:aspect-auto overflow-hidden">
                      {group.image ? (
                        <Image src={group.image} alt={name} className="w-full h-full" fittingType="fill" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/8 to-primary/4 flex items-center justify-center">
                          <Icon className="w-12 h-12 text-primary/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent md:bg-gradient-to-r" />
                      <div className="absolute top-4 start-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="md:col-span-8 p-6 lg:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-primary/8 text-primary text-xs font-semibold">
                          {isRTL ? `گروه ${i + 1} از ${groups.length}` : `Group ${i + 1} of ${groups.length}`}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{name}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl line-clamp-3">{plainDesc}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {t('common.readMore')}
                        <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl bg-muted/30">
            <div className="text-5xl mb-4 opacity-20"><Users className="w-16 h-16 mx-auto" /></div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{t('page.noContent')}</h3>
            <p className="text-sm text-muted-foreground">{t('page.noContentHint')}</p>
          </div>
        )}
      </div>
    </>
  );
}