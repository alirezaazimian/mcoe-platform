import { ChevronLeft } from 'lucide-react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import DashboardProfileMenu from './DashboardProfileMenu';
import DashboardThemeToggle from './DashboardThemeToggle';
import SchoolMobileNav from './SchoolMobileNav';
import SchoolSidebar from './SchoolSidebar';
import SchoolTopbar from './SchoolTopbar';
import { DASHBOARD_NAV_ITEMS } from './nav';

import McoeLogo from '@/components/ui/McoeLogo';
import {
  DashboardLanguageProvider,
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';
import {
  DashboardThemeProvider,
  useDashboardTheme,
} from '@/lib/DashboardThemeContext';

import '@/styles/dashboard-school.css';


function DashboardShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    t,
    dir,
    lang,
  } = useDashboardLanguage();

  const { theme } =
    useDashboardTheme();

  const institutionName =
    lang === 'fa'
      ? 'مجتمع آموزشی معصومه عظیمیان'
      : 'Masoumeh Azimian Educational Complex';

  const institutionCaption =
    lang === 'fa'
      ? 'آموزش . رشد . آینده'
      : 'Education · Growth · Future';

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
      className={`mcoe-admin-shell is-${theme}`}
      data-dashboard-theme={theme}
      dir={dir}
    >
      <div className="hidden md:flex mcoe-admin-desktop-shell">
        <SchoolSidebar />

        <main className="mcoe-admin-main">
          <SchoolTopbar />

          <div className="mcoe-admin-route-stage">
            <Outlet />
          </div>
        </main>
      </div>

      <div className="flex md:hidden flex-col mcoe-admin-mobile-shell">
        <header className="mcoe-admin-mobile-topbar">
          <div className="mcoe-admin-mobile-brand">
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

            <span className="mcoe-admin-mobile-brand-copy">
              <strong>
                {institutionName}
              </strong>

              <small>
                {institutionCaption}
              </small>
            </span>
          </div>

          <div className="mcoe-admin-mobile-actions">
            <DashboardThemeToggle compact />
            <DashboardProfileMenu compact />

            {location.pathname !==
              '/dashboard' && (
              <button
                type="button"
                className="mcoe-admin-mobile-back"
                onClick={() =>
                  navigate(-1)
                }
                aria-label={pageTitle}
                title={pageTitle}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
            )}
          </div>
        </header>

        <main className="mcoe-admin-main">
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
      <DashboardThemeProvider>
        <DashboardShell />
      </DashboardThemeProvider>
    </DashboardLanguageProvider>
  );
}
