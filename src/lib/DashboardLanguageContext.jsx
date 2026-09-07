import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';


const translations = {
  overview: {
    en: 'Overview',
    fa: 'نمای کلی',
  },
  workgroups: {
    en: 'Workgroups',
    fa: 'گروه‌های کاری',
  },
  articles: {
    en: 'Articles',
    fa: 'مقالات',
  },
  news: {
    en: 'News',
    fa: 'اخبار',
  },
  events: {
    en: 'Events',
    fa: 'رویدادها',
  },
  heroSlides: {
    en: 'Hero Slides',
    fa: 'اسلایدهای صفحه اصلی',
  },
  teachers: {
    en: 'Teachers',
    fa: 'معلمان',
  },
  students: {
    en: 'Students',
    fa: 'دانش‌آموزان',
  },
  onlineClasses: {
    en: 'Online Classes',
    fa: 'کلاس‌های آنلاین',
  },
  smsPanel: {
    en: 'SMS Panel',
    fa: 'پنل پیامک',
  },
  siteContent: {
    en: 'Site Content',
    fa: 'محتوای سایت',
  },

  schoolAdminPanel: {
    en: 'School Administration Panel',
    fa: 'پنل مدیریت مدرسه',
  },
  welcome: {
    en: 'Welcome',
    fa: 'خوش آمدید',
  },
  logout: {
    en: 'Log out',
    fa: 'خروج',
  },

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
  nextEvent: {
    en: 'Next Event',
    fa: 'رویداد بعدی',
  },
  quickActions: {
    en: 'Quick Actions',
    fa: 'دسترسی سریع',
  },
  manage: {
    en: 'Manage',
    fa: 'مدیریت',
  },
  noRecords: {
    en: 'No records yet.',
    fa: 'رکوردی وجود ندارد.',
  },
  modulePending: {
    en:
      'This module will be connected to the Django API in the next backend expansion.',
    fa:
      'این بخش در توسعه بعدی بک‌اند به API جنگو متصل می‌شود.',
  },

  addNew: {
    en: 'Add New',
    fa: 'افزودن جدید',
  },
  edit: {
    en: 'Edit',
    fa: 'ویرایش',
  },
  delete: {
    en: 'Delete',
    fa: 'حذف',
  },
  save: {
    en: 'Save',
    fa: 'ذخیره',
  },
  cancel: {
    en: 'Cancel',
    fa: 'انصراف',
  },
  search: {
    en: 'Search…',
    fa: 'جستجو…',
  },
  actions: {
    en: 'Actions',
    fa: 'عملیات',
  },
  confirmDelete: {
    en: 'Delete this record?',
    fa: 'این رکورد حذف شود؟',
  },
  requestFailed: {
    en: 'The request could not be completed.',
    fa: 'انجام عملیات با خطا مواجه شد.',
  },
  requiredFields: {
    en: 'Complete the required fields.',
    fa: 'فیلدهای الزامی را کامل کنید.',
  },

  nameFa: {
    en: 'Persian Name',
    fa: 'نام فارسی',
  },
  nameEn: {
    en: 'English Name',
    fa: 'نام انگلیسی',
  },
  slug: {
    en: 'Slug',
    fa: 'Slug',
  },
  descriptionFa: {
    en: 'Persian Description',
    fa: 'توضیحات فارسی',
  },
  descriptionEn: {
    en: 'English Description',
    fa: 'توضیحات انگلیسی',
  },
  icon: {
    en: 'Lucide Icon',
    fa: 'نام آیکن Lucide',
  },
  image: {
    en: 'Image',
    fa: 'تصویر',
  },
  sortOrder: {
    en: 'Sort Order',
    fa: 'ترتیب نمایش',
  },
  chooseImage: {
    en: 'Choose image',
    fa: 'انتخاب تصویر',
  },
  replaceImage: {
    en: 'Replace image',
    fa: 'تغییر تصویر',
  },

  workgroupDetails: {
    en: 'Workgroup Content',
    fa: 'محتوای کارگروه‌ها',
  },
  workgroupMembers: {
    en: 'Workgroup Members',
    fa: 'اعضای کارگروه‌ها',
  },
  workgroup: {
    en: 'Workgroup',
    fa: 'کارگروه',
  },
  chooseWorkgroup: {
    en: 'Choose a workgroup',
    fa: 'انتخاب کارگروه',
  },
  roleFa: {
    en: 'Persian Role',
    fa: 'سمت فارسی',
  },
  roleEn: {
    en: 'English Role',
    fa: 'سمت انگلیسی',
  },
  photo: {
    en: 'Portrait',
    fa: 'عکس عضو',
  },
  email: {
    en: 'Email',
    fa: 'ایمیل',
  },
  linkedinUrl: {
    en: 'LinkedIn URL',
    fa: 'لینک LinkedIn',
  },
  bioFa: {
    en: 'Persian Biography',
    fa: 'معرفی کامل فارسی',
  },
  bioEn: {
    en: 'English Biography',
    fa: 'معرفی کامل انگلیسی',
  },
  educationFa: {
    en: 'Persian Education',
    fa: 'تحصیلات فارسی',
  },
  educationEn: {
    en: 'English Education',
    fa: 'تحصیلات انگلیسی',
  },
  experienceFa: {
    en: 'Persian Experience',
    fa: 'سوابق شغلی فارسی',
  },
  experienceEn: {
    en: 'English Experience',
    fa: 'سوابق شغلی انگلیسی',
  },
  expertiseFa: {
    en: 'Persian Expertise',
    fa: 'تخصص‌ها فارسی',
  },
  expertiseEn: {
    en: 'English Expertise',
    fa: 'تخصص‌ها انگلیسی',
  },
  objectivesFa: {
    en: 'Persian Objectives',
    fa: 'اهداف فارسی',
  },
  objectivesEn: {
    en: 'English Objectives',
    fa: 'اهداف انگلیسی',
  },
  programsFa: {
    en: 'Persian Programs & Activities',
    fa: 'برنامه‌ها و فعالیت‌ها فارسی',
  },
  programsEn: {
    en: 'English Programs & Activities',
    fa: 'برنامه‌ها و فعالیت‌ها انگلیسی',
  },

  workgroupsIntro: {
    en:
      'Manage the workgroups displayed on the public MCOE website.',
    fa:
      'گروه‌های کاری نمایش‌داده‌شده در وب‌سایت MCOE را مدیریت کنید.',
  },
  workgroupMembersIntro: {
    en:
      'Manage portraits, roles and complete resume information shown in every member profile.',
    fa:
      'عکس، سمت و اطلاعات کامل رزومه‌ای نمایش‌داده‌شده در پروفایل اعضا را مدیریت کنید.',
  },
  siteImages: {
    en: 'Gallery & Space Images',
    fa: 'تصاویر گالری و فضای آموزشی',
  },
  siteImagesIntro: {
    en:
      'Upload and order authentic school photos for the home gallery and educational space page.',
    fa:
      'عکس‌های واقعی مدرسه را برای گالری صفحه اصلی و صفحه فضای آموزشی بارگذاری و مرتب کنید.',
  },
  educationLevels: {
    en: 'Education Levels',
    fa: 'مقاطع تحصیلی',
  },
  educationLevelsIntro: {
    en: 'Manage education level cards displayed on the home page.',
    fa: 'کارت‌های مقاطع تحصیلی صفحه اصلی را مدیریت کنید.',
  },
  partners: {
    en: 'Partner Institutions',
    fa: 'مؤسسه‌های همکار',
  },
  partnersIntro: {
    en: 'Manage connected institutions, links, icons and logos.',
    fa: 'نام، لینک، آیکن و لوگوی مؤسسه‌های همکار را مدیریت کنید.',
  },
  facilities: {
    en: 'Educational Facilities',
    fa: 'امکانات فضای آموزشی',
  },
  facilitiesIntro: {
    en: 'Manage the facilities listed on the educational space page.',
    fa: 'امکانات نمایش‌داده‌شده در صفحه فضای آموزشی را مدیریت کنید.',
  },
  sectionTexts: {
    en: 'Section Headings',
    fa: 'متن بخش‌ها',
  },
  sectionTextsIntro: {
    en: 'Edit headings, subtitles and descriptive copy for public site sections.',
    fa: 'عنوان، زیرعنوان و متن توضیحی بخش‌های عمومی سایت را ویرایش کنید.',
  },
  siteSection: {
    en: 'Site Section',
    fa: 'بخش سایت',
  },
  sectionKey: {
    en: 'Section Key',
    fa: 'کلید بخش',
  },
  homeGallery: {
    en: 'Home Gallery',
    fa: 'گالری صفحه اصلی',
  },
  educationalSpace: {
    en: 'Educational Space',
    fa: 'فضای آموزشی',
  },
  captionFa: {
    en: 'Persian Caption',
    fa: 'شرح فارسی',
  },
  captionEn: {
    en: 'English Caption',
    fa: 'شرح انگلیسی',
  },
  ageLabelFa: {
    en: 'Persian Age/Grade Label',
    fa: 'بازه سنی/پایه فارسی',
  },
  ageLabelEn: {
    en: 'English Age/Grade Label',
    fa: 'بازه سنی/پایه انگلیسی',
  },
  websiteUrl: {
    en: 'Website URL',
    fa: 'نشانی وب‌سایت',
  },
  partnerLogo: {
    en: 'Institution Logo',
    fa: 'لوگوی مؤسسه',
  },
  subtitleFa: {
    en: 'Persian Subtitle',
    fa: 'زیرعنوان فارسی',
  },
  subtitleEn: {
    en: 'English Subtitle',
    fa: 'زیرعنوان انگلیسی',
  },
  articlesIntro: {
    en:
      'Manage article copy and separate thumbnail, hero and main images for the public MCOE website.',
    fa:
      'متن مقالات و سه تصویر مستقلِ بندانگشتی، هیرو و اصلی را مدیریت کنید.',
  },
  newsIntro: {
    en:
      'Manage news copy and separate thumbnail, hero and main images for MCOE.',
    fa:
      'متن اخبار و سه تصویر مستقلِ بندانگشتی، هیرو و اصلی را مدیریت کنید.',
  },
  eventsIntro: {
    en:
      'Manage school events and separate thumbnail, hero and main images.',
    fa:
      'رویدادهای مدرسه و سه تصویر مستقلِ بندانگشتی، هیرو و اصلی را مدیریت کنید.',
  },
  heroSlidesIntro: {
    en:
      'Manage each hero story: image, bilingual copy, action link, order and publication status.',
    fa:
      'تصویر، متن دوزبانه، پیوند دکمه، ترتیب و وضعیت انتشار هر اسلاید هیرو را مدیریت کنید.',
  },
  eyebrowFa: {
    en: 'Persian Eyebrow',
    fa: 'پیش‌عنوان فارسی',
  },
  eyebrowEn: {
    en: 'English Eyebrow',
    fa: 'پیش‌عنوان انگلیسی',
  },
  ctaLabelFa: {
    en: 'Persian Button Label',
    fa: 'متن فارسی دکمه',
  },
  ctaLabelEn: {
    en: 'English Button Label',
    fa: 'متن انگلیسی دکمه',
  },
  ctaUrl: {
    en: 'Button Link',
    fa: 'پیوند دکمه',
  },

  altFa: {
    en: 'Persian Alternative Text',
    fa: 'متن جایگزین فارسی',
  },
  altEn: {
    en: 'English Alternative Text',
    fa: 'متن جایگزین انگلیسی',
  },
  alternativeText: {
    en: 'Alternative Text',
    fa: 'متن جایگزین',
  },
  active: {
    en: 'Active',
    fa: 'فعال',
  },

  titleFa: {
    en: 'Persian Title',
    fa: 'عنوان فارسی',
  },
  titleEn: {
    en: 'English Title',
    fa: 'عنوان انگلیسی',
  },
  summaryFa: {
    en: 'Persian Summary',
    fa: 'خلاصه فارسی',
  },
  summaryEn: {
    en: 'English Summary',
    fa: 'خلاصه انگلیسی',
  },
  bodyFa: {
    en: 'Persian Body',
    fa: 'متن فارسی',
  },
  bodyEn: {
    en: 'English Body',
    fa: 'متن انگلیسی',
  },
  featuredImage: {
    en: 'Featured Image',
    fa: 'تصویر شاخص',
  },
  thumbnailImage: {
    en: 'Thumbnail Image (listing card)',
    fa: 'تصویر بندانگشتی (کارت فهرست)',
  },
  heroImage: {
    en: 'Hero Image (top of detail page)',
    fa: 'تصویر هیرو (بالای صفحه جزئیات)',
  },
  mainImage: {
    en: 'Main Image (after the content)',
    fa: 'تصویر اصلی (پس از متن)',
  },
  category: {
    en: 'Category',
    fa: 'دسته‌بندی',
  },
  tags: {
    en: 'Tags',
    fa: 'برچسب‌ها',
  },
  authorName: {
    en: 'Author',
    fa: 'نام نویسنده',
  },
  readingTime: {
    en: 'Reading Time (min)',
    fa: 'زمان مطالعه (دقیقه)',
  },
  status: {
    en: 'Status',
    fa: 'وضعیت',
  },
  publishDate: {
    en: 'Publish Date',
    fa: 'تاریخ انتشار',
  },
  slugFa: {
    en: 'Persian Slug',
    fa: 'Slug فارسی',
  },
  slugEn: {
    en: 'English Slug',
    fa: 'Slug انگلیسی',
  },
  featured: {
    en: 'Featured',
    fa: 'ویژه',
  },

  categoryEducation: {
    en: 'Education',
    fa: 'آموزش',
  },
  categoryParenting: {
    en: 'Parenting',
    fa: 'فرزندپروری',
  },
  categoryPedagogy: {
    en: 'Pedagogy',
    fa: 'روش‌های آموزشی',
  },
  categoryPsychology: {
    en: 'Psychology',
    fa: 'روان‌شناسی',
  },
  categoryGeneral: {
    en: 'General',
    fa: 'عمومی',
  },

  newsCategoryGeneral: {
    en: 'General',
    fa: 'عمومی',
  },
  newsCategoryAnnouncement: {
    en: 'Announcement',
    fa: 'اطلاعیه',
  },
  newsCategoryEvent: {
    en: 'Event',
    fa: 'رویداد',
  },
  newsCategoryAcademic: {
    en: 'Academic',
    fa: 'آموزشی',
  },
  newsCategoryCultural: {
    en: 'Cultural',
    fa: 'فرهنگی',
  },

  statusDraft: {
    en: 'Draft',
    fa: 'پیش‌نویس',
  },
  statusPendingReview: {
    en: 'Pending Review',
    fa: 'در انتظار بررسی',
  },
  statusApproved: {
    en: 'Approved',
    fa: 'تأیید شده',
  },
  statusPublished: {
    en: 'Published',
    fa: 'منتشر شده',
  },
  statusArchived: {
    en: 'Archived',
    fa: 'آرشیو شده',
  },

  eventStatusUpcoming: {
    en: 'Upcoming',
    fa: 'در پیش‌رو',
  },
  eventStatusCompleted: {
    en: 'Completed',
    fa: 'برگزار شده',
  },
  eventDate: {
    en: 'Event Date & Time',
    fa: 'تاریخ و ساعت رویداد',
  },
  registrationDeadline: {
    en: 'Registration Deadline',
    fa: 'مهلت ثبت‌نام',
  },
  venueFa: {
    en: 'Persian Venue',
    fa: 'محل برگزاری فارسی',
  },
  venueEn: {
    en: 'English Venue',
    fa: 'محل برگزاری انگلیسی',
  },
  organizerFa: {
    en: 'Persian Organizer',
    fa: 'برگزارکننده فارسی',
  },
  organizerEn: {
    en: 'English Organizer',
    fa: 'برگزارکننده انگلیسی',
  },
  capacity: {
    en: 'Capacity',
    fa: 'ظرفیت',
  },
  registrationUrl: {
    en: 'Registration URL',
    fa: 'لینک ثبت‌نام',
  },
  mapUrl: {
    en: 'Map URL',
    fa: 'لینک نقشه',
  },
  eventImage: {
    en: 'Event Image',
    fa: 'تصویر رویداد',
  },
};


