import { NavLink } from 'react-router-dom';

import { DASHBOARD_NAV_ITEMS } from './nav';

import { useDashboardLanguage } from '@/lib/DashboardLanguageContext';


export default function SchoolMobileNav() {
  const { t } =
    useDashboardLanguage();

  return (
    <nav className="mcoe-admin-mobile-nav">
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
                `mcoe-admin-mobile-link${isActive ? ' is-active' : ''}`
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
  );
}
