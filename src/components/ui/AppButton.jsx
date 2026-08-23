import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @typedef {Object} AppButtonProps
 * @property {React.ReactNode} children
 * @property {'primary'|'secondary'|'accent'|'outline'|'ghost'} [variant]
 * @property {'sm'|'md'|'lg'} [size]
 * @property {string} [to]
 * @property {string} [href]
 * @property {string} [className]
 * @property {boolean} [icon]
 */

/**
 * Main MCOE action button.
 *
 * Supports:
 * - internal React Router links
 * - external links
 * - regular button behavior
 * - RTL/LTR directional icon
 *
 * @param {AppButtonProps & Record<string, any>} props
 */
export default function AppButton({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  icon = true,
  ...props
}) {
  const { isRTL } = useLanguage();

  const base =
    'neumorphic-btn inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-lg whitespace-nowrap';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variants = {
    primary: 'bg-primary/10 text-primary hover:bg-primary/15',
    secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/15',
    accent: 'bg-accent/20 text-amber-800 hover:bg-accent/25',
    outline: 'border-0 text-foreground hover:bg-primary/5',
    ghost: 'text-foreground hover:bg-primary/5',
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const content = (
    <>
      {children}

      {icon && variant !== 'ghost' && (
        <ArrowIcon
          className="
            w-4 h-4
            transition-transform
            group-hover:translate-x-0.5
            rtl:group-hover:-translate-x-0.5
          "
        />
      )}
    </>
  );

  const classes = cn(
    base,
    sizes[size],
    variants[variant],
    className
  );

  if (to) {
    return (
      <Link
        to={to}
        className={cn('group', classes)}
        {...props}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={cn('group', classes)}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn('group', classes)}
      {...props}
    >
      {content}
    </button>
  );
}