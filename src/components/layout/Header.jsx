import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { Menu, X, Search, ChevronDown, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';
import { djangoApi } from '@/api/djangoApi';

export default function Header() {
  const { t, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [workingGroups, setWorkingGroups] = useState([]);

  useEffect(() => {
  let mounted = true;

  djangoApi.workingGroups
    .list()
    .then((groups) => {
      if (!mounted) return;

      const sorted = [...(groups || [])].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
      );

      setWorkingGroups(sorted);
    })
    .catch((error) => {
      console.error('Failed to load header working groups:', error);
    });

  return () => {
    mounted = false;
  };
}, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchQuery.trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setSearchQuery('');
    setSearchOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const navItems = [
    { label: t('common.home'), to: '/' },
    {
      label: t('common.about'), to: '/about',
      submenu: [
        { label: t('common.history'), to: '/history' },
        { label: t('common.educationalSpace'), to: '/educational-space' },
      ]
    },
    {
      label: t('common.levels'), to: '/levels',
      submenu: [
        { label: t('common.preschool'), to: '/levels/kindergarten' },
        { label: t('levels.elementary1'), to: '/levels/elementary1' },
        { label: t('levels.elementary2'), to: '/levels/elementary2' },
        { label: t('levels.middleSchool'), to: '/levels/middleSchool' },
      ]
    },
    {
      label: t('common.groups'), to: '/working-groups',
      submenu: workingGroups.map((g) => {
        const fa = (g.name_fa || g.name_en || '').replace(/کارگروه\s*/g, '').trim();
        const en = (g.name_en || g.name_fa || '').replace(/Working Group:?\s*/gi, '').trim();
        return {
          label: isRTL ? (fa || en) : (en || fa),
          to: `/working-groups/${g.slug}`,
        };
      })
    },
    { label: t('common.associations'), to: '/associations' },
    { label: t('common.articles'), to: '/articles' },
    { label: t('common.news'), to: '/news' },
    { label: t('common.events'), to: '/events' },
  ];

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden xl:block bg-primary text-primary-foreground/90 text-xs">
        <div className="container-institutional flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <a href="mailto:school@mcoe.ir" className="hover:text-white transition-colors">school@mcoe.ir</a>
            <span className="opacity-60">|</span>
            <span className="opacity-80">{t('footer.address')}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://lms.mcoe.ir" className="hover:text-white transition-colors font-medium flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              {t('common.login')}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass bg-background/85 border-b border-border/60 shadow-sm'
            : 'bg-background/0'
        )}
      >
        <div className="container-institutional">
          <div className={cn('flex items-center justify-between transition-all duration-300', scrolled ? 'h-16' : 'h-20')}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 shrink-0">
              <div className="relative">
                <Image
                  src="/media/site/3cc1bf827_BlackandWhiteElegantInitialsLogo1.png"
                  alt={isRTL ? 'موسسه آموزشی معصومه عظیمیان' : 'Masoumeh Azimian Institute'}
                  className="w-16 h-16 rounded-lg"
                  fittingType="fill"
                />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="font-bold text-foreground text-sm">{isRTL ? 'موسسه آموزشی معصومه عظیمیان' : 'Masoumeh Azimian Institute'}</div>
                <div className="text-[10px] text-muted-foreground tracking-wide uppercase">{isRTL ? 'مجتمع آموزشی حضرت معصومه (س)' : 'Hazrat Masoumeh (S) Educational Complex'}</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-0">
              {navItems.map((item) => {
                const active = isActive(item.to);
                const hasSub = !!item.submenu;
                return (
                  <div
                    key={item.to}
                    className="relative"
                    onMouseEnter={() => hasSub && setOpenDropdown(item.to)}
                    onMouseLeave={() => hasSub && setOpenDropdown(null)}
                  >
                    <Link
                      to={item.to}
                      className={cn(
                        'nav-hover px-2.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 flex items-center gap-1 whitespace-nowrap',
                        active
                          ? 'is-active text-primary'
                          : 'text-foreground/70 hover:text-primary'
                      )}
                    >
                      {item.label}
                      {hasSub && <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', openDropdown === item.to && 'rotate-180')} />}
                    </Link>

                    {/* Dropdown */}
                    {hasSub && openDropdown === item.to && (
                      <div className="absolute top-full pt-2 start-0 z-50" style={{ minWidth: '240px', maxHeight: '70vh' }}>
                        <div className="bg-background rounded-xl border border-border/60 shadow-lg overflow-y-auto p-2 max-h-[70vh]">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              className={cn(
                                'neumorphic-submenu block px-4 py-2.5 text-sm rounded-lg bg-background',
                                location.pathname === sub.to
                                  ? 'text-primary font-medium'
                                  : 'text-foreground/70 hover:text-primary'
                              )}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className="p-2.5 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted/50 transition-colors"
                aria-label={t('common.search')}
              >
                {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <div className="hidden xl:block">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => setMobileOpen((s) => !s)}
                className="xl:hidden p-2.5 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 fade-in">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('common.searchPlaceholder')}
                  className="w-full bg-card border border-border rounded-xl py-3 ps-12 pe-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                />
                <button type="submit" className="sr-only">{isRTL ? 'جستجو' : 'Search'}</button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="xl:hidden glass bg-background/95 border-t border-border fade-in max-h-[80vh] overflow-y-auto">
            <nav className="container-institutional py-4 flex flex-col gap-0.5">
              {navItems.map((item) => {
                const active = isActive(item.to);
                const hasSub = !!item.submenu;
                const expanded = mobileExpanded === item.to;
                return (
                  <div key={item.to}>
                    <div className="flex items-center">
                      <Link
                        to={item.to}
                        className={cn(
                          'flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                          active ? 'text-primary bg-muted/60' : 'text-foreground/80 hover:bg-muted/50'
                        )}
                      >
                        {item.label}
                      </Link>
                      {hasSub && (
                        <button
                          onClick={() => setMobileExpanded(expanded ? null : item.to)}
                          className="p-3 text-foreground/60 hover:text-primary"
                        >
                          <ChevronDown className={cn('w-4 h-4 transition-transform', expanded && 'rotate-180')} />
                        </button>
                      )}
                    </div>
                    {hasSub && expanded && (
                      <div className="ps-4 flex flex-col gap-0.5 mb-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className={cn(
                              'neumorphic-submenu px-4 py-2.5 text-sm rounded-lg bg-background',
                              location.pathname === sub.to
                                ? 'text-primary font-medium'
                                : 'text-foreground/60 hover:text-primary'
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-border">
                <LanguageSwitcher />
                <div className="flex items-center gap-2 text-sm font-medium">
                  <a href="https://lms.mcoe.ir" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {isRTL ? 'ورود' : 'Login'}
                  </a>
                  <span className="opacity-40">/</span>
                  <a href="https://lms.mcoe.ir/new/frontend/web/registerstudent/fullregister" className="text-primary hover:text-primary/80 transition-colors font-semibold">
                    {isRTL ? 'پیش ثبت‌نام' : 'Pre-register'}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}