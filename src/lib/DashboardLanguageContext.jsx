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
  studentAssociations: {
    en: 'Student Associations',
    fa: 'انجمن‌های دانش‌آموزی',
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
  kindergartenSlides: {
    en: 'Kindergarten Slides',
    fa: 'اسلایدهای کودکستان',
  },
  kindergartenHero: {
    en: 'Kindergarten Hero Image',
    fa: 'تصویر هیروی کودکستان',
  },
  aboutHero: {
    en: 'About Hero Image',
    fa: 'تصویر هیروی درباره ما',
  },
  elementaryFirstSlides: {
    en: 'Elementary First-Cycle Slides',
    fa: 'اسلایدر دبستان دوره اول',
  },
  elementarySecondSlides: {
    en: 'Elementary Second-Cycle Slides',
    fa: 'اسلایدر دبستان دوره دوم',
  },
  middleFirstSlides: {
    en: 'Middle School First-Cycle Slides',
    fa: 'اسلایدر متوسطه دوره اول',
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
  subjects: {
    en: 'Subjects',
    fa: 'درس‌ها',
  },
  teachingAssignments: {
    en: 'Teaching Assignments',
    fa: 'تخصیص تدریس',
  },
  onlineSessions: {
    en: 'Online Sessions',
    fa: 'جلسات آنلاین',
  },
  sessionAttendance: {
    en: 'Session Attendance',
    fa: 'حضور و غیاب',
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
  schoolName: {
    en: 'Masoumeh Azimian Educational Complex',
    fa: 'مجتمع آموزشی معصومه عظیمیان',
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
    en: 'Students',
    fa: 'دانش‌آموزان',
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
    en: 'Upcoming Online Sessions',
    fa: 'جلسات آنلاین پیش رو',
  },
  activeClasses: {
    en: 'Active Classes',
    fa: 'کلاس‌های فعال',
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
  loading: {
    en: 'Loading…',
    fa: 'در حال بارگذاری…',
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
    en: 'Educational Space Images',
    fa: 'تصاویر فضای آموزشی',
  },
  siteImagesIntro: {
    en:
      'Upload and order authentic school photos for the educational space page.',
    fa:
      'عکس‌های واقعی مدرسه را برای صفحه فضای آموزشی بارگذاری و مرتب کنید.',
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
  kindergartenSlidesIntro: {
    en:
      'Manage every image, title, caption, label, display order and publication status in the Childhood Dream slider.',
    fa:
      'تصویر، عنوان، توضیح، برچسب، ترتیب نمایش و وضعیت انتشار اسلایدر کودکستان رویای کودکی را مدیریت کنید.',
  },
  kindergartenHeroIntro: {
    en:
      'Replace the standalone hero photo without changing its public frame or styling.',
    fa:
      'تصویر هیروی مستقل کودکستان را بدون تغییر قاب و استایل سایت جایگزین کنید.',
  },
  aboutHeroIntro: {
    en:
      'Replace the About page photo without changing its public frame or styling.',
    fa:
      'تصویر صفحه درباره ما را بدون تغییر قاب و استایل سایت جایگزین کنید.',
  },
  studentAssociationsIntro: {
    en:
      'Add, edit, order, publish or remove the association cards shown on the public site.',
    fa:
      'کارت‌های انجمن در سایت را اضافه، ویرایش، مرتب، فعال یا حذف کنید.',
  },
  accentColor: {
    en: 'Accent Color (hex)',
    fa: 'رنگ تأکیدی (HEX)',
  },
  elementaryFirstSlidesIntro: {
    en:
      'Upload, order and publish the hero images for the elementary first-cycle page.',
    fa:
      'تصاویر هیرو صفحه دبستان دوره اول را بارگذاری، مرتب و منتشر کنید.',
  },
  elementarySecondSlidesIntro: {
    en:
      'Upload, order and publish the hero images for the elementary second-cycle page.',
    fa:
      'تصاویر هیرو صفحه دبستان دوره دوم را بارگذاری، مرتب و منتشر کنید.',
  },
  middleFirstSlidesIntro: {
    en:
      'Upload, order and publish the hero images for the middle school first-cycle page.',
    fa:
      'تصاویر هیرو صفحه متوسطه دوره اول را بارگذاری، مرتب و منتشر کنید.',
  },

  teachersIntro: {
    en: 'Manage teacher profiles used in teaching assignments and online sessions.',
    fa: 'پروفایل معلمانی را که در تخصیص تدریس و جلسات آنلاین استفاده می‌شوند مدیریت کنید.',
  },
  subjectsIntro: {
    en: 'Define the school subjects used in class schedules.',
    fa: 'درس‌های مورد استفاده در برنامه کلاس‌ها را تعریف و مدیریت کنید.',
  },
  teachingAssignmentsIntro: {
    en: 'Connect each teacher and subject to a school class for an academic year.',
    fa: 'هر معلم و درس را برای یک سال تحصیلی به کلاس مدرسه متصل کنید.',
  },
  onlineClassesIntro: {
    en: 'Schedule sessions now; secure meeting links will activate after a video provider is connected.',
    fa: 'جلسات را اکنون زمان‌بندی کنید؛ لینک امن ورود پس از اتصال سرویس ویدئویی فعال می‌شود.',
  },
  sessionAttendanceIntro: {
    en: 'Review each session roster and update attendance manually until provider reports are connected.',
    fa: 'فهرست هر جلسه را بررسی کنید و تا زمان اتصال گزارش سرویس، حضور را دستی ثبت کنید.',
  },
  providerPendingNotice: {
    en: 'The scheduling foundation is active. No video provider is connected yet, so join links remain safely disabled.',
    fa: 'زیرساخت زمان‌بندی فعال است؛ هنوز سرویس ویدئویی متصل نیست و لینک ورود عمداً غیرفعال می‌ماند.',
  },
  teacherName: {
    en: 'Teacher',
    fa: 'معلم',
  },
  personnelCode: {
    en: 'Personnel Code',
    fa: 'کد پرسنلی',
  },
  teacherBio: {
    en: 'Teacher Biography',
    fa: 'معرفی معلم',
  },
  subject: {
    en: 'Subject',
    fa: 'درس',
  },
  subjectCode: {
    en: 'Subject Code',
    fa: 'کد درس',
  },
  teachingAssignment: {
    en: 'Class, Subject and Teacher',
    fa: 'کلاس، درس و معلم',
  },
  sessionTitle: {
    en: 'Session Title',
    fa: 'عنوان جلسه',
  },
  startsAt: {
    en: 'Start Date and Time (Tehran)',
    fa: 'تاریخ و ساعت شروع (به وقت تهران)',
  },
  durationMinutes: {
    en: 'Duration (minutes)',
    fa: 'مدت جلسه (دقیقه)',
  },
  joinWindowMinutes: {
    en: 'Early Join Window (minutes)',
    fa: 'زمان مجاز ورود پیش از شروع (دقیقه)',
  },
  rosterCount: {
    en: 'Roster',
    fa: 'تعداد فهرست',
  },
  meetingProvider: {
    en: 'Meeting Provider',
    fa: 'سرویس برگزاری',
  },
  notConnected: {
    en: 'Not connected',
    fa: 'متصل نشده',
  },
  allowRecording: {
    en: 'Allow Recording',
    fa: 'ضبط جلسه',
  },
  recordingUrl: {
    en: 'Recording URL',
    fa: 'لینک ضبط',
  },
  notes: {
    en: 'Notes',
    fa: 'یادداشت',
  },
  draft: {
    en: 'Draft',
    fa: 'پیش‌نویس',
  },
  scheduled: {
    en: 'Scheduled',
    fa: 'برنامه‌ریزی‌شده',
  },
  live: {
    en: 'Live',
    fa: 'در حال برگزاری',
  },
  ended: {
    en: 'Ended',
    fa: 'پایان‌یافته',
  },
  cancelled: {
    en: 'Cancelled',
    fa: 'لغوشده',
  },
  expected: {
    en: 'Expected',
    fa: 'در فهرست',
  },
  present: {
    en: 'Present',
    fa: 'حاضر',
  },
  absent: {
    en: 'Absent',
    fa: 'غایب',
  },
  excused: {
    en: 'Excused',
    fa: 'غیبت موجه',
  },
  attendanceStatus: {
    en: 'Attendance Status',
    fa: 'وضعیت حضور',
  },
  attendedMinutes: {
    en: 'Attendance (minutes)',
    fa: 'مدت حضور (دقیقه)',
  },

  classes: {
    en: 'Classes',
    fa: 'کلاس‌ها',
  },
  enrollments: {
    en: 'Enrollments',
    fa: 'ثبت‌نام‌ها',
  },
  studentImport: {
    en: 'Excel Import',
    fa: 'واردسازی اکسل',
  },
  studentsIntro: {
    en: 'Manage student profiles, contact details and portal access.',
    fa: 'پروفایل، اطلاعات تماس و دسترسی پرتال دانش‌آموزان را مدیریت کنید.',
  },
  classesIntro: {
    en: 'Create and manage classes for each grade and academic year.',
    fa: 'کلاس‌های هر پایه و سال تحصیلی را ایجاد و مدیریت کنید.',
  },
  enrollmentsIntro: {
    en: 'Assign every student to a grade and class for the selected year.',
    fa: 'هر دانش‌آموز را در پایه و کلاس سال تحصیلی موردنظر ثبت‌نام کنید.',
  },
  studentImportIntro: {
    en:
      'Preview XLSX files first. Duplicate national codes are merged and no account is activated automatically.',
    fa:
      'ابتدا فایل‌های XLSX را پیش‌نمایش کنید؛ کدهای ملی تکراری ادغام می‌شوند و هیچ حسابی خودکار فعال نمی‌شود.',
  },
  academicYear: {
    en: 'Academic Year',
    fa: 'سال تحصیلی',
  },
  excelFiles: {
    en: 'Excel Files',
    fa: 'فایل‌های اکسل',
  },
  selectedFiles: {
    en: 'files selected',
    fa: 'فایل انتخاب شده',
  },
  chooseExcelFiles: {
    en: 'Choose XLSX files',
    fa: 'انتخاب فایل‌های XLSX',
  },
  previewImport: {
    en: 'Preview Import',
    fa: 'پیش‌نمایش واردسازی',
  },
  commitImport: {
    en: 'Confirm and Import',
    fa: 'تأیید و ثبت اطلاعات',
  },
  importReady: {
    en: 'The files are ready to import.',
    fa: 'فایل‌ها برای ثبت آماده‌اند.',
  },
  importCompleted: {
    en: 'Student import completed.',
    fa: 'واردسازی دانش‌آموزان کامل شد.',
  },
  importHasErrors: {
    en: 'Resolve the reported errors before importing.',
    fa: 'پیش از ثبت، خطاهای گزارش‌شده را برطرف کنید.',
  },
  sourceRows: {
    en: 'Source Rows',
    fa: 'ردیف‌های ورودی',
  },
  uniqueStudents: {
    en: 'Unique Students',
    fa: 'دانش‌آموز یکتا',
  },
  duplicateRows: {
    en: 'Duplicate Rows',
    fa: 'ردیف تکراری',
  },
  missingClass: {
    en: 'Missing Class',
    fa: 'فاقد کلاس',
  },
  missingSms: {
    en: 'Missing SMS Number',
    fa: 'فاقد شماره پیامک',
  },
  errors: {
    en: 'Errors',
    fa: 'خطاها',
  },
  warnings: {
    en: 'Warnings',
    fa: 'هشدارها',
  },
  row: {
    en: 'row',
    fa: 'ردیف',
  },
  createdStudents: {
    en: 'Students created',
    fa: 'دانش‌آموز ایجادشده',
  },
  updatedStudents: {
    en: 'Students updated',
    fa: 'دانش‌آموز به‌روزشده',
  },
  createdEnrollments: {
    en: 'Enrollments created',
    fa: 'ثبت‌نام ایجادشده',
  },
  studentName: {
    en: 'Student',
    fa: 'دانش‌آموز',
  },
  nationalCode: {
    en: 'National Code',
    fa: 'کد ملی',
  },
  grade: {
    en: 'Grade',
    fa: 'پایه',
  },
  classroom: {
    en: 'Class',
    fa: 'کلاس',
  },
  smsMobile: {
    en: 'SMS Mobile',
    fa: 'شماره پیامک',
  },
  portalAccess: {
    en: 'Portal Access',
    fa: 'دسترسی پرتال',
  },
  birthDateJalali: {
    en: 'Birth Date (Jalali)',
    fa: 'تاریخ تولد شمسی',
  },
  firstName: {
    en: 'First Name',
    fa: 'نام',
  },
  lastName: {
    en: 'Last Name',
    fa: 'نام خانوادگی',
  },
  fatherName: {
    en: 'Father Name',
    fa: 'نام پدر',
  },
  gender: {
    en: 'Gender',
    fa: 'جنسیت',
  },
  female: {
    en: 'Female',
    fa: 'دختر',
  },
  male: {
    en: 'Male',
    fa: 'پسر',
  },
  unspecified: {
    en: 'Not specified',
    fa: 'ثبت نشده',
  },
  primaryMobile: {
    en: 'Primary Mobile',
    fa: 'موبایل اصلی',
  },
  homePhone: {
    en: 'Home Phone',
    fa: 'تلفن منزل',
  },
  postalCode: {
    en: 'Postal Code',
    fa: 'کد پستی',
  },
  address: {
    en: 'Address',
    fa: 'نشانی',
  },
  studentCount: {
    en: 'Students',
    fa: 'تعداد دانش‌آموز',
  },
  unassigned: {
    en: 'Unassigned',
    fa: 'بدون کلاس',
  },
  inactive: {
    en: 'Inactive',
    fa: 'غیرفعال',
  },
  transferred: {
    en: 'Transferred',
    fa: 'انتقالی',
  },
  graduated: {
    en: 'Graduated',
    fa: 'فارغ‌التحصیل',
  },
  kindergartenSlideTitle: {
    en: 'Slide Title',
    fa: 'عنوان اسلاید',
  },
  kindergartenSlideTag: {
    en: 'Slide Label',
    fa: 'برچسب اسلاید',
  },
  kindergartenSlideTextFa: {
    en: 'Persian Slide Text',
    fa: 'متن فارسی اسلاید',
  },
  kindergartenSlideTextEn: {
    en: 'English Slide Text',
    fa: 'متن انگلیسی اسلاید',
  },
  kindergartenSlideTagFa: {
    en: 'Persian Slide Label',
    fa: 'برچسب فارسی اسلاید',
  },
  kindergartenSlideTagEn: {
    en: 'English Slide Label',
    fa: 'برچسب انگلیسی اسلاید',
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
