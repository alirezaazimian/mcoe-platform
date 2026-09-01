import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/lib/AuthContext';

export default function DashboardGuard() {
  const location = useLocation();
  const {
    isAuthenticated,
    isLoadingAuth,
    authChecked,
  } = useAuth();

  if (isLoadingAuth || !authChecked) {
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

  return <Outlet />;
}
