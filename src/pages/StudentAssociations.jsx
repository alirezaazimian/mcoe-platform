import { useLanguage } from '@/lib/LanguageContext';
import Reveal from '@/components/ui/Reveal';
import { Palette, PenLine, Leaf } from 'lucide-react';

// MCOE logo-derived brand palette — each association block gets its own accent.
const BLOCK_COLORS = [
  'text-[#F5A623]',   // amber  — art
  'text-[#6C5CE7]',   // violet — literary
  'text-[#2E7D32]',   // green  — environment
];

export default function StudentAssociations() {
  const { t, isRTL } = useLanguage();

  const associations = [
    { icon: Palette, name: isRTL ? 'انجمن هنری' : 'Art Association', desc: isRTL ? 'کارگاه‌های هنری و نمایشگاه آثار' : 'Art workshops and exhibitions' },
    { icon: PenLine, name: isRTL ? 'انجمن ادبی' : 'Literary Association', desc: isRTL ? 'برگزاری محفل‌های ادبی و ترویج کتاب‌خوانی' : 'Literary gatherings and promoting reading' },
    { icon: Leaf, name: isRTL ? 'انجمن محیط زیست' : 'Environment Association', desc: isRTL ? 'حفاظت از طبیعت و ترویج فرهنگ سبزی' : 'Nature conservation and green culture' },
  ];

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-24">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'انجمن‌ها' : 'Associations'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('associations.title')}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{t('associations.subtitle')}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-16 lg:py-24">
        <Reveal className="mb-12">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{t('associations.body')}</p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {associations.map((assoc, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="glass neumorphic-inset rounded-2xl p-6 h-full">
                <div className="w-14 h-14 rounded-2xl glass neumorphic-inset flex items-center justify-center mb-5">
                  <assoc.icon className={`w-6 h-6 ${BLOCK_COLORS[i]}`} />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{assoc.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{assoc.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}