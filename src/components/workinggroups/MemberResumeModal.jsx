import {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import {
  BriefcaseBusiness,
  GraduationCap,
  Linkedin,
  Mail,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';

import { Image } from '@/components/ui/image';
import { useLanguage } from '@/lib/LanguageContext';


function ResumeBlock({
  icon: Icon,
  title,
  children,
}) {
  if (!children) return null;

  return (
    <section className="wg-resume-block">
      <div className="wg-resume-block-title">
        <Icon aria-hidden="true" />
        <h3>{title}</h3>
      </div>
      <div className="wg-resume-copy">
        {children}
      </div>
    </section>
  );
}


export default function MemberResumeModal({
  member,
  onClose,
}) {
  const {
    language,
    isRTL,
  } = useLanguage();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!member) return undefined;

    const previousFocus =
      document.activeElement;
    const previousOverflow =
      document.body.style.overflow;
    document.body.style.overflow =
      'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener(
      'keydown',
      onKeyDown
    );

    return () => {
      document.removeEventListener(
        'keydown',
        onKeyDown
      );
      document.body.style.overflow =
        previousOverflow;
      previousFocus?.focus?.();
    };
  }, [member, onClose]);

  const content = useMemo(() => {
    if (!member) return null;

    const locale = language === 'en'
      ? 'en'
      : 'fa';
    const localized = (field) =>
      member[`${field}_${locale}`] ||
      member[`${field}_fa`] ||
      member[`${field}_en`] ||
      '';

    return {
      name: localized('name'),
      role: localized('role'),
      summary: localized('summary'),
      bio: localized('bio'),
      education: localized('education'),
      experience: localized('experience'),
      expertise: localized('expertise'),
    };
  }, [language, member]);

  if (!member || !content) return null;

  return createPortal(
    <div
      className="wg-resume-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="wg-resume-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wg-resume-name"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="wg-resume-close"
          onClick={onClose}
          aria-label={isRTL ? 'بستن' : 'Close'}
        >
          <X aria-hidden="true" />
        </button>

        <aside className="wg-resume-profile">
          <div className="wg-resume-photo">
            {member.photo_url ? (
              <Image
                src={member.photo_url}
                alt={content.name}
                className="h-full w-full object-contain"
                fittingType="fit"
              />
            ) : (
              <div className="wg-member-fallback">
                <UserRound aria-hidden="true" />
              </div>
            )}
          </div>

          <span className="wg-resume-label">
            {isRTL
              ? 'پروفایل حرفه‌ای'
              : 'Professional Profile'}
          </span>
          <h2 id="wg-resume-name">
            {content.name}
          </h2>
          {content.role && (
            <p className="wg-resume-role">
              {content.role}
            </p>
          )}
          {content.summary && (
            <p className="wg-resume-summary">
              {content.summary}
            </p>
          )}

          <div className="wg-resume-actions">
            {member.linkedin_url && (
              <a
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin aria-hidden="true" />
                LinkedIn
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`}>
                <Mail aria-hidden="true" />
                {member.email}
              </a>
            )}
          </div>
        </aside>

        <div className="wg-resume-details">
          <ResumeBlock
            icon={UserRound}
            title={isRTL ? 'درباره' : 'About'}
          >
            {content.bio || content.summary}
          </ResumeBlock>
          <ResumeBlock
            icon={Sparkles}
            title={isRTL ? 'حوزه‌های تخصص' : 'Expertise'}
          >
            {content.expertise}
          </ResumeBlock>
          <ResumeBlock
            icon={GraduationCap}
            title={isRTL ? 'تحصیلات' : 'Education'}
          >
            {content.education}
          </ResumeBlock>
          <ResumeBlock
            icon={BriefcaseBusiness}
            title={isRTL ? 'سوابق حرفه‌ای' : 'Professional Experience'}
          >
            {content.experience}
          </ResumeBlock>

          {!content.bio &&
            !content.summary &&
            !content.expertise &&
            !content.education &&
            !content.experience && (
              <div className="wg-resume-empty">
                {isRTL
                  ? 'جزئیات رزومه این عضو از پنل مدیریت قابل تکمیل است.'
                  : 'This member’s resume details can be completed from the administration panel.'}
              </div>
            )}
        </div>
      </div>
    </div>,
    document.body
  );
}