const DashboardLanguageContext =
  createContext(null);


const STORAGE_KEY =
  'mcoe_dashboard_lang';


export function DashboardLanguageProvider({
  children,
}) {
  const [
    lang,
    setLangState,
  ] = useState(() => {
    if (
      typeof window ===
      'undefined'
    ) {
      return 'fa';
    }

    return (
      localStorage.getItem(
        STORAGE_KEY
      ) || 'fa'
    );
  });


  const setLang =
    useCallback((value) => {
      setLangState(value);

      localStorage.setItem(
        STORAGE_KEY,
        value
      );
    }, []);


  const dir =
    lang === 'fa'
      ? 'rtl'
      : 'ltr';


  const t =
    useCallback(
      (key) => {
        const entry =
          translations[key];

        if (!entry) {
          return key;
        }

        return (
          entry[lang] ||
          entry.en ||
          key
        );
      },
      [lang]
    );


  const value =
    useMemo(
      () => ({
        lang,
        dir,
        t,
        setLang,
      }),
      [
        lang,
        dir,
        t,
        setLang,
      ]
    );


  return (
    <DashboardLanguageContext.Provider
      value={value}
    >
      {children}
    </DashboardLanguageContext.Provider>
  );
}


export function useDashboardLanguage() {
  const context =
    useContext(
      DashboardLanguageContext
    );

  if (!context) {
    throw new Error(
      'useDashboardLanguage must be used within DashboardLanguageProvider'
    );
  }

  return context;
}
