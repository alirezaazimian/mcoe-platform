import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { Mail, MapPin, Phone, Send, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { label: t('common.about'), to: '/about' },
    { label: t('common.levels'), to: '/levels' },
    { label: t('common.groups'), to: '/working-groups' },
    { label: t('common.associations'), to: '/associations' },
    { label: t('common.articles'), to: '/articles' },
    { label: t('common.news'), to: '/news' },
    { label: t('common.events'), to: '/events' },
    { label: t('common.collaborate'), to: '/collaborate' },
  ];

  const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const toFa = (str) => str.replace(/[0-9]/g, (d) => faDigits[+d]);
  const phones = ['021 2209 7446', '021 2208 4949', '021 2236 5647', '021 2236 5648'];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-primary text-primary-foreground/90 mt-30">
      {/* Top accent rule */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

      <div className="container-institutional py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* About */}
          <div className="lg:col-span-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start text-center sm:text-start gap-3 mb-5">
              <Image
                src="https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/3cc1bf827_BlackandWhiteElegantInitialsLogo1.png"
                alt={isRTL ? 'موسسه آموزشی معصومه عظیمیان' : 'Masoumeh Azimian Institute'}
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg shrink-0"
                fittingType="fill"
              />
              <div className="flex flex-col justify-center">
                <div className="font-bold text-white text-sm sm:text-base leading-tight">{isRTL ? 'موسسه آموزشی معصومه عظیمیان' : 'Masoumeh Azimian Institute'}</div>
                <div className="text-xs text-primary-foreground/60 mt-1">{isRTL ? 'مجتمع آموزشی حضرت معصومه (س)' : 'Hazrat Masoumeh (S) Educational Complex'}</div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-sm mx-auto sm:mx-0 text-center sm:text-start">
              {t('footer.about')}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#E1306C] hover:opacity-90 transition-opacity" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#0A66C2] hover:opacity-90 transition-opacity" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#229ED9] hover:opacity-90 transition-opacity" aria-label="Telegram">
                <Send className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 text-center sm:text-start">
            <h4 className="font-semibold text-white text-sm mb-5">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-primary-foreground/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 text-start">
            <h4 className="font-semibold text-white text-sm mb-5">{t('footer.contactUs')}</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start justify-start gap-3">
                <span className="w-9 h-9 rounded-lg glass neumorphic-inset-dark flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </span>
                <span className="pt-2">{t('footer.address')}</span>
              </li>
              <li className="flex items-center justify-start gap-3">
                <span className="w-9 h-9 rounded-lg glass neumorphic-inset-dark flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </span>
                <a href="mailto:school@mcoe.ir" className="hover:text-white transition-colors">school@mcoe.ir</a>
              </li>
              <li className="flex items-start justify-start gap-3">
                <span className="w-9 h-9 rounded-lg glass neumorphic-inset-dark flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </span>
                <div className="flex flex-col items-start gap-1 pt-1.5" dir="ltr">
                  {phones.map((p) => (
                    <span key={p}>{isRTL ? toFa(p) : p}</span>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 text-center sm:text-start">
            <h4 className="font-semibold text-white text-sm mb-5">{t('footer.newsletter')}</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">{t('footer.newsletterText')}</p>
            <form onSubmit={handleSubscribe} className="relative max-w-sm mx-auto sm:mx-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                className="w-full bg-white/10 border border-white/15 rounded-lg py-2.5 ps-4 pe-12 text-sm text-white placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/30 transition-all"
              />
              <button type="submit" className="glass neumorphic-inset-dark absolute top-1/2 -translate-y-1/2 end-1.5 w-9 h-9 rounded-md text-white flex items-center justify-center transition-colors" aria-label={t('footer.subscribe')}>
                <Send className={isRTL ? 'w-4 h-4 -scale-x-100' : 'w-4 h-4'} />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-accent mt-2 fade-in">✓ {isRTL ? 'عضویت شما ثبت شد' : 'Subscribed successfully'}</p>
            )}
            {/* Enamad trust seal */}
            <a
              href="https://trustseal.enamad.ir/?id=558139&Code=uSstDilCe5rcFeSbn7hAphs5L3MrhxAf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 rounded-lg p-1 hover-elevate mx-auto sm:mx-0"
              aria-label={isRTL ? 'نماد اعتماد الکترونیکی' : 'Enamad Trust Seal'}
            >
              <img
                src="https://media.base44.com/images/public/6a75e3f43c273d956fec49a7/b20ede19d_Untitleddesign.png"
                alt={isRTL ? 'نماد اعتماد الکترونیکی' : 'Enamad Trust Seal'}
                className="w-[150px] h-[150px] object-contain [mix-blend-mode:screen]"
              />
            </a>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12">
          <h4 className="font-semibold text-white text-sm mb-4 flex items-center justify-center sm:justify-start gap-3">
            <span className="w-9 h-9 rounded-lg glass neumorphic-inset-dark flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </span>
            {t('footer.findUs')}
          </h4>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.8301644796516!2d51.36138227638965!3d35.77954802456592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e07af0122980d%3A0x93c1efd9f7f79b97!2z2YXYrNiq2YXYuSDYotmF2YjYsti024wg2K_Yrtiq2LHYp9mG2Ycg2K3Yttix2Kog2YXYudi12YjZhdmHICjYsyk!5e0!3m2!1sen!2sfr!4v1786891713611!5m2!1sen!2sfr"
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="MCOE Location"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/60">{t('footer.rightsText')}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs text-primary-foreground/60 hover:text-white transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            {isRTL ? 'بازگشت به بالا' : 'Back to top'}
          </button>
        </div>
      </div>
    </footer>
  );
}