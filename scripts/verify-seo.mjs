import {
  readdir,
  readFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const SCRIPT_DIR = path.dirname(
  fileURLToPath(import.meta.url)
);
const DIST_DIR = path.resolve(
  SCRIPT_DIR,
  '..',
  'dist'
);


async function collectSeoFiles(directory) {
  const entries = await readdir(
    directory,
    { withFileTypes: true }
  );
  const files = [];

  for (const entry of entries) {
    const itemPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      files.push(
        ...await collectSeoFiles(itemPath)
      );
    } else if (
      entry.name.endsWith('.html') &&
      entry.name !== '404.html'
    ) {
      files.push(itemPath);
    }
  }

  return files;
}


function matchContent(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || '';
}


function fail(message) {
  throw new Error(`[seo:verify] ${message}`);
}


async function main() {
  const files = await collectSeoFiles(DIST_DIR);
  const canonicals = new Set();

  if (files.length < 15) {
    fail(`only ${files.length} route snapshots were generated`);
  }

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const relative = path.relative(DIST_DIR, file);
    const title = matchContent(
      html,
      /<title>([\s\S]*?)<\/title>/i
    );
    const description = matchContent(
      html,
      /<meta\s+name="description"\s+content="([^"]*)"/i
    );
    const canonical = matchContent(
      html,
      /<link\s+rel="canonical"\s+href="([^"]*)"/i
    );
    const robots = matchContent(
      html,
      /<meta\s+name="robots"\s+content="([^"]*)"/i
    );
    const jsonLd = matchContent(
      html,
      /<script\s+id="mcoe-structured-data"[^>]*>([\s\S]*?)<\/script>/i
    );

    if (!title) {
      fail(`${relative} has no title`);
    }

    if (description.length < 50) {
      fail(`${relative} has a short description`);
    }

    if (!canonical.startsWith('https://mcoe.ir/')) {
      fail(`${relative} has an invalid canonical`);
    }

    if (!robots.includes('index')) {
      fail(`${relative} is unexpectedly noindex`);
    }

    if (!html.includes('data-mcoe-seo-snapshot="true"')) {
      fail(`${relative} has no crawlable body snapshot`);
    }

    if (canonicals.has(canonical)) {
      fail(`duplicate canonical: ${canonical}`);
    }
    canonicals.add(canonical);

    try {
      JSON.parse(jsonLd);
    } catch {
      fail(`${relative} contains invalid JSON-LD`);
    }
  }

  const robots = await readFile(
    path.join(DIST_DIR, 'robots.txt'),
    'utf8'
  );
  const sitemap = await readFile(
    path.join(DIST_DIR, 'sitemap.xml'),
    'utf8'
  );
  const notFound = await readFile(
    path.join(DIST_DIR, '404.html'),
    'utf8'
  );

  if (!robots.includes('Sitemap: https://mcoe.ir/sitemap.xml')) {
    fail('robots.txt does not advertise the sitemap');
  }

  if (
    !sitemap.startsWith('<?xml') ||
    sitemap.includes('<!doctype html>')
  ) {
    fail('sitemap.xml is not XML');
  }

  for (const canonical of canonicals) {
    if (!sitemap.includes(`<loc>${canonical}</loc>`)) {
      fail(`sitemap is missing ${canonical}`);
    }
  }

  if (!notFound.includes('noindex,nofollow')) {
    fail('404.html is not marked noindex');
  }

  console.log(
    `[seo:verify] ${files.length} HTML routes, ` +
    `${canonicals.size} unique canonicals, robots, sitemap and JSON-LD: OK`
  );
}


main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
