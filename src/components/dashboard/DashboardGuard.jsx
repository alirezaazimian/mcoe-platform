import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  LogOut,
} from 'lucide-react';

import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';

function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ebe7e2',
      }}
    >
      <div className="mcoe-admin-loader" />
    </div>
  );
}

function AccessDenied() {
  const navigate = useNavigate();

  const {
    logout,
    user,
  } = useAuth();

  const {
    isRTL,
  } = useLanguage();

  const BackIcon = isRTL
    ? ArrowRight
    : ArrowLeft;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: '#ebe7e2',
        fontFamily:
          isRTL
            ? "'Vazirmatn', system-ui, sans-serif"
            : "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: 'min(460px, 100%)',
          padding: 32,
          borderRadius: 22,
          background: '#eeeae6',
          boxShadow: `
            -9px -9px 20px rgba(255, 250, 244, 0.82),
            9px 9px 22px rgba(160, 143, 126, 0.27)
          `,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            margin: '0 auto 22px',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ebe7e2',
            boxShadow: `
              inset -4px -4px 8px rgba(255, 250, 244, 0.72),
              inset 4px 4px 8px rgba(160, 143, 126, 0.24)
            `,
          }}
        >
          <LockKeyhole
            size={30}
            strokeWidth={1.5}
            color="#001858"
          />
        </div>

        <div
          style={{
            marginBottom: 7,
            color: '#817a75',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          403 · MCOE ADMIN
        </div>

        <h1
          style={{
            margin: 0,
            color: '#2e2a26',
            fontSize: 24,
            fontWeight: 650,
          }}
        >
          {isRTL
            ? 'دسترسی مدیریت ندارید'
            : 'Administrator access required'}
        </h1>

        <p
          style={{
            margin: '12px auto 0',
            maxWidth: 360,
            color: '#6e6e6e',
            fontSize: 13,
            lineHeight: 1.8,
          }}
        >
          {isRTL
            ? 'حساب شما وارد سیستم شده است، اما اجازه ورود به پنل مدیریت MCOE را ندارد.'
            : 'Your account is authenticated, but it does not have permission to access the MCOE administration panel.'}
        </p>

        {user?.email && (
          <div
            style={{
              marginTop: 18,
              padding: '11px 14px',
              borderRadius: 11,
              background: '#ebe7e2',
              boxShadow: `
                inset -3px -3px 6px rgba(255, 250, 244, 0.68),
                inset 3px 3px 6px rgba(160, 143, 126, 0.24)
              `,
              color: '#77716c',
              fontSize: 11,
              overflowWrap: 'anywhere',
            }}
          >
            {user.email}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: 10,
            marginTop: 24,
          }}
        >
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              flex: 1,
              minHeight: 42,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              border: 0,
              borderRadius: 12,
              cursor: 'pointer',
              background: '#eeeae6',
              color: '#4f4945',
              boxShadow: `
                -5px -5px 10px rgba(255, 250, 244, 0.78),
                5px 5px 12px rgba(160, 143, 126, 0.27)
              `,
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <BackIcon
              size={15}
              strokeWidth={1.6}
            />

            {isRTL
              ? 'بازگشت به سایت'
              : 'Back to website'}
          </button>

          <button
            type="button"
            onClick={() => logout(true)}
            style={{
              flex: 1,
              minHeight: 42,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              border: 0,
              borderRadius: 12,
              cursor: 'pointer',
              background: '#001858',
              color: '#fff',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <LogOut
              size={15}
              strokeWidth={1.6}
            />

            {isRTL
              ? 'خروج از حساب'
              : 'Log out'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardGuard() {
  const location = useLocation();

  const {
    user,
    isAuthenticated,
    isLoadingAuth,
    authChecked,
  } = useAuth();

  if (
    isLoadingAuth ||
    !authChecked
  ) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    const returnTo =
      location.pathname +
      location.search;

    return (
      <Navigate
        replace
        to={`/login?returnTo=${encodeURIComponent(returnTo)}`}
      />
    );
  }

  const isAdmin =
    user?.is_staff === true ||
    user?.role === 'admin';

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return <Outlet />;
}
