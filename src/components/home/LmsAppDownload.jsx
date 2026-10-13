import React, {
  useEffect,
  useId,
  useState,
} from 'react';
import {
  Download,
  ExternalLink,
  Globe2,
  Plus,
  Share2,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
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
        eyebrow: 'سامانه آموزشی همراه خانواده',
        title: 'مدرسه، همیشه همراه شما',
        description:
          'دسترسی سریع اولیا و دانش‌آموزان به کلاس‌ها، تکالیف، اطلاعیه‌ها و محتوای آموزشی؛ روی موبایل یا از طریق نسخه وب.',
        androidTitle: 'دانلود اپ اندروید',
        androidMeta: 'فایل رسمی APK',
        iosTitle: 'نصب در آیفون و آیپد',
        iosMeta: 'افزودن به صفحه اصلی',
        webTitle: 'ورود به نسخه وب',
        official: 'دریافت مستقیم از سرور رسمی مجتمع',
        appName: 'سامانه آموزشی MCOE',
        appMeta: 'ویژه اولیا و دانش‌آموزان',
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
        eyebrow: 'The school platform for families',
        title: 'Your school, always with you',
        description:
          'Quick access for families and students to classes, assignments, announcements and learning content on mobile or the web.',
        androidTitle: 'Download for Android',
        androidMeta: 'Official APK file',
        iosTitle: 'Install on iPhone & iPad',
        iosMeta: 'Add to Home Screen',
        webTitle: 'Open the web version',
        official: 'Downloaded directly from the school server',
        appName: 'MCOE Learning',
        appMeta: 'For families and students',
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

  return (
    <section
      className="home-clay-section lms-download-section py-12 lg:py-16"
      aria-labelledby="lms-download-title"
    >
      <div className="container-institutional">
        <Reveal>
          <div className="lms-download-panel">
            <div className="lms-download-copy">
              <span className="lms-download-eyebrow">
                {copy.eyebrow}
              </span>

              <h2 id="lms-download-title">
                {copy.title}
              </h2>

              <p>{copy.description}</p>

              <div className="lms-download-actions">
                <a
                  href={ANDROID_APK_URL}
                  className="lms-download-action lms-download-action--android"
                  download
                >
                  <span className="lms-download-action-icon">
                    <Download aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{copy.androidTitle}</strong>
                    <small>{copy.androidMeta}</small>
                  </span>
                </a>

                <button
                  type="button"
                  data-mcoe-liquid="off"
                  className="lms-download-action lms-download-action--ios"
                  onClick={() => setGuideOpen(true)}
                >
                  <span className="lms-download-action-icon">
                    <Smartphone aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{copy.iosTitle}</strong>
                    <small>{copy.iosMeta}</small>
                  </span>
                </button>

                <a
                  href={LMS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="lms-download-web-link"
                >
                  {copy.webTitle}
                  <ExternalLink aria-hidden="true" />
                </a>
              </div>

              <span className="lms-download-trust">
                <ShieldCheck aria-hidden="true" />
                {copy.official}
              </span>
            </div>

            <div
              className="lms-download-device"
              aria-hidden="true"
            >
              <div className="lms-download-device-screen">
                <span className="lms-download-device-mark">
                  <Smartphone />
                </span>
                <strong>{copy.appName}</strong>
                <small>{copy.appMeta}</small>
                <span className="lms-download-device-line" />
                <span className="lms-download-device-line lms-download-device-line--short" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {guideOpen && (
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
              rel="noreferrer"
              className="lms-ios-guide-open"
            >
              {copy.openLms}
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
