import React, {
  useEffect,
  useState,
} from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const THEME_STORAGE_KEY =
  'mcoe-public-theme';


function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  try {
    return window.localStorage.getItem(
      THEME_STORAGE_KEY
    ) === 'dark'
      ? 'dark'
      : 'light';
  } catch {
    return 'light';
  }
}


export default function Layout() {
  const [theme, setTheme] = useState(
    getInitialTheme
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        theme
      );
    } catch {
      // Theme still works when storage is unavailable.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === 'dark'
        ? 'light'
        : 'dark'
    );
  };

  return (
    <div
      className={`site-public-shell min-h-screen flex flex-col${
        theme === 'dark'
          ? ' dark'
          : ''
      }`}
      data-theme={theme}
      style={{ colorScheme: theme }}
    >
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="site-public-main flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
