import { ChevronLeft } from 'lucide-react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import SchoolMobileNav from './SchoolMobileNav';
import SchoolSidebar from './SchoolSidebar';
import SchoolTopbar from './SchoolTopbar';
import { DASHBOARD_NAV_ITEMS } from './nav';

import {
  DashboardLanguageProvider,
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';
import McoeLogo from '@/components/ui/McoeLogo';

import '@/styles/dashboard-school.css';

function DashboardShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    t,
    dir,
    lang,
  } = useDashboardLanguage();

  const institutionName =
    lang === 'fa'
      ? 'مجتمع آموزشی معصومه عظیمیان'
      : 'Masoumeh Azimian Educational Complex';

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

  return (
    <div
      className="mcoe-admin-shell"
      dir={dir}
    >
      <div
        className="hidden md:flex mcoe-admin-desktop-shell"
        style={{
          height: '100dvh',
          background: '#ebe7e2',
          padding: 20,
          gap: 20,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <SchoolSidebar />

        <main
          className="mcoe-admin-main"
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <SchoolTopbar />

          <div
            style={{
              flex: 1,
              minHeight: 0,
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>

      <div
        className="flex md:hidden flex-col mcoe-admin-mobile-shell"
        style={{
          minHeight: '100dvh',
          background: '#ebe7e2',
          position: 'relative',
        }}
      >
        <header
          className="mcoe-admin-mobile-topbar"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent:
              'space-between',
            padding:
              '12px 16px',
            background: '#eeeae6',
            boxShadow:
              '0 4px 16px rgba(160,143,126,0.18)',
            borderRadius:
              '0 0 18px 18px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
            }}
          >
            <Link
              to="/"
              className="mcoe-admin-home-link"
              aria-label={institutionName}
              title={institutionName}
            >
              <McoeLogo
                alt={institutionName}
                className="mcoe-admin-dashboard-logo mcoe-admin-dashboard-logo-mobile"
              />
            </Link>

            <span
              className="mcoe-admin-mobile-title"
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#2e2a26',
              }}
            >
              {institutionName}
            </span>
          </div>

          {location.pathname !==
            '/dashboard' && (
            <button
              type="button"
              onClick={() =>
                navigate(-1)
              }
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems:
                  'center',
                gap: 4,
                color: '#6e6e6e',
                fontSize: 12,
                fontFamily:
                  'inherit',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft
                style={{
                  width: 16,
                  height: 16,
                }}
              />

              {pageTitle}
            </button>
          )}
        </header>

        <main
          className="mcoe-admin-main"
          style={{
            flex: 1,
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <Outlet />
        </main>

        <SchoolMobileNav />
      </div>
    </div>
  );
}

export default function SchoolLayout() {
  return (
    <DashboardLanguageProvider>
      <DashboardShell />
    </DashboardLanguageProvider>
  );
}
