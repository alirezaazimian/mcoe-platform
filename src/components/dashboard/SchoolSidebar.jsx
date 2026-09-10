import {
  Link,
  NavLink,
} from 'react-router-dom';

import AnalogClock from './AnalogClock';
import { DASHBOARD_NAV_ITEMS } from './nav';

import McoeLogo from '@/components/ui/McoeLogo';
import { useDashboardLanguage } from '@/lib/DashboardLanguageContext';


export default function SchoolSidebar() {
  const { t, lang } =
    useDashboardLanguage();

  const institutionName =
    lang === 'fa'
      ? 'مجتمع آموزشی معصومه عظیمیان'
      : 'Masoumeh Azimian Educational Complex';

  const institutionCaption =
    lang === 'fa'
      ? 'آموزش . رشد . آینده'
      : 'Education · Growth · Future';

  return (
    <aside className="mcoe-admin-sidebar">
      <div className="mcoe-admin-sidebar-header">
        <Link
          to="/"
          className="mcoe-admin-home-link"
          aria-label={institutionName}
          title={institutionName}
        >
          <McoeLogo
            alt={institutionName}
            className="mcoe-admin-dashboard-logo"
          />
        </Link>

        <div className="mcoe-admin-sidebar-copy">
          <strong>
            {institutionName}
          </strong>

          <small>
            {institutionCaption}
          </small>
        </div>
      </div>

      <nav className="mcoe-admin-sidebar-nav">
        {DASHBOARD_NAV_ITEMS.map(
          (item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={
                  item.path ===
                  '/dashboard'
                }
                className={({
                  isActive,
                }) =>
                  `mcoe-admin-sidebar-link${isActive ? ' is-active' : ''}`
                }
              >
                <Icon aria-hidden="true" />

                <span>
                  {t(item.key)}
                </span>
              </NavLink>
            );
          }
        )}
      </nav>

      <AnalogClock />
    </aside>
  );
}
