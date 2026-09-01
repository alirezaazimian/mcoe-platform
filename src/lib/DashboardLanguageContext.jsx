import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const translations = {
  overview: { en: 'Overview', fa: 'نمای کلی' },
  workgroups: { en: 'Workgroups', fa: 'گروه‌های کاری' },
  articles: { en: 'Articles', fa: 'مقالات' },
  news: { en: 'News', fa: 'اخبار' },
  events: { en: 'Events', fa: 'رویدادها' },
  teachers: { en: 'Teachers', fa: 'معلمان' },
  students: { en: 'Students', fa: 'دانش‌آموزان' },
  onlineClasses: { en: 'Online Classes', fa: 'کلاس‌های آنلاین' },
  smsPanel: { en: 'SMS Panel', fa: 'پنل پیامک' },
  siteContent: { en: 'Site Content', fa: 'محتوای سایت' },

  schoolAdminPanel: {
    en: 'School Administration Panel',
    fa: 'پنل مدیریت مدرسه',
  },
  welcome: { en: 'Welcome', fa: 'خوش آمدید' },
  logout: { en: 'Log out', fa: 'خروج' },
  activeWorkgroups: {
    en: 'Active Workgroups',
    fa: 'گروه‌های فعال',
  },
  totalStudents: {
    en: 'Pre-registered Students',
    fa: 'دانش‌آموزان پیش‌ثبت‌نام',
  },
  upcomingEvents: {
    en: 'Upcoming Events',
    fa: 'رویدادهای پیش رو',
  },
  publishedArticles: {
    en: 'Published Articles',
    fa: 'مقالات منتشر شده',
  },
  upcomingClasses: {
    en: 'Upcoming Classes',
    fa: 'کلاس‌های پیش رو',
  },
  recentRegistrations: {
    en: 'Recent Registrations',
    fa: 'ثبت‌نام‌های اخیر',
  },
  nextEvent: { en: 'Next Event', fa: 'رویداد بعدی' },
  quickActions: { en: 'Quick Actions', fa: 'دسترسی سریع' },
  manage: { en: 'Manage', fa: 'مدیریت' },
  noRecords: { en: 'No records yet.', fa: 'هنوز رکوردی ثبت نشده است.' },
  modulePending: {
    en: 'This module will be connected to the Django API in the next migration step.',
    fa: 'این بخش در مرحله بعدی مهاجرت به API جنگو متصل می‌شود.',
  },
};

const DashboardLanguageContext = createContext(null);

const STORAGE_KEY = 'mcoe_dashboard_lang';

export function DashboardLanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'fa';
    return localStorage.getItem(STORAGE_KEY) || 'fa';
  });

  const setLang = useCallback((value) => {
    setLangState(value);
    localStorage.setItem(STORAGE_KEY, value);
  }, []);

  const dir = lang === 'fa' ? 'rtl' : 'ltr';

  const t = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    },
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      dir,
      t,
      setLang,
    }),
    [lang, dir, t, setLang]
  );

  return (
    <DashboardLanguageContext.Provider value={value}>
      {children}
    </DashboardLanguageContext.Provider>
  );
}

export function useDashboardLanguage() {
  const context = useContext(DashboardLanguageContext);

  if (!context) {
    throw new Error(
      'useDashboardLanguage must be used within DashboardLanguageProvider'
    );
  }

  return context;
}
