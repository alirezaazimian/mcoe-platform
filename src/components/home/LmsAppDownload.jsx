import {
  useEffect,
  useId,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  Download,
  ExternalLink,
  Globe2,
  Plus,
  Share2,
  Smartphone,
  X,
} from 'lucide-react';

import { useLanguage } from '@/lib/LanguageContext';
import '@/styles/lms-app-download.css';


const LMS_URL =
  import.meta.env.VITE_LMS_URL ||
  'https://lms.mcoe.ir';

const ANDROID_APK_URL =
  import.meta.env.VITE_LMS_ANDROID_APK_URL ||
  '/downloads/lms/mcoe-lms-android.apk';


export default function LmsAppDownload() {
  const { isRTL } = useLanguage();
  const [guideOpen, setGuideOpen] =
    useState(false);
  const guideTitleId = useId();

  useEffect(() => {
    if (!guideOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setGuideOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener(
      'keydown',
      closeOnEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;
      document.removeEventListener(
        'keydown',
        closeOnEscape
      );
    };
  }, [guideOpen]);

  const copy = isRTL
    ? {
        groupLabel: 'دسترسی به سامانه آموزشی',
        androidTitle: 'دانلود اندروید',
        androidMeta: 'فایل رسمی APK',
        iosTitle: 'نصب در آیفون',
        iosMeta: 'افزودن به صفحه اصلی',
        webTitle: 'نسخه وب',
        webMeta: 'ورود به سامانه',
        guideTitle: 'نصب سامانه روی آیفون و آیپد',
        guideDescription:
          'نسخه iOS از طریق Safari به صفحه اصلی دستگاه اضافه می‌شود و مانند یک اپلیکیشن در دسترس خواهد بود.',
        safariTitle: 'سامانه را در Safari باز کنید',
        safariBody:
          'اگر لینک در مرورگر دیگری باز شد، آن را با Safari باز کنید.',
        shareTitle: 'گزینه Share را بزنید',
        shareBody:
          'آیکن اشتراک‌گذاری را در نوار پایین Safari انتخاب کنید.',
        addTitle: 'Add to Home Screen را انتخاب کنید',
        addBody:
          'در پایان روی Add بزنید تا آیکن سامانه روی صفحه اصلی قرار بگیرد.',
        openLms: 'باز کردن سامانه',
        close: 'بستن راهنمای نصب',
      }
    : {
        groupLabel: 'Learning platform access',
        androidTitle: 'Android app',
        androidMeta: 'Official APK file',
        iosTitle: 'Install on iPhone',
        iosMeta: 'Add to Home Screen',
        webTitle: 'Web version',
        webMeta: 'Open the platform',
        guideTitle: 'Install on iPhone and iPad',
        guideDescription:
          'Add the LMS to your Home Screen from Safari for app-like access.',
        safariTitle: 'Open the LMS in Safari',
        safariBody:
          'If the link opens in another browser, open it again using Safari.',
        shareTitle: 'Tap Share',
        shareBody:
          'Select the Share icon in Safari’s bottom toolbar.',
        addTitle: 'Choose Add to Home Screen',
        addBody:
          'Tap Add to place the LMS icon on your Home Screen.',
        openLms: 'Open the LMS',
        close: 'Close installation guide',
      };

  const iosSteps = [
    {
      icon: Globe2,
      title: copy.safariTitle,
      body: copy.safariBody,
    },
    {
      icon: Share2,
      title: copy.shareTitle,
      body: copy.shareBody,
    },
    {
      icon: Plus,
      title: copy.addTitle,
      body: copy.addBody,
    },
  ];

  const guide = guideOpen
    ? createPortal(
        <div
          className="lms-ios-guide-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setGuideOpen(false);
            }
          }}
        >
          <div
            className="lms-ios-guide"
            role="dialog"
            aria-modal="true"
            aria-labelledby={guideTitleId}
          >
            <button
              type="button"
              data-mcoe-liquid="off"
              className="lms-ios-guide-close"
              aria-label={copy.close}
              onClick={() => setGuideOpen(false)}
            >
              <X aria-hidden="true" />
            </button>

            <span className="lms-ios-guide-icon">
              <Smartphone aria-hidden="true" />
            </span>
            <h3 id={guideTitleId}>
              {copy.guideTitle}
            </h3>
            <p>{copy.guideDescription}</p>

            <ol className="lms-ios-guide-steps">
              {iosSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <li key={step.title}>
                    <span className="lms-ios-guide-step-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <strong>
                        {index + 1}. {step.title}
                      </strong>
                      <small>{step.body}</small>
                    </span>
                  </li>
                );
              })}
            </ol>

            <a
              href={LMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lms-ios-guide-open"
            >
              {copy.openLms}
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div
        className="mcoe-hero-app-links"
        aria-label={copy.groupLabel}
      >
        <a
          href={ANDROID_APK_URL}
          className="mcoe-hero-app-link mcoe-hero-app-link--android"
          download
        >
          <span className="mcoe-hero-app-link__icon">
            <Download aria-hidden="true" />
          </span>
          <span className="mcoe-hero-app-link__copy">
            <strong>{copy.androidTitle}</strong>
            <small>{copy.androidMeta}</small>
          </span>
        </a>

        <button
          type="button"
          data-mcoe-liquid="off"
          className="mcoe-hero-app-link mcoe-hero-app-link--ios"
          onClick={() => setGuideOpen(true)}
        >
          <span className="mcoe-hero-app-link__icon">
            <Smartphone aria-hidden="true" />
          </span>
          <span className="mcoe-hero-app-link__copy">
            <strong>{copy.iosTitle}</strong>
            <small>{copy.iosMeta}</small>
          </span>
        </button>

        <a
          href={LMS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mcoe-hero-app-link mcoe-hero-app-link--web"
        >
          <span className="mcoe-hero-app-link__icon">
            <Globe2 aria-hidden="true" />
          </span>
          <span className="mcoe-hero-app-link__copy">
            <strong>{copy.webTitle}</strong>
            <small>{copy.webMeta}</small>
          </span>
        </a>
      </div>

      {guide}
    </>
  );
}
