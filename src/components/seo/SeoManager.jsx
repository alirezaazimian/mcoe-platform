import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  absoluteUrl,
  createNoIndexSeo,
  createStructuredData,
  getStaticSeo,
  isDynamicPublicPath,
  isPrivateOrUtilityPath,
} from '@/seo/siteMetadata';


function upsertMeta(attribute, key, value) {
  if (!value) {
    return;
  }

  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', value);
}


function upsertCanonical(href) {
  let element = document.head.querySelector(
    'link[rel="canonical"]'
  );

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}


function removeMeta(attribute, key) {
  document.head.querySelector(
    `meta[${attribute}="${key}"]`
  )?.remove();
}


export function applySeoMetadata(entry) {
  if (!entry || typeof document === 'undefined') {
    return;
  }

  const canonical = absoluteUrl(entry.path);
  const image = absoluteUrl(entry.image);
  const robots = entry.robots || 'index,follow';

  document.title = entry.title;
  upsertMeta('name', 'description', entry.description);
  upsertMeta('name', 'robots', robots);
  upsertMeta('name', 'googlebot', robots);

  upsertMeta('property', 'og:locale', 'fa_IR');
  upsertMeta(
    'property',
    'og:site_name',
    'مجتمع آموزشی معصومه عظیمیان'
  );
  upsertMeta('property', 'og:title', entry.title);
  upsertMeta(
    'property',
    'og:description',
    entry.description
  );
  upsertMeta('property', 'og:type', entry.type || 'website');
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:image', image);
  upsertMeta(
    'property',
    'og:image:alt',
    entry.heading || entry.title
  );

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', entry.title);
  upsertMeta(
    'name',
    'twitter:description',
    entry.description
  );
  upsertMeta('name', 'twitter:image', image);

  if (entry.publishedTime) {
    upsertMeta(
      'property',
      'article:published_time',
      entry.publishedTime
    );
  } else {
    removeMeta(
      'property',
      'article:published_time'
    );
  }

  if (entry.modifiedTime) {
    upsertMeta(
      'property',
      'article:modified_time',
      entry.modifiedTime
    );
  } else {
    removeMeta(
      'property',
      'article:modified_time'
    );
  }

  upsertCanonical(canonical);

  let script = /** @type {HTMLScriptElement | null} */ (
    document.getElementById(
      'mcoe-structured-data'
    )
  );

  if (!script) {
    script = document.createElement('script');
    script.id = 'mcoe-structured-data';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(
    createStructuredData(entry)
  );
}


export function PageSeo({ entry }) {
  useEffect(() => {
    applySeoMetadata(entry);
  }, [entry]);

  return null;
}


export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const staticEntry = getStaticSeo(pathname);

    if (staticEntry) {
      applySeoMetadata(staticEntry);
      return;
    }

    if (
      isPrivateOrUtilityPath(pathname) ||
      !isDynamicPublicPath(pathname)
    ) {
      applySeoMetadata(
        createNoIndexSeo(pathname)
      );
    }
  }, [pathname]);

  return null;
}
