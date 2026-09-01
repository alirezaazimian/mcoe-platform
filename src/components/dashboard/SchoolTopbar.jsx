import {
  ChevronDown,
  LogOut,
} from 'lucide-react';
import {
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { DASHBOARD_NAV_ITEMS } from './nav';

import { useAuth } from '@/lib/AuthContext';
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
  const { user, logout } =
    useAuth();

  const [now, setNow] = useState(
    new Date()
  );

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

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

  const timeStr =
    lang === 'fa'
      ? toFaDigits(
          `${hh}:${mm}:${ss}`
        )
      : `${hh}:${mm}:${ss}`;

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

  const userLabel =
    user?.full_name ||
    user?.name ||
    user?.email ||
    'Admin';

  return (
    <header
      className="neu-raised"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent:
          'space-between',
        gap: 14,
        padding: '14px 18px',
        marginBottom: 18,
      }}
    >
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#2e2a26',
          margin: 0,
        }}
      >
        {pageTitle}
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 2,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#3a3a3a',
            }}
          >
            {timeStr}
          </span>

          <span
            style={{
              fontSize: 11,
              color: '#6e6e6e',
            }}
          >
            {weekday} · {dateStr}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 0,
            background: '#ebe7e2',
            boxShadow:
              'var(--shadow-in-sm)',
            borderRadius: 10,
            padding: 3,
          }}
        >
          {['fa', 'en'].map(
            (value) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setLang(value)
                }
                style={{
                  border: 'none',
                  cursor:
                    'pointer',
                  padding:
                    '6px 12px',
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily:
                    'inherit',
                  background:
                    lang === value
                      ? '#3a3a3a'
                      : 'transparent',
                  color:
                    lang === value
                      ? '#fff'
                      : '#6e6e6e',
                  transition:
                    'all 0.15s ease',
                }}
              >
                {value === 'fa'
                  ? 'فارسی'
                  : 'EN'}
              </button>
            )
          )}
        </div>

        <div
          style={{
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (value) => !value
              )
            }
            className="btn-neu"
            style={{
              display: 'flex',
              alignItems:
                'center',
              gap: 8,
              padding:
                '7px 12px',
              border: 'none',
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius:
                  '50%',
                background:
                  '#FFCBDE',
                display: 'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#5a5350',
                }}
              >
                {userLabel?.[0]?.toUpperCase()}
              </span>
            </div>

            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#6e6e6e',
                maxWidth: 100,
                overflow:
                  'hidden',
                textOverflow:
                  'ellipsis',
                whiteSpace:
                  'nowrap',
              }}
            >
              {userLabel}
            </span>

            <ChevronDown
              style={{
                width: 13,
                height: 13,
                color: '#9a9a9a',
              }}
            />
          </button>

          {menuOpen && (
            <>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() =>
                  setMenuOpen(false)
                }
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 49,
                  border: 0,
                  background:
                    'transparent',
                }}
              />

              <div
                className="neu-raised"
                style={{
                  position:
                    'absolute',
                  top:
                    'calc(100% + 8px)',
                  insetInlineEnd: 0,
                  zIndex: 50,
                  padding: 6,
                  minWidth: 150,
                  borderRadius: 12,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    logout(true)
                  }
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: 10,
                    padding:
                      '10px 12px',
                    border: 'none',
                    background:
                      'transparent',
                    cursor:
                      'pointer',
                    fontSize: 13,
                    color:
                      '#BD3228',
                    fontWeight: 600,
                    borderRadius: 8,
                    fontFamily:
                      'inherit',
                  }}
                >
                  <LogOut
                    style={{
                      width: 14,
                      height: 14,
                    }}
                  />

                  {t('logout')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
