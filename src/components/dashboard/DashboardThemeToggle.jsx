import {
  Moon,
  Sun,
} from 'lucide-react';

import { useDashboardLanguage } from '@/lib/DashboardLanguageContext';
import { useDashboardTheme } from '@/lib/DashboardThemeContext';


export default function DashboardThemeToggle({
  compact = false,
}) {
  const { lang } =
    useDashboardLanguage();

  const {
    isDark,
    toggleTheme,
  } = useDashboardTheme();

  const label = isDark
    ? (
        lang === 'fa'
          ? 'فعال‌کردن حالت روز'
          : 'Switch to day mode'
      )
    : (
        lang === 'fa'
          ? 'فعال‌کردن حالت شب'
          : 'Switch to night mode'
      );

  const Icon = isDark
    ? Sun
    : Moon;

  return (
    <button
      type="button"
      className={`mcoe-admin-theme-toggle${compact ? ' is-compact' : ''}`}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}
