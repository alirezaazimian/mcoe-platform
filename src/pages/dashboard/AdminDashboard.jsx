import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  FileText,
  GraduationCap,
  MessageSquare,
  Newspaper,
  Users,
  Video,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { djangoApi } from '@/api/djangoApi';
import { useAuth } from '@/lib/AuthContext';
import { useDashboardLanguage } from '@/lib/DashboardLanguageContext';
import {
  formatJalali,
  toFaDigits,
} from '@/lib/jalali';

export default function AdminDashboard() {
  const {
    t,
    lang,
    dir,
  } = useDashboardLanguage();

  const { user } = useAuth();

  const Arrow =
    dir === 'rtl'
      ? ArrowLeft
      : ArrowRight;

  const {
    data: workgroups = [],
  } = useQuery({
    queryKey: [
      'dashboard',
      'workgroups',
    ],
    queryFn: () =>
      djangoApi.workingGroups.list(),
  });

  const {
    data: events = [],
  } = useQuery({
    queryKey: [
      'dashboard',
      'events',
    ],
    queryFn: () =>
      djangoApi.events.list(),
  });

  const {
    data: articles = [],
  } = useQuery({
    queryKey: [
      'dashboard',
      'articles',
    ],
    queryFn: () =>
      djangoApi.articles.list(),
  });

  const {
    data: news = [],
  } = useQuery({
    queryKey: [
      'dashboard',
      'news',
    ],
    queryFn: () =>
      djangoApi.news.list(),
  });

  const students = [];
  const classes = [];

  const activeWorkgroups =
    workgroups.filter(
      (item) =>
        item.is_active !== false
    ).length;

  const upcomingEvents =
    events.filter(
      (item) =>
        item.status ===
        'upcoming'
    );

  const publishedArticles =
    articles.filter(
      (item) =>
        item.is_published !==
        false
    ).length;

  const upcomingClasses =
    classes.filter(
      (item) =>
        item.status ===
        'scheduled'
    ).length;

  const recentStudents =
    students.slice(0, 5);

  const nextEvent =
    upcomingEvents
      .filter(
        (item) =>
          item.event_date
      )
      .sort(
        (a, b) =>
          new Date(
            a.event_date
          ).getTime() -
          new Date(
            b.event_date
          ).getTime()
      )[0];

  const stats = [
    {
      key: 'activeWorkgroups',
      value:
        activeWorkgroups,
      icon: Users,
      color: '#C9B3F5',
      to:
        '/dashboard/workgroups',
    },
    {
      key: 'totalStudents',
      value: students.length,
      icon: GraduationCap,
      color: '#2ECC8A',
      to:
        '/dashboard/students',
    },
    {
      key: 'upcomingEvents',
      value:
        upcomingEvents.length,
      icon: CalendarDays,
      color: '#FF8077',
      to:
        '/dashboard/events',
    },
    {
      key: 'publishedArticles',
      value:
        publishedArticles,
      icon: FileText,
      color: '#B8EFF5',
      to:
        '/dashboard/articles',
    },
    {
      key: 'upcomingClasses',
      value:
        upcomingClasses,
      icon: Video,
      color: '#FFCBDE',
      to:
        '/dashboard/online-classes',
    },
  ];

  const quickActions = [
    {
      key: 'workgroups',
      icon: Users,
      to:
        '/dashboard/workgroups',
    },
    {
      key: 'students',
      icon: GraduationCap,
      to:
        '/dashboard/students',
    },
    {
      key: 'smsPanel',
      icon: MessageSquare,
      to: '/dashboard/sms',
    },
    {
      key: 'onlineClasses',
      icon: Video,
      to:
        '/dashboard/online-classes',
    },
    {
      key: 'news',
      icon: Newspaper,
      to: '/dashboard/news',
    },
    {
      key: 'siteContent',
      icon: FileText,
      to:
        '/dashboard/site-content',
    },
  ];

  const userName =
    user?.full_name ||
    user?.name ||
    '';

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding:
          'clamp(12px, 3vw, 24px)',
      }}
    >
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: '#2e2a26',
            margin: '0 0 4px',
          }}
        >
          {t('welcome')}
          {userName
            ? `, ${userName}`
            : ''}
        </h1>

        <p
          style={{
            fontSize: 13,
            color: '#6e6e6e',
            margin: 0,
          }}
        >
          {t('schoolAdminPanel')} ·{' '}
          {formatJalali(
            new Date(),
            'long',
            lang
          )}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 14,
          marginBottom: 20,
        }}
      >
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              to={item.to}
              style={{
                textDecoration:
                  'none',
              }}
            >
              <div
                className="neu-raised"
                style={{
                  padding: 18,
                  display: 'flex',
                  flexDirection:
                    'column',
                  gap: 10,
                  height: '100%',
                  transition:
                    'transform 0.2s ease',
                }}
                onMouseEnter={(
                  event
                ) => {
                  event.currentTarget.style.transform =
                    'translateY(-3px)';
                }}
                onMouseLeave={(
                  event
                ) => {
                  event.currentTarget.style.transform =
                    'none';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'space-between',
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background:
                        item.color,
                      display: 'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                    }}
                  >
                    <Icon
                      style={{
                        width: 18,
                        height: 18,
                        color:
                          '#2e2a26',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color:
                        '#2e2a26',
                      lineHeight: 1,
                    }}
                  >
                    {lang === 'fa'
                      ? toFaDigits(
                          item.value
                        )
                      : item.value}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color:
                        '#6e6e6e',
                      marginTop: 4,
                    }}
                  >
                    {t(item.key)}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div
        className="mcoe-admin-dashboard-grid"
      >
        <div
          className="neu-raised"
          style={{
            padding: 20,
            display: 'flex',
            flexDirection:
              'column',
            gap: 14,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems:
                'center',
              justifyContent:
                'space-between',
            }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#3a3a3a',
                margin: 0,
              }}
            >
              {t(
                'recentRegistrations'
              )}
            </h3>

            <Link
              to="/dashboard/students"
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#6e6e6e',
                textDecoration:
                  'none',
                display: 'flex',
                alignItems:
                  'center',
                gap: 4,
              }}
            >
              {t('manage')}

              <Arrow
                style={{
                  width: 13,
                  height: 13,
                }}
              />
            </Link>
          </div>

          {recentStudents.length ===
          0 ? (
            <div
              className="neu-inset-sm"
              style={{
                padding: 16,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color:
                    '#9a9a9a',
                  margin: 0,
                }}
              >
                {t('noRecords')}
              </p>

              <p
                style={{
                  margin:
                    '6px 0 0',
                  fontSize: 10,
                  color:
                    '#aaa39d',
                }}
              >
                {t('modulePending')}
              </p>
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            minWidth: 0,
          }}
        >
          <div
            className="neu-raised"
            style={{
              padding: 20,
              display: 'flex',
              flexDirection:
                'column',
              gap: 10,
            }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#3a3a3a',
                margin: 0,
              }}
            >
              {t('nextEvent')}
            </h3>

            {nextEvent ? (
              <div>
                <div
                  className="neu-inset-sm"
                  style={{
                    display:
                      'inline-flex',
                    flexDirection:
                      'column',
                    alignItems:
                      'center',
                    padding:
                      '10px 14px',
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 26,
                      fontWeight: 700,
                      color:
                        '#2e2a26',
                      lineHeight: 1,
                    }}
                  >
                    {lang === 'fa'
                      ? toFaDigits(
                          formatJalali(
                            nextEvent.event_date,
                            'short',
                            'fa'
                          ).split(
                            '/'
                          )[2]
                        )
                      : new Date(
                          nextEvent.event_date
                        ).getDate()}
                  </span>

                  <span
                    style={{
                      fontSize: 10,
                      color:
                        '#6e6e6e',
                    }}
                  >
                    {formatJalali(
                      nextEvent.event_date,
                      'long',
                      lang
                    )}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color:
                      '#3a3a3a',
                    margin:
                      '0 0 4px',
                  }}
                >
                  {lang === 'fa'
                    ? nextEvent.title_fa ||
                      nextEvent.title ||
                      nextEvent.title_en
                    : nextEvent.title_en ||
                      nextEvent.title ||
                      nextEvent.title_fa}
                </p>

                <p
                  style={{
                    fontSize: 12,
                    color:
                      '#9a9a9a',
                    margin: 0,
                  }}
                >
                  {lang === 'fa'
                    ? nextEvent.venue_fa ||
                      nextEvent.venue ||
                      nextEvent.location_fa ||
                      nextEvent.location ||
                      '—'
                    : nextEvent.venue_en ||
                      nextEvent.venue ||
                      nextEvent.location ||
                      '—'}
                </p>
              </div>
            ) : (
              <p
                style={{
                  fontSize: 13,
                  color:
                    '#9a9a9a',
                }}
              >
                {t('noRecords')}
              </p>
            )}
          </div>

          <div
            className="neu-raised"
            style={{
              padding: 20,
              display: 'flex',
              flexDirection:
                'column',
              gap: 12,
            }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#3a3a3a',
                margin: 0,
              }}
            >
              {t('quickActions')}
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  '1fr 1fr 1fr',
                gap: 8,
              }}
            >
              {quickActions.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <Link
                      key={
                        item.key
                      }
                      to={item.to}
                      style={{
                        textDecoration:
                          'none',
                      }}
                    >
                      <div
                        className="neu-inset-sm"
                        style={{
                          display:
                            'flex',
                          flexDirection:
                            'column',
                          alignItems:
                            'center',
                          gap: 6,
                          padding:
                            '12px 6px',
                          transition:
                            'background 0.15s ease',
                        }}
                      >
                        <Icon
                          style={{
                            width: 18,
                            height: 18,
                            color:
                              '#3a3a3a',
                          }}
                        />

                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color:
                              '#3a3a3a',
                            textAlign:
                              'center',
                            lineHeight:
                              1.2,
                          }}
                        >
                          {t(
                            item.key
                          )}
                        </span>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>

            <div
              style={{
                marginTop: 2,
                fontSize: 9,
                color: '#aaa39d',
              }}
            >
              {news.length}{' '}
              {t('news')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
