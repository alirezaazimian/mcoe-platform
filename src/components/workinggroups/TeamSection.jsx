import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import Reveal from '@/components/ui/Reveal';
import { Linkedin, UserRound } from 'lucide-react';

export default function TeamSection({ groupSlug }) {
  const { language, isRTL, t } = useLanguage();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    base44.entities.WorkingGroupMember.filter({ group_slug: groupSlug }, 'sort_order')
      .then((data) => setMembers(data))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, [groupSlug]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-2xl p-5 institutional-shadow animate-pulse">
            <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-2/3 mx-auto mb-2" />
            <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (!members.length) return null;

  const heading = isRTL ? 'اعضای این کارگروه' : 'Members of This Group';
  const subheading = isRTL
    ? 'افرادی که فعالیت‌های این کارگروه را پیش می‌برند.'
    : 'The people who drive this group\'s activities.';

  return (
    <div className="mt-16 lg:mt-24 pt-12 border-t border-border">
      <Reveal>
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 text-balance">{heading}</h2>
        <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">{subheading}</p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((m, i) => {
          const name = m[`name_${language}`] || m.name_fa || m.name_en || '';
          const role = m[`role_${language}`] || m.role_fa || m.role_en || '';
          const summary = m[`summary_${language}`] || m.summary_fa || m.summary_en || '';

          return (
            <Reveal key={m.id || i} delay={(i % 4) * 0.08}>
              <article className="glass neumorphic-inset rounded-2xl p-5 text-center h-full flex flex-col items-center">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-muted mb-4 shrink-0">
                  {m.photo_url ? (
                    <Image src={m.photo_url} alt={name} className="w-full h-full" fittingType="fill" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <UserRound className="w-10 h-10" />
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-foreground text-base leading-tight">{name}</h3>
                {role && (
                  <p className="text-sm font-medium text-primary mt-1">{role}</p>
                )}
                {summary && (
                  <p className="text-xs text-muted-foreground leading-relaxed mt-3">{summary}</p>
                )}

                {m.linkedin_url && (
                  <a
                    href={m.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass neumorphic-inset mt-4 w-9 h-9 rounded-full flex items-center justify-center text-[#0A66C2] hover:text-[#0A66C2] transition-colors"
                    aria-label={`${name} LinkedIn`}
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}