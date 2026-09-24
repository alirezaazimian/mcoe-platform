import {
  mkdir,
  readFile,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  SITE_NAME,
  SITE_URL,
  STATIC_SEO_PAGES,
  absoluteUrl,
  createDynamicSeo,
  createNoIndexSeo,
  createStructuredData,
  stripMarkup,
} from '../src/seo/siteMetadata.js';


const SCRIPT_DIR = path.dirname(
  fileURLToPath(import.meta.url)
);
const PROJECT_ROOT = path.resolve(
  SCRIPT_DIR,
  '..'
);
const DIST_DIR = path.join(
  PROJECT_ROOT,
  'dist'
);
const INDEX_PATH = path.join(
  DIST_DIR,
  'index.html'
);
const API_BASE_URL =
  process.env.MCOE_API_BASE_URL ||
  'https://api.mcoe.ir/api';


function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}


function escapeXml(value = '') {
  return escapeHtml(value);
}


function safeJson(value) {
  return JSON.stringify(value)
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('&', '\\u0026');
}


function replaceOrInsert(
  html,
  pattern,
  replacement
) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }

  return html.replace(
    '</head>',
    `    ${replacement}\n  </head>`
  );
}


function setMeta(
  html,
  attribute,
  key,
  value
) {
  const pattern = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`,
    'i'
  );
  const tag =
    `<meta ${attribute}="${key}" ` +
    `content="${escapeHtml(value)}" />`;

  return replaceOrInsert(
    html,
    pattern,
    tag
  );
}


function setCanonical(html, href) {
  const pattern =
    /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  const tag =
    `<link rel="canonical" ` +
    `href="${escapeHtml(href)}" />`;

  return replaceOrInsert(
    html,
    pattern,
    tag
  );
}


function fallbackMarkup(entry) {
  const links = STATIC_SEO_PAGES
    .filter((item) => (
      item.path !== entry.path &&
      [
        '/',
        '/about',
        '/levels',
        '/articles',
        '/news',
        '/events',
      ].includes(item.path)
    ))
    .map((item) => (
      `<li><a href="${escapeHtml(item.path)}">` +
      `${escapeHtml(item.heading)}</a></li>`
    ))
    .join('');

  return (
    `<main lang="fa" dir="rtl" ` +
    `data-mcoe-seo-snapshot="true">` +
    `<article>` +
    `<h1>${escapeHtml(entry.heading)}</h1>` +
    `<p>${escapeHtml(entry.body || entry.description)}</p>` +
    `<address>` +
    `تهران، سعادت‌آباد، سرو غربی، ` +
    `نبش خیابان شکوفه، پلاک ۲` +
    `</address>` +
    `</article>` +
    `<nav aria-label="دسترسی سریع"><ul>${links}</ul></nav>` +
    `</main>`
  );
}


function renderHtml(template, entry) {
  const canonical = absoluteUrl(entry.path);
  const image = absoluteUrl(entry.image);
  const robots = entry.robots || 'index,follow';
  let html = template;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(entry.title)}</title>`
  );
  html = setMeta(
    html,
    'name',
    'description',
    entry.description
  );
  html = setMeta(
    html,
    'name',
    'robots',
    robots
  );
  html = setMeta(
    html,
    'name',
    'googlebot',
    robots
  );
  html = setMeta(
    html,
    'property',
    'og:locale',
    'fa_IR'
  );
  html = setMeta(
    html,
    'property',
    'og:site_name',
    SITE_NAME
  );
  html = setMeta(
    html,
    'property',
    'og:title',
    entry.title
  );
  html = setMeta(
    html,
    'property',
    'og:description',
    entry.description
  );
  html = setMeta(
    html,
    'property',
    'og:type',
    entry.type || 'website'
  );
  html = setMeta(
    html,
    'property',
    'og:url',
    canonical
  );
  html = setMeta(
    html,
    'property',
    'og:image',
    image
  );
  html = setMeta(
    html,
    'property',
    'og:image:alt',
    entry.heading || entry.title
  );
  html = setMeta(
    html,
    'name',
    'twitter:card',
    'summary_large_image'
  );
  html = setMeta(
    html,
    'name',
    'twitter:title',
    entry.title
  );
  html = setMeta(
    html,
    'name',
    'twitter:description',
    entry.description
  );
  html = setMeta(
    html,
    'name',
    'twitter:image',
    image
  );

  if (entry.publishedTime) {
    html = setMeta(
      html,
      'property',
      'article:published_time',
      entry.publishedTime
    );
  }

  if (entry.modifiedTime) {
    html = setMeta(
      html,
      'property',
      'article:modified_time',
      entry.modifiedTime
    );
  }

  html = setCanonical(html, canonical);
  html = html.replace(
    /\s*<script\s+id=["']mcoe-structured-data["'][\s\S]*?<\/script>/i,
    ''
  );
  html = html.replace(
    '</head>',
    `    <script id="mcoe-structured-data" type="application/ld+json">` +
      `${safeJson(createStructuredData(entry))}` +
      `</script>\n  </head>`
  );
  html = html.replace(
    /<div\s+id=["']root["']>[\s\S]*?<\/div>/i,
    `<div id="root">${fallbackMarkup(entry)}</div>`
  );

  return html;
}


function normalizeCollection(value) {
  if (Array.isArray(value)) {
    return value;
  }

  return Array.isArray(value?.results)
    ? value.results
    : [];
}


async function fetchCollection(endpoint) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${endpoint}/`,
      {
        headers: {
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(25000),
      }
    );

    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText}`
      );
    }

    return normalizeCollection(
      await response.json()
    );
  } catch (error) {
    console.warn(
      `[seo] ${endpoint} was not included: ${error.message}`
    );
    return [];
  }
}


