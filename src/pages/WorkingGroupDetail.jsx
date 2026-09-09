import React, {
  useEffect,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  Brain,
  Calculator,
  Cpu,
  Globe,
  Mail,
  Palette,
  PenTool,
  Sparkles,
  Users,
} from 'lucide-react';

import { djangoApi } from '@/api/djangoApi';
import TeamSection from '@/components/workinggroups/TeamSection';
import Reveal from '@/components/ui/Reveal';
import { Image } from '@/components/ui/image';
import { useLanguage } from '@/lib/LanguageContext';
import '@/styles/working-groups-clay.css';


const ICON_MAP = {
  Activity,
  Atom,
  BookOpen,
  Brain,
  Calculator,
  Cpu,
  Globe,
  Palette,
  PenTool,
  Sparkles,
};


const cleanMarkdown = (value = '') =>
  value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();


function MarkdownBlock({ children }) {
  if (!children) return null;

  return (
    <div className="wg-markdown">
      <ReactMarkdown
        components={{
          h1: ({ node: _node, ...props }) => <h2 {...props} />,
          h2: ({ node: _node, ...props }) => <h3 {...props} />,
          h3: ({ node: _node, ...props }) => <h4 {...props} />,
          a: ({ node: _node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}


export default function WorkingGroupDetail() {
  const { slug } = useParams();
  const {
    language,
    isRTL,
    t,
  } = useLanguage();
  const [group, setGroup] =
    useState(null);
  const [loading, setLoading] =
    useState(true);
  const BackArrow = isRTL
    ? ArrowRight
    : ArrowLeft;
  const ForwardArrow = isRTL
    ? ArrowLeft
    : ArrowRight;

  useEffect(() => {
    setLoading(true);

    djangoApi.workingGroups
      .get(slug)
      .then(setGroup)
      .catch((error) => {
        console.error(
          'Failed to load working group:',
          error
        );
        setGroup(null);
      })
      .finally(() =>
        setLoading(false)
      );
  }, [slug]);

  if (loading) {
    return (
      <main className="wg-clay-page">
        <div className="container-institutional py-10 lg:py-16" aria-busy="true">
          <div className="wg-detail-poster animate-pulse">
            <div className="wg-detail-media bg-[#EFE7DA]" />
            <div className="wg-detail-copy space-y-4">
              <div className="h-4 w-28 rounded-full bg-[#EFE7DA]" />
              <div className="h-10 w-4/5 rounded-xl bg-[#EFE7DA]" />
              <div className="h-4 w-full rounded-full bg-[#EFE7DA]" />
              <div className="h-4 w-2/3 rounded-full bg-[#EFE7DA]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!group) {
    return (
      <main className="wg-clay-page">
        <div className="container-institutional py-24 text-center">
          <div className="wg-empty-state">
            <div className="wg-empty-icon">
              <Users aria-hidden="true" />
            </div>
            <h1>{t('page.notFound')}</h1>
            <Link to="/working-groups" className="mcoe-liquid-button wg-back-link mt-5">
              <BackArrow aria-hidden="true" />
              {t('page.backToList')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const locale = language === 'en'
    ? 'en'
    : 'fa';
  const localized = (field) =>
    group[`${field}_${locale}`] ||
    group[`${field}_fa`] ||
    group[`${field}_en`] ||
    '';
  const name = localized('name');
  const description =
    localized('description');
  const summary =
    localized('summary') ||
    cleanMarkdown(description);
  const shortSummary =
    summary.length > 300
      ? `${summary.slice(0, 300).trim()}…`
      : summary;
  const objectives =
    localized('objectives');
  const programs =
    localized('programs');
  const Icon =
    ICON_MAP[group.icon] ||
    Users;

  const contentLinks = [
    description && {
      href: '#overview',
      label: isRTL ? 'معرفی' : 'Overview',
    },
    objectives && {
      href: '#objectives',
      label: isRTL ? 'اهداف' : 'Objectives',
    },
    programs && {
      href: '#programs',
      label: isRTL ? 'برنامه‌ها' : 'Programs',
    },
    {
      href: '#members',
      label: isRTL ? 'اعضا' : 'Members',
    },
  ].filter(Boolean);

  return (
    <main className="wg-clay-page">
      <section className="container-institutional py-7 lg:py-12">
        <Reveal>
          <Link to="/working-groups" className="mcoe-liquid-button wg-back-link mb-5">
            <BackArrow aria-hidden="true" />
            {t('page.backToList')}
          </Link>
        </Reveal>

        <Reveal>
          <article className="wg-detail-poster">
            <div className="wg-detail-media">
              {group.image ? (
                <Image
                  src={group.image}
                  alt={name}
                  className="wg-detail-image"
                  fittingType="fit"
                />
              ) : (
                <div className="wg-detail-fallback">
                  <Icon aria-hidden="true" />
                </div>
              )}
              <span className="wg-detail-number" aria-hidden="true">
                {String(group.sort_order || 1).padStart(2, '0')}
              </span>
            </div>

            <div className="wg-detail-copy">
              <div className="wg-detail-emblem">
                <Icon aria-hidden="true" />
              </div>
              <span className="wg-eyebrow">
                {isRTL
                  ? 'کارگروه تخصصی آموزشی'
                  : 'Specialized Educational Group'}
              </span>
              <h1>{name}</h1>
              {shortSummary && <p>{shortSummary}</p>}
              <a href="#overview" className="mcoe-liquid-button wg-detail-jump-link">
                {isRTL
                  ? 'مطالعه معرفی کارگروه'
                  : 'Read the group overview'}
                <ForwardArrow aria-hidden="true" />
              </a>
            </div>
          </article>
        </Reveal>
      </section>

      <section className="container-institutional pb-16 lg:pb-24">
        <div className="wg-detail-layout">
          <div className="wg-detail-content">
            {description && (
              <Reveal>
                <section id="overview" className="wg-editorial-section scroll-mt-24">
                  <div className="wg-section-heading">
                    <span aria-hidden="true" />
                    <div>
                      <small>
                        {isRTL
                          ? 'شناخت کارگروه'
                          : 'Discover the Group'}
                      </small>
                      <h2>
                        {isRTL
                          ? 'معرفی کارگروه'
                          : 'Group Overview'}
                      </h2>
                    </div>
                  </div>
                  <MarkdownBlock>
                    {description}
                  </MarkdownBlock>
                </section>
              </Reveal>
            )}

            {objectives && (
              <Reveal>
                <section id="objectives" className="wg-editorial-section scroll-mt-24">
                  <div className="wg-section-heading">
                    <span aria-hidden="true" />
                    <div>
                      <small>
                        {isRTL
                          ? 'چشم‌انداز آموزشی'
                          : 'Educational Direction'}
                      </small>
                      <h2>
                        {isRTL
                          ? 'اهداف کارگروه'
                          : 'Group Objectives'}
                      </h2>
                    </div>
                  </div>
                  <MarkdownBlock>
                    {objectives}
                  </MarkdownBlock>
                </section>
              </Reveal>
            )}

            {programs && (
              <Reveal>
                <section id="programs" className="wg-editorial-section scroll-mt-24">
                  <div className="wg-section-heading">
                    <span aria-hidden="true" />
                    <div>
                      <small>
                        {isRTL
                          ? 'یادگیری در عمل'
                          : 'Learning in Practice'}
                      </small>
                      <h2>
                        {isRTL
                          ? 'برنامه‌ها و فعالیت‌ها'
                          : 'Programs & Activities'}
                      </h2>
                    </div>
                  </div>
                  <MarkdownBlock>
                    {programs}
                  </MarkdownBlock>
                </section>
              </Reveal>
            )}
          </div>

          <aside className="wg-detail-sidebar">
            <Reveal delay={0.08}>
              <nav className="wg-page-index" aria-label={isRTL ? 'فهرست صفحه' : 'Page contents'}>
                <span>
                  {isRTL ? 'در این صفحه' : 'On This Page'}
                </span>
                {contentLinks.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                    <ForwardArrow aria-hidden="true" />
                  </a>
                ))}
              </nav>

              <div className="wg-contact-card">
                <Mail aria-hidden="true" />
                <h2>
                  {isRTL
                    ? 'همکاری با کارگروه'
                    : 'Work With This Group'}
                </h2>
                <p>
                  {isRTL
                    ? 'برای مشارکت در برنامه‌ها یا دریافت اطلاعات بیشتر با مجتمع در ارتباط باشید.'
                    : 'Contact the institute to participate in programs or receive more information.'}
                </p>
                <Link to="/collaborate" className="mcoe-liquid-button">
                  {t('hero.collaborate')}
                  <ForwardArrow aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>

        <div id="members" className="wg-clay-team scroll-mt-24">
          <TeamSection groupSlug={group.slug} />
        </div>
      </section>
    </main>
  );
}
