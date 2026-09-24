export const SITE_URL = 'https://mcoe.ir';

export const SITE_NAME =
  'مجتمع آموزشی معصومه عظیمیان';

export const DEFAULT_SOCIAL_IMAGE =
  `${SITE_URL}/media/site/d641eceeb_generated_8663238f.jpg`;

export const SCHOOL_CONTACT = {
  email: 'school@mcoe.ir',
  telephone: [
    '+98-21-22097446',
    '+98-21-22084949',
    '+98-21-22365647',
    '+98-21-22365648',
  ],
  streetAddress:
    'سعادت‌آباد، سرو غربی، نبش خیابان شکوفه، پلاک ۲',
  addressLocality: 'تهران',
  addressRegion: 'تهران',
  addressCountry: 'IR',
  latitude: 35.779548,
  longitude: 51.361382,
};

const page = (
  path,
  title,
  description,
  options = {}
) => ({
  path,
  title,
  description,
  heading: options.heading || title,
  body: options.body || description,
  image:
    options.image || DEFAULT_SOCIAL_IMAGE,
  type: options.type || 'website',
  priority: options.priority ?? 0.7,
  changefreq:
    options.changefreq || 'monthly',
  breadcrumbs:
    options.breadcrumbs || [],
  robots:
    options.robots || 'index,follow',
});

