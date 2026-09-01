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
              style={({
                isActive,
              }) => ({
                display: 'flex',
                flexDirection:
                  'column',
                alignItems:
                  'center',
                gap: 3,
                padding:
                  '6px 4px',
                borderRadius: 10,
                textDecoration:
                  'none',
                color:
                  isActive
                    ? '#2e2a26'
                    : '#9a9a9a',
                flex: '0 0 72px',
                minWidth: 0,
                background:
                  isActive
                    ? '#ebe7e2'
                    : 'transparent',
                boxShadow:
                  isActive
                    ? 'var(--shadow-in-sm)'
                    : 'none',
              })}
            >
              <Icon
                style={{
                  width: 18,
                  height: 18,
                }}
              />

              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  whiteSpace:
                    'nowrap',
                  overflow:
                    'hidden',
                  textOverflow:
                    'ellipsis',
                  maxWidth:
                    '100%',
                }}
              >
                {t(item.key)}
              </span>
            </NavLink>
          );
        }
      )}
    </nav>
  );
}
