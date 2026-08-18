import { useLanguage } from '@/lib/LanguageContext';
import { X } from 'lucide-react';

const CATEGORIES_FA = {
  general: 'عمومی',
  announcement: 'اطلاعیه',
  event: 'رویداد',
  academic: 'آموزشی',
  cultural: 'فرهنگی',
};
const CATEGORIES_EN = {
  general: 'General',
  announcement: 'Announcement',
  event: 'Event',
  academic: 'Academic',
  cultural: 'Cultural',
};

export default function NewsFilters({ items, activeCategory, setActiveCategory, activeTag, setActiveTag }) {
  const { isRTL } = useLanguage();
  const cats = isRTL ? CATEGORIES_FA : CATEGORIES_EN;

  // Only show categories/tags that actually appear in the loaded items.
  const availableCategories = Array.from(
    new Set(items.map((i) => i.category).filter(Boolean))
  );
  const availableTags = Array.from(
    new Set(items.flatMap((i) => i.tags || []).filter(Boolean))
  );

  if (!availableCategories.length && !availableTags.length) return null;

  return (
    <div className="glass neumorphic-inset rounded-2xl p-5 mb-8">
      {/* Categories */}
      {availableCategories.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {isRTL ? 'دسته‌بندی' : 'Category'}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                !activeCategory
                  ? 'bg-primary text-primary-foreground'
                  : 'glass neumorphic-inset text-foreground/70 hover:text-primary'
              }`}
            >
              {isRTL ? 'همه' : 'All'}
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'glass neumorphic-inset text-foreground/70 hover:text-primary'
                }`}
              >
                {cats[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {availableTags.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {isRTL ? 'برچسب‌ها' : 'Tags'}
          </p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const active = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(active ? null : tag)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    active
                      ? 'bg-secondary text-secondary-foreground'
                      : 'glass neumorphic-inset text-foreground/70 hover:text-primary'
                  }`}
                >
                  {active && <X className="w-3 h-3" />}
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {(activeCategory || activeTag) && (
        <button
          onClick={() => { setActiveCategory(null); setActiveTag(null); }}
          className="mt-4 text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          {isRTL ? 'پاک کردن فیلترها' : 'Clear filters'}
        </button>
      )}
    </div>
  );
}