export const STATIC_SEO_PAGES = [
  page(
    '/',
    'مجتمع آموزشی معصومه عظیمیان | مدرسه دخترانه سعادت آباد',
    'مجتمع آموزشی دخترانه معصومه عظیمیان در سعادت‌آباد تهران؛ کودکستان و پیش‌دبستانی، دبستان دوره اول و دوم و متوسطه دوره اول با آموزش انسان‌گرا و نوین.',
    {
      heading:
        'مجتمع آموزشی دخترانه معصومه عظیمیان در سعادت‌آباد',
      body:
        'مدرسه غیردولتی دخترانه در منطقه ۲ تهران، از کودکستان و پیش‌دبستانی تا دبستان و متوسطه دوره اول.',
      priority: 1,
      changefreq: 'weekly',
    }
  ),
  page(
    '/about',
    'درباره مجتمع آموزشی دخترانه معصومه عظیمیان | سعادت‌آباد',
    'با رویکرد آموزشی، مأموریت، ارزش‌ها و محیط یادگیری مجتمع آموزشی دخترانه معصومه عظیمیان در سعادت‌آباد تهران آشنا شوید.',
    {
      heading:
        'درباره مجتمع آموزشی معصومه عظیمیان',
      breadcrumbs: [
        ['درباره ما', '/about'],
      ],
    }
  ),
  page(
    '/history',
    'تاریخچه مجتمع آموزشی معصومه عظیمیان از سال ۱۳۷۱',
    'تاریخچه تأسیس و توسعه مجتمع آموزشی دخترانه معصومه عظیمیان در سعادت‌آباد؛ بیش از سه دهه تجربه در آموزش دختران.',
    {
      heading: 'تاریخچه مجتمع آموزشی',
      breadcrumbs: [
        ['درباره ما', '/about'],
        ['تاریخچه مجتمع', '/history'],
      ],
    }
  ),
  page(
    '/educational-space',
    'فضای آموزشی مدرسه دخترانه معصومه عظیمیان در سعادت‌آباد',
    'معرفی فضاها و امکانات آموزشی مجتمع دخترانه معصومه عظیمیان در منطقه ۲ تهران؛ محیطی امن برای یادگیری، تجربه و رشد.',
    {
      heading: 'فضا و امکانات آموزشی',
      breadcrumbs: [
        ['درباره ما', '/about'],
        ['فضای آموزشی', '/educational-space'],
      ],
    }
  ),
  page(
    '/levels',
    'مقاطع مدرسه دخترانه معصومه عظیمیان | سعادت‌آباد',
    'مقاطع مجتمع آموزشی دخترانه معصومه عظیمیان شامل کودکستان، پیش‌دبستانی، دبستان دوره اول و دوم و متوسطه دوره اول است.',
    {
      heading: 'مقاطع تحصیلی مجتمع',
      priority: 0.9,
      breadcrumbs: [
        ['مقاطع تحصیلی', '/levels'],
      ],
    }
  ),
  page(
    '/levels/kindergarten',
    'کودکستان و پیش‌دبستانی دخترانه در سعادت‌آباد | رویای کودکی',
    'کودکستان و پیش‌دبستانی رویای کودکی در سعادت‌آباد با یادگیری مبتنی بر بازی، تجربه، هنر و رشد همه‌جانبه کودکان.',
    {
      heading:
        'کودکستان و پیش‌دبستانی رویای کودکی',
      priority: 0.9,
      breadcrumbs: [
        ['مقاطع تحصیلی', '/levels'],
        [
          'کودکستان و پیش‌دبستانی',
          '/levels/kindergarten',
        ],
      ],
    }
  ),
  page(
    '/levels/elementary1',
    'دبستان دخترانه دوره اول در سعادت‌آباد | معصومه عظیمیان',
    'دبستان دخترانه دوره اول، پایه‌های اول تا سوم، در سعادت‌آباد تهران با تمرکز بر سواد پایه، خلاقیت و مهارت‌های فردی.',
    {
      heading: 'دبستان دخترانه دوره اول',
      priority: 0.95,
      breadcrumbs: [
        ['مقاطع تحصیلی', '/levels'],
        [
          'دبستان دوره اول',
          '/levels/elementary1',
        ],
      ],
    }
  ),
  page(
    '/levels/elementary2',
    'دبستان دخترانه دوره دوم در سعادت‌آباد | معصومه عظیمیان',
    'دبستان دخترانه دوره دوم، پایه‌های چهارم تا ششم، در سعادت‌آباد تهران با آموزش حل مسئله، مسئولیت‌پذیری و همکاری.',
    {
      heading: 'دبستان دخترانه دوره دوم',
      priority: 0.95,
      breadcrumbs: [
        ['مقاطع تحصیلی', '/levels'],
        [
          'دبستان دوره دوم',
          '/levels/elementary2',
        ],
      ],
    }
  ),
  page(
    '/levels/middleSchool',
    'متوسطه دوره اول دخترانه در سعادت‌آباد | معصومه عظیمیان',
    'مدرسه متوسطه دوره اول دخترانه، پایه‌های هفتم تا نهم، در سعادت‌آباد تهران با هدایت استعدادها و تقویت استقلال فکری.',
    {
      heading: 'متوسطه دوره اول دخترانه',
      priority: 0.95,
      breadcrumbs: [
        ['مقاطع تحصیلی', '/levels'],
        [
          'متوسطه دوره اول',
          '/levels/middleSchool',
        ],
      ],
    }
  ),
  page(
    '/working-groups',
    'کارگروه‌های تخصصی مجتمع آموزشی معصومه عظیمیان',
    'معرفی کارگروه‌های تخصصی آموزشی، علمی، هنری، فناوری، سلامت و روان‌شناسی مجتمع آموزشی دخترانه معصومه عظیمیان.',
    {
      heading: 'کارگروه‌های تخصصی آموزشی',
      changefreq: 'weekly',
      breadcrumbs: [
        ['کارگروه‌ها', '/working-groups'],
      ],
    }
  ),
  page(
    '/associations',
    'انجمن‌های دانش‌آموزی مجتمع آموزشی معصومه عظیمیان',
    'انجمن‌های علمی، ادبی، محیط زیست و مطالعات اجتماعی برای مشارکت فعال دانش‌آموزان مجتمع آموزشی معصومه عظیمیان.',
    {
      heading: 'انجمن‌های دانش‌آموزی',
      breadcrumbs: [
        [
          'انجمن‌های دانش‌آموزی',
          '/associations',
        ],
      ],
    }
  ),
  page(
    '/articles',
    'مقالات آموزشی و تربیتی | مجتمع آموزشی معصومه عظیمیان',
    'مقالات آموزشی، تربیتی و روان‌شناسی برای والدین، دانش‌آموزان و معلمان مجتمع آموزشی معصومه عظیمیان.',
    {
      heading: 'مقالات آموزشی و تربیتی',
      changefreq: 'weekly',
      breadcrumbs: [
        ['مقالات', '/articles'],
      ],
    }
  ),
  page(
    '/news',
    'اخبار مدرسه | مجتمع آموزشی معصومه عظیمیان سعادت‌آباد',
    'تازه‌ترین اخبار، اطلاعیه‌ها و فعالیت‌های مجتمع آموزشی دخترانه معصومه عظیمیان در سعادت‌آباد تهران.',
    {
      heading: 'اخبار و اطلاعیه‌های مجتمع',
      changefreq: 'daily',
      breadcrumbs: [
        ['اخبار', '/news'],
      ],
    }
  ),
  page(
    '/events',
    'رویدادهای مجتمع آموزشی معصومه عظیمیان',
    'رویدادها، برنامه‌های فرهنگی و فعالیت‌های آموزشی مجتمع آموزشی دخترانه معصومه عظیمیان در سعادت‌آباد.',
    {
      heading: 'رویدادهای مجتمع آموزشی',
      changefreq: 'weekly',
      breadcrumbs: [
        ['رویدادها', '/events'],
      ],
    }
  ),
  page(
    '/collaborate',
    'همکاری با مجتمع آموزشی معصومه عظیمیان',
    'فرصت‌های همکاری آموزشی و حرفه‌ای با مجتمع آموزشی دخترانه معصومه عظیمیان در سعادت‌آباد تهران.',
    {
      heading: 'همکاری با مجتمع آموزشی',
      breadcrumbs: [
        ['همکاری با ما', '/collaborate'],
      ],
    }
  ),
];

const STATIC_SEO_BY_PATH = new Map(
  STATIC_SEO_PAGES.map((entry) => [
    entry.path,
    entry,
  ])
);

