import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DashboardProfileMenu from './DashboardProfileMenu';
import DashboardThemeToggle from './DashboardThemeToggle';
import { DASHBOARD_NAV_ITEMS } from './nav';

import { useDashboardLanguage } from '@/lib/DashboardLanguageContext';
import {
  formatJalali,
  JALALI_WEEKDAYS_FA,
  toFaDigits,
} from '@/lib/jalali';


export default function SchoolTopbar() {
  const {
    t,
    lang,
    setLang,
  } = useDashboardLanguage();

  const location = useLocation();

  const [now, setNow] = useState(
    new Date()
  );

  useEffect(() => {
    const timer = setInterval(
      () => setNow(new Date()),
      1000
    );

    return () =>
      clearInterval(timer);
  }, []);

  const active =
    DASHBOARD_NAV_ITEMS.find(
      (item) =>
        item.path ===
        '/dashboard'
          ? location.pathname ===
            '/dashboard'
          : location.pathname.startsWith(
              item.path
            )
    );

  const pageTitle = active
    ? t(active.key)
    : '';

  const hh = String(
    now.getHours()
  ).padStart(2, '0');

  const mm = String(
    now.getMinutes()
  ).padStart(2, '0');

  const ss = String(
    now.getSeconds()
  ).padStart(2, '0');

  const rawTime =
    `${hh}:${mm}:${ss}`;

  const timeStr =
    lang === 'fa'
      ? toFaDigits(rawTime)
      : rawTime;

  const dateStr = formatJalali(
    now,
    'long',
    lang
  );

  const weekday =
    lang === 'fa'
      ? JALALI_WEEKDAYS_FA[
          now.getDay()
        ]
      : formatJalali(
          now,
          'weekday',
          lang
        );

  return (
    <header className="mcoe-admin-topbar">
      <h2 className="mcoe-admin-page-title">
        {pageTitle}
      </h2>

      <div className="mcoe-admin-topbar-actions">
        <div className="mcoe-admin-clock-meta">
          <span>{timeStr}</span>
          <small>
            {weekday} · {dateStr}
          </small>
        </div>

        <DashboardThemeToggle />

        <div
          className="mcoe-admin-lang-switch"
          aria-label={
            lang === 'fa'
              ? 'تغییر زبان داشبورد'
              : 'Change dashboard language'
          }
        >
          {['fa', 'en'].map(
            (value) => (
              <button
                key={value}
                className={`mcoe-admin-lang-button${lang === value ? ' is-active' : ''}`}
                type="button"
                onClick={() =>
                  setLang(value)
                }
                aria-pressed={
                  lang === value
                }
              >
                {value === 'fa'
                  ? 'فارسی'
                  : 'EN'}
              </button>
            )
          )}
        </div>

        <DashboardProfileMenu />
      </div>
    </header>
  );
}