function dateValue(item) {
  const value =
    item.updated_at ||
    item.modified_at ||
    item.publish_date ||
    item.created_at ||
    item.created_date ||
    '';

  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? undefined
    : date.toISOString();
}


function localized(item, field) {
  return (
    item?.[`${field}_fa`] ||
    item?.[`${field}_en`] ||
    item?.[field] ||
    ''
  );
}


function contentImage(item) {
  return (
    item.hero_image ||
    item.featured_image ||
    item.thumbnail_image ||
    item.banner_image ||
    item.image ||
    undefined
  );
}


function articleSchema(
  item,
  entry,
  schemaType
) {
  const image = absoluteUrl(entry.image);
  const published =
    item.publish_date ||
    item.created_date ||
    item.created_at;
  const modified =
    item.updated_at ||
    item.modified_at ||
    published;

  return {
    '@type': schemaType,
    headline: entry.heading,
    description: entry.description,
    mainEntityOfPage: absoluteUrl(entry.path),
    image: [image],
    ...(published
      ? { datePublished: published }
      : {}),
    ...(modified
      ? { dateModified: modified }
      : {}),
    author: item.author_name
      ? {
          '@type': 'Person',
          name: item.author_name,
        }
      : {
          '@id': `${SITE_URL}/#school`,
        },
    publisher: {
      '@id': `${SITE_URL}/#school`,
    },
  };
}