export function normalizePath(pathname = '/') {
  const clean = String(pathname)
    .split('?')[0]
    .split('#')[0];

  if (!clean || clean === '/') {
    return '/';
  }

  return clean.replace(/\/+$/, '');
}

export function absoluteUrl(value = '/') {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const path = String(value).startsWith('/')
    ? value
    : `/${value}`;

  return `${SITE_URL}${path}`;
}

export function getStaticSeo(pathname) {
  return STATIC_SEO_BY_PATH.get(
    normalizePath(pathname)
  ) || null;
}

export function isPrivateOrUtilityPath(pathname) {
  const path = normalizePath(pathname);

  return (
    path === '/login' ||
    path === '/forgot-password' ||
    path === '/reset-password' ||
    path === '/search' ||
    path === '/register' ||
    path.startsWith('/dashboard')
  );
}

export function isDynamicPublicPath(pathname) {
  const path = normalizePath(pathname);

  return (
    /^\/(articles|news|events)\/[^/]+$/.test(path) ||
    /^\/working-groups\/[^/]+$/.test(path)
  );
}

export function stripMarkup(value = '') {
  return String(value)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncateDescription(
  value,
  limit = 165
) {
  const clean = stripMarkup(value);

  if (clean.length <= limit) {
    return clean;
  }

  return `${clean.slice(0, limit - 1).trim()}…`;
}

export function createDynamicSeo({
  path,
  title,
  description,
  image,
  sectionTitle,
  sectionPath,
  type = 'article',
  publishedTime = undefined,
  modifiedTime = undefined,
  schema = undefined,
}) {
  const normalizedPath = normalizePath(path);
  const cleanTitle = stripMarkup(title) || SITE_NAME;
  const cleanDescription =
    truncateDescription(description) ||
    `محتوای منتشرشده در ${SITE_NAME}`;

  return {
    path: normalizedPath,
    title: `${cleanTitle} | ${SITE_NAME}`,
    heading: cleanTitle,
    description: cleanDescription,
    body: cleanDescription,
    image: absoluteUrl(
      image || DEFAULT_SOCIAL_IMAGE
    ),
    type,
    robots: 'index,follow',
    priority: 0.65,
    changefreq: 'monthly',
    publishedTime,
    modifiedTime,
    schema,
    breadcrumbs: [
      [sectionTitle, sectionPath],
      [cleanTitle, normalizedPath],
    ],
  };
}

export function createNoIndexSeo(pathname) {
  return {
    path: normalizePath(pathname),
    title: SITE_NAME,
    description:
      'بخش داخلی مجتمع آموزشی معصومه عظیمیان',
    heading: SITE_NAME,
    body: '',
    image: DEFAULT_SOCIAL_IMAGE,
    type: 'website',
    robots: 'noindex,nofollow',
    breadcrumbs: [],
  };
}

export function createOrganizationSchema() {
  return {
    '@type': [
      'School',
      'EducationalOrganization',
    ],
    '@id': `${SITE_URL}/#school`,
    name: SITE_NAME,
    alternateName: [
      'مجتمع آموزشی دخترانه حضرت معصومه (س)',
      'Masoumeh Azimian Educational Complex',
      'MCOE',
    ],
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/mcoe-logo.png`,
    image: DEFAULT_SOCIAL_IMAGE,
    description:
      'مجتمع آموزشی دخترانه در سعادت‌آباد تهران، شامل کودکستان، پیش‌دبستانی، دبستان دوره اول و دوم و متوسطه دوره اول.',
    foundingDate: '1992',
    email: SCHOOL_CONTACT.email,
    telephone: SCHOOL_CONTACT.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        SCHOOL_CONTACT.streetAddress,
      addressLocality:
        SCHOOL_CONTACT.addressLocality,
      addressRegion:
        SCHOOL_CONTACT.addressRegion,
      addressCountry:
        SCHOOL_CONTACT.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SCHOOL_CONTACT.latitude,
      longitude: SCHOOL_CONTACT.longitude,
    },
    areaServed: {
      '@type': 'Place',
      name: 'سعادت‌آباد، منطقه ۲ تهران',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'دانش‌آموزان دختر',
    },
  };
}

export function createStructuredData(entry) {
  const canonical = absoluteUrl(entry.path);
  /** @type {Array<Record<string, unknown>>} */
  const graph = [
    createOrganizationSchema(),
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'fa-IR',
      publisher: {
        '@id': `${SITE_URL}/#school`,
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: entry.title,
      description: entry.description,
      inLanguage: 'fa-IR',
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#school`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: absoluteUrl(entry.image),
      },
      ...(entry.publishedTime
        ? { datePublished: entry.publishedTime }
        : {}),
      ...(entry.modifiedTime
        ? { dateModified: entry.modifiedTime }
        : {}),
    },
  ];

  if (entry.breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        ['صفحه اصلی', '/'],
        ...entry.breadcrumbs,
      ].map(([name, path], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        item: absoluteUrl(path),
      })),
    });
  }

  if (entry.schema) {
    graph.push(entry.schema);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
