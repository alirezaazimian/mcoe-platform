import {
  Link,
  NavLink,
} from 'react-router-dom';

import AnalogClock from './AnalogClock';
import { DASHBOARD_NAV_ITEMS } from './nav';

import { useDashboardLanguage } from '@/lib/DashboardLanguageContext';
import McoeLogo from '@/components/ui/McoeLogo';

export default function SchoolSidebar() {
  const { t, lang } =
    useDashboardLanguage();

  const institutionName =
    lang === 'fa'
      ? 'مجتمع آموزشی معصومه عظیمیان'
      : 'Masoumeh Azimian Educational Complex';

  return (
    <aside
      className="sidebar-float mcoe-admin-sidebar"
      style={{
        width: 232,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div
        className="mcoe-admin-sidebar-header"
        style={{
          padding: '20px 18px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
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
            className="mcoe-admin-dashboard-logo"
          />
        </Link>

        <div
          className="mcoe-admin-sidebar-copy"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#2e2a26',
              lineHeight: 1.2,
            }}
          >
            {institutionName}
          </span>
        </div>
      </div>

      <nav
        className="mcoe-admin-sidebar-nav"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: '4px 12px 16px',
          flex: 1,
          overflowY: 'auto',
        }}
      >
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
                  alignItems:
                    'center',
                  gap: 12,
                  padding:
                    '11px 14px',
                  borderRadius: 10,
                  textDecoration:
                    'none',
                  fontSize: 13,
                  fontWeight: 500,
                  color: isActive
                    ? '#2e2a26'
                    : '#6e6e6e',
                  background:
                    isActive
                      ? '#ebe7e2'
                      : 'transparent',
                  boxShadow:
                    isActive
                      ? 'var(--shadow-in-sm)'
                      : 'none',
                  transition:
                    'all 0.15s ease',
                })}
              >
                <Icon
                  style={{
                    width: 17,
                    height: 17,
                    flexShrink: 0,
                  }}
                />

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
