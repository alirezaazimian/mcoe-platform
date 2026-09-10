import {
  Camera,
  ChevronDown,
  Loader2,
  LogOut,
  Trash2,
} from 'lucide-react';
import {
  useRef,
  useState,
} from 'react';

import { useAuth } from '@/lib/AuthContext';
import { useDashboardLanguage } from '@/lib/DashboardLanguageContext';


const MAX_AVATAR_BYTES =
  5 * 1024 * 1024;


export default function DashboardProfileMenu({
  compact = false,
}) {
  const { t, lang } =
    useDashboardLanguage();

  const {
    user,
    logout,
    updateAvatar,
    removeAvatar,
  } = useAuth();

  const inputRef = useRef(null);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState('');

  const userLabel =
    user?.full_name ||
    [
      user?.first_name,
      user?.last_name,
    ]
      .filter(Boolean)
      .join(' ') ||
    user?.name ||
    user?.email ||
    'Admin';

  const uploadLabel =
    lang === 'fa'
      ? 'انتخاب عکس پروفایل'
      : 'Choose profile photo';

  const removeLabel =
    lang === 'fa'
      ? 'حذف عکس پروفایل'
      : 'Remove profile photo';

  const genericError =
    lang === 'fa'
      ? 'ذخیره عکس پروفایل انجام نشد.'
      : 'The profile photo could not be saved.';

  const handleFile = async (
    event
  ) => {
    const file =
      event.target.files?.[0];

    event.target.value = '';

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        'image/'
      )
    ) {
      setError(
        lang === 'fa'
          ? 'فقط فایل تصویری قابل استفاده است.'
          : 'Please choose an image file.'
      );

      return;
    }

    if (
      file.size >
      MAX_AVATAR_BYTES
    ) {
      setError(
        lang === 'fa'
          ? 'حجم تصویر باید کمتر از ۵ مگابایت باشد.'
          : 'The image must be smaller than 5 MB.'
      );

      return;
    }

    setError('');
    setIsSaving(true);

    try {
      await updateAvatar(file);
    } catch (uploadError) {
      setError(
        uploadError?.message ||
        genericError
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async () => {
    setError('');
    setIsSaving(true);

    try {
      await removeAvatar();
    } catch (removeError) {
      setError(
        removeError?.message ||
        genericError
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mcoe-admin-profile-control">
      <button
        type="button"
        onClick={() =>
          setMenuOpen(
            (value) => !value
          )
        }
        className={`mcoe-admin-user-trigger${compact ? ' is-compact' : ''}`}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
      >
        <span className="mcoe-admin-user-avatar">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt=""
            />
          ) : (
            <span>
              {userLabel
                ?.[0]
                ?.toUpperCase()}
            </span>
          )}
        </span>

        {!compact && (
          <span className="mcoe-admin-user-label">
            {userLabel}
          </span>
        )}

        <ChevronDown
          className="mcoe-admin-user-chevron"
          aria-hidden="true"
        />
      </button>

      {menuOpen && (
        <>
          <button
            type="button"
            data-mcoe-liquid="off"
            className="mcoe-admin-menu-dismiss"
            aria-label={
              lang === 'fa'
                ? 'بستن منو'
                : 'Close menu'
            }
            onClick={() =>
              setMenuOpen(false)
            }
          />

          <div
            className="mcoe-admin-user-menu"
            role="menu"
          >
            <div className="mcoe-admin-profile-summary">
              <span className="mcoe-admin-profile-menu-avatar">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt=""
                  />
                ) : (
                  userLabel
                    ?.[0]
                    ?.toUpperCase()
                )}
              </span>

              <span>
                <strong>
                  {userLabel}
                </strong>

                {user?.email && (
                  <small>
                    {user.email}
                  </small>
                )}
              </span>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              hidden
              onChange={handleFile}
            />

            <button
              type="button"
              className="mcoe-admin-profile-action"
              role="menuitem"
              disabled={isSaving}
              onClick={() =>
                inputRef.current?.click()
              }
            >
              {isSaving ? (
                <Loader2 className="mcoe-admin-action-spinner" />
              ) : (
                <Camera />
              )}

              {uploadLabel}
            </button>

            {user?.avatar_url && (
              <button
                type="button"
                className="mcoe-admin-profile-action"
                role="menuitem"
                disabled={isSaving}
                onClick={handleRemove}
              >
                <Trash2 />
                {removeLabel}
              </button>
            )}

            {error && (
              <p
                className="mcoe-admin-profile-error"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="button"
              className="mcoe-admin-profile-action mcoe-admin-logout-button"
              role="menuitem"
              onClick={() =>
                logout(true)
              }
            >
              <LogOut />
              {t('logout')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
