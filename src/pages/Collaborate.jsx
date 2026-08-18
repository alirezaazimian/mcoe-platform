import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import Reveal from '@/components/ui/Reveal';
import { Mail, Phone, Briefcase, MessageSquare, User, Send, CheckCircle2, Info, Upload, FileText, X, AlertCircle } from 'lucide-react';

export default function Collaborate() {
  const { t, isRTL } = useLanguage();
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', expertise_area: '', resume_url: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [resumeName, setResumeName] = useState('');
  const [resumeUploading, setResumeUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeUploading(true);
    setUploadError('');
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm((f) => ({ ...f, resume_url: file_url }));
      setResumeName(file.name);
    } catch {
      setForm((f) => ({ ...f, resume_url: '' }));
      setResumeName('');
      setUploadError(isRTL ? 'بارگذاری فایل ناموفق بود. لطفاً مجدد تلاش کنید.' : 'File upload failed. Please try again.');
    } finally {
      setResumeUploading(false);
    }
  };

  const clearResume = () => {
    setForm((f) => ({ ...f, resume_url: '' }));
    setResumeName('');
    setUploadError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await base44.entities.CollaborationRequest.create(form);
      setStatus('success');
      setForm({ full_name: '', email: '', phone: '', expertise_area: '', resume_url: '', message: '' });
      setResumeName('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const toFa = (s) => s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
  const phones = ['021 2209 7446', '021 2208 4949', '021 2236 5647', '021 2236 5648'];
  const positions = isRTL
    ? ['معلم', 'مدیر', 'مربی هنر', 'مربی ورزش', 'مشاور تحصیلی', 'متخصص آموزش', 'مدیریت اداری', 'سایر']
    : ['Teacher', 'Manager', 'Art Coach', 'Sports Coach', 'Academic Counselor', 'Education Specialist', 'Administrative Manager', 'Other'];

  const fields = [
    { name: 'full_name', label: t('collaborate.fullName'), placeholder: t('collaborate.fullNamePlaceholder'), icon: User, type: 'text', required: true },
    { name: 'email', label: t('collaborate.email'), placeholder: t('collaborate.emailPlaceholder'), icon: Mail, type: 'email', required: true },
    { name: 'phone', label: t('collaborate.phone'), placeholder: t('collaborate.phonePlaceholder'), icon: Phone, type: 'tel', required: true },
    { name: 'expertise_area', label: t('collaborate.expertise'), placeholder: isRTL ? 'انتخاب کنید…' : 'Select…', icon: Briefcase, type: 'select', options: positions, required: true },
  ];

  return (
    <>
      <div className="bg-muted/30 border-b border-border py-16 lg:py-24">
        <div className="container-institutional">
          <Reveal>
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-3 block">{isRTL ? 'فرم همکاری' : 'Collaboration Form'}</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('collaborate.title')}</h1>
            <p className="text-muted-foreground text-lg max-w-xl">{t('collaborate.subtitle')}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-institutional py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Info */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="bg-primary/5 border-s-4 border-primary rounded-r-xl p-6 mb-6">
                <Info className="w-6 h-6 text-primary mb-3" />
                <p className="text-foreground/80 leading-relaxed">{t('collaborate.info')}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{isRTL ? 'ایمیل' : 'Email'}</div>
                    <a href="mailto:school@mcoe.ir" className="text-sm font-medium text-foreground hover:text-primary transition-colors">school@mcoe.ir</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{isRTL ? 'تلفن' : 'Phone'}</div>
                    <div className="flex flex-col gap-0.5" dir="ltr">
                      {phones.map((p) => (
                        <span key={p} className="text-sm font-medium text-foreground tracking-wide">{isRTL ? toFa(p) : p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form onSubmit={handleSubmit} className="glass neumorphic-inset rounded-2xl p-6 lg:p-8 space-y-5">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {field.label}
                      {field.required && <span className="text-destructive ms-1">*</span>}
                    </label>
                    <div className="relative">
                      <field.icon className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          required={field.required}
                          value={form[field.name]}
                          onChange={handleChange}
                          className="glass neumorphic-inset w-full rounded-xl py-3 ps-11 pe-8 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-transparent">
                          <option value="" disabled hidden>{field.placeholder}</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt} className="bg-card text-foreground">{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="glass neumorphic-inset w-full rounded-xl py-3 ps-11 pe-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      )}
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {isRTL ? 'رزومه' : 'Resume'}
                  </label>
                  <div className="glass neumorphic-inset w-full rounded-xl py-3 ps-11 pe-4 flex items-center gap-3">
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    {resumeName ? (
                      <>
                        <span className="flex items-center gap-2 flex-1 min-w-0 text-sm text-foreground">
                          <FileText className="w-4 h-4 text-primary shrink-0" />
                          <span className="truncate">{resumeName}</span>
                        </span>
                        <button
                          type="button"
                          onClick={clearResume}
                          className="p-1 rounded-md text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={isRTL ? 'حذف فایل' : 'Remove file'}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <label className="flex-1 cursor-pointer text-sm text-muted-foreground hover:text-primary transition-colors">
                        {resumeUploading
                          ? (isRTL ? 'در حال بارگذاری…' : 'Uploading…')
                          : (isRTL ? 'بارگذاری فایل رزومه (PDF)' : 'Upload resume file (PDF)')}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                          disabled={resumeUploading}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {uploadError && (
                    <div className="flex items-center gap-2 mt-2 text-destructive">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-medium">{uploadError}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('collaborate.message')}
                    <span className="text-destructive ms-1">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute top-3.5 start-3.5 w-4 h-4 text-muted-foreground" />
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t('collaborate.messagePlaceholder')}
                      className="glass neumorphic-inset w-full rounded-xl py-3 ps-11 pe-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 text-success fade-in">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{t('collaborate.success')}</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 text-destructive fade-in">
                    <span className="text-sm font-medium">{t('collaborate.error')}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting' || resumeUploading}
                  className="neumorphic-btn w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3.5 text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('collaborate.submitting')}
                    </>
                  ) : (
                    <>
                      <Send className={isRTL ? 'w-4 h-4 -scale-x-100' : 'w-4 h-4'} />
                      {t('collaborate.submit')}
                    </>
                  )}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}