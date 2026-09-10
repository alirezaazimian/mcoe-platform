import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';


const STORAGE_KEY =
  'mcoe-dashboard-theme';

const DashboardThemeContext =
  createContext(null);


function getInitialTheme() {
  if (
    typeof window ===
    'undefined'
  ) {
    return 'dark';
  }

  const saved =
    window.localStorage.getItem(
      STORAGE_KEY
    );

  return saved === 'light'
    ? 'light'
    : 'dark';
}


export function DashboardThemeProvider({
  children,
}) {
  const [theme, setTheme] =
    useState(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      theme
    );
  }, [theme]);

  const toggleTheme = useCallback(
    () => {
      setTheme((current) =>
        current === 'dark'
          ? 'light'
          : 'dark'
      );
    },
    []
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === 'dark',
    }),
    [theme, toggleTheme]
  );

  return (
    <DashboardThemeContext.Provider
      value={value}
    >
      {children}
    </DashboardThemeContext.Provider>
  );
}


export function useDashboardTheme() {
  const context = useContext(
    DashboardThemeContext
  );

  if (!context) {
    throw new Error(
      'useDashboardTheme must be used within DashboardThemeProvider'
    );
  }

  return context;
}
