import { useLocation } from 'react-router-dom';

import { DASHBOARD_NAV_ITEMS } from '@/components/dashboard/nav';
import { useDashboardLanguage } from '@/lib/DashboardLanguageContext';

export default function DashboardModulePlaceholder() {
  const location = useLocation();
  const { t } =
    useDashboardLanguage();

  const item =
    DASHBOARD_NAV_ITEMS.find(
      (navItem) =>
        navItem.path ===
        location.pathname
    );

  const Icon = item?.icon;

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
        className="neu-raised"
        style={{
          minHeight: 360,
          padding: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 520,
            textAlign: 'center',
          }}
        >
          {Icon && (
            <div
              className="neu-inset-sm"
              style={{
                width: 58,
                height: 58,
                margin:
                  '0 auto 16px',
                borderRadius: 16,
                display: 'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
              }}
            >
              <Icon
                style={{
                  width: 25,
                  height: 25,
                  color:
                    '#3a3a3a',
                }}
              />
            </div>
          )}

          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 650,
              color: '#2e2a26',
            }}
          >
            {item
              ? t(item.key)
              : t(
                  'schoolAdminPanel'
                )}
          </h1>

          <p
            style={{
              margin:
                '10px auto 0',
              maxWidth: 460,
              color: '#6e6e6e',
              fontSize: 13,
              lineHeight: 1.8,
            }}
          >
            {t('modulePending')}
          </p>
        </div>
      </div>
    </div>
  );
}