async function dynamicPages() {
  const [groups, articles, news, events] =
    await Promise.all([
      fetchCollection('working-groups'),
      fetchCollection('articles'),
      fetchCollection('news'),
      fetchCollection('events'),
    ]);

  const pages = [];

  groups.forEach((item) => {
    if (!item.slug) {
      return;
    }

    pages.push(
      createDynamicSeo({
        path: `/working-groups/${item.slug}`,
        title: localized(item, 'name'),
        description:
          localized(item, 'summary') ||
          localized(item, 'description'),
        image: contentImage(item),
        sectionTitle: 'کارگروه‌ها',
        sectionPath: '/working-groups',
        type: 'website',
        modifiedTime: dateValue(item),
      })
    );
  });

  const addEditorialPages = (
    items,
    section,
    sectionTitle,
    schemaType
  ) => {
    items.forEach((item) => {
      if (item.id === undefined || item.id === null) {
        return;
      }

      const pathName = `/${section}/${item.id}`;
      const entry = createDynamicSeo({
        path: pathName,
        title: localized(item, 'title'),
        description:
          localized(item, 'summary') ||
          localized(item, 'description') ||
          localized(item, 'body'),
        image: contentImage(item),
        sectionTitle,
        sectionPath: `/${section}`,
        type: 'article',
        publishedTime:
          item.publish_date ||
          item.created_date ||
          item.created_at,
        modifiedTime: dateValue(item),
      });

      entry.schema = articleSchema(
        item,
        entry,
        schemaType
      );
      pages.push(entry);
    });
  };

  addEditorialPages(
    articles,
    'articles',
    'مقالات',
    'Article'
  );
  addEditorialPages(
    news,
    'news',
    'اخبار',
    'NewsArticle'
  );

  events.forEach((item) => {
    if (item.id === undefined || item.id === null) {
      return;
    }

    const entry = createDynamicSeo({
      path: `/events/${item.id}`,
      title: localized(item, 'title'),
      description:
        localized(item, 'description'),
      image: contentImage(item),
      sectionTitle: 'رویدادها',
      sectionPath: '/events',
      type: 'article',
      publishedTime:
        item.created_at || item.created_date,
      modifiedTime: dateValue(item),
    });

    entry.schema = {
      '@type': 'Event',
      name: entry.heading,
      description: entry.description,
      url: absoluteUrl(entry.path),
      image: [absoluteUrl(entry.image)],
      ...(item.event_date
        ? { startDate: item.event_date }
        : {}),
      ...(localized(item, 'venue')
        ? {
            location: {
              '@type': 'Place',
              name: localized(item, 'venue'),
              address:
                'سعادت‌آباد، تهران، ایران',
            },
          }
        : {}),
      organizer: {
        '@id': `${SITE_URL}/#school`,
      },
    };
    pages.push(entry);
  });

  return pages;
}


async function writeRoute(template, entry) {
  const html = renderHtml(template, entry);

  if (entry.path === '/') {
    await writeFile(INDEX_PATH, html);
    return;
  }

  const routeFile = path.join(
    DIST_DIR,
    `${entry.path.slice(1)}.html`
  );
  await mkdir(
    path.dirname(routeFile),
    { recursive: true }
  );
  await writeFile(
    routeFile,
    html
  );
}


async function writeSitemap(entries) {
  const unique = new Map(
    entries.map((entry) => [
      entry.path,
      entry,
    ])
  );
  const urls = [...unique.values()]
    .filter((entry) => (
      !String(entry.robots).includes('noindex')
    ))
    .map((entry) => {
      const lastmod = entry.modifiedTime
        ? `<lastmod>${escapeXml(
            String(entry.modifiedTime).slice(0, 10)
          )}</lastmod>`
        : '';

      return (
        '  <url>\n' +
        `    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>\n` +
        `    ${lastmod}\n` +
        `    <changefreq>${entry.changefreq || 'monthly'}</changefreq>\n` +
        `    <priority>${entry.priority ?? 0.6}</priority>\n` +
        '  </url>'
      );
    })
    .join('\n');
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${urls}\n` +
    '</urlset>\n';

  await writeFile(
    path.join(DIST_DIR, 'sitemap.xml'),
    xml
  );
}


async function main() {
  const template = await readFile(
    INDEX_PATH,
    'utf8'
  );
  const dynamic = await dynamicPages();
  const entries = [
    ...STATIC_SEO_PAGES,
    ...dynamic,
  ];

  await Promise.all(
    entries.map((entry) =>
      writeRoute(template, entry)
    )
  );

  const notFound = createNoIndexSeo('/404');
  notFound.title = `صفحه پیدا نشد | ${SITE_NAME}`;
  notFound.heading = 'صفحه پیدا نشد';
  notFound.description =
    'صفحه درخواستی در وب‌سایت مجتمع آموزشی معصومه عظیمیان پیدا نشد.';
  notFound.body = notFound.description;
  await writeFile(
    path.join(DIST_DIR, '404.html'),
    renderHtml(template, notFound)
  );

  await writeSitemap(entries);

  console.log(
    `[seo] generated ${entries.length} indexable HTML pages and sitemap.xml`
  );
}


main().catch((error) => {
  console.error('[seo] generation failed', error);
  process.exitCode = 1;
});
