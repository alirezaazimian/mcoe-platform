import {
  djangoApi,
} from '@/api/djangoApi';
import EntityManager from '@/components/dashboard/EntityManager';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


const adminHeroSlidesApi = {
  list:
    djangoApi.heroSlides.adminList,
  create:
    djangoApi.heroSlides.create,
  update:
    djangoApi.heroSlides.update,
  remove:
    djangoApi.heroSlides.remove,
};


export default function HeroSlidesAdmin() {
  const {
    t,
  } = useDashboardLanguage();


  return (
    <EntityManager
      queryKey={[
        'dashboard',
        'hero-slides',
      ]}
      title={t(
        'heroSlides'
      )}
      description={t(
        'heroSlidesIntro'
      )}
      api={adminHeroSlidesApi}
      getUpdateKey={(
        record
      ) => record.id}
      prepareRecordForForm={(
        record
      ) => ({
        ...record,
        image:
          record.image_url ||
          '',
      })}
      preparePayload={(
        payload
      ) => ({
        ...payload,
        sort_order:
          Number(
            payload.sort_order ||
            0
          ),
        is_active:
          Boolean(
            payload.is_active
          ),
      })}
      columns={[
        {
          key: 'image_url',
          labelKey: 'image',
          type: 'image',
        },
        {
          key: 'title',
          labelKey: 'titleFa',
          faKey: 'title_fa',
          enKey: 'title_en',
        },
        {
          key: 'alt',
          labelKey:
            'alternativeText',
          faKey: 'alt_fa',
          enKey: 'alt_en',
        },
        {
          key: 'sort_order',
          labelKey:
            'sortOrder',
        },
        {
          key: 'is_active',
          labelKey: 'active',
          type: 'boolean',
        },
      ]}
      formFields={[
        {
          key: 'image',
          labelKey: 'image',
          type: 'file',
          required: true,
          full: true,
        },
        {
          key: 'eyebrow_fa',
          labelKey: 'eyebrowFa',
          type: 'text',
        },
        {
          key: 'eyebrow_en',
          labelKey: 'eyebrowEn',
          type: 'text',
        },
        {
          key: 'title_fa',
          labelKey: 'titleFa',
          type: 'text',
          full: true,
        },
        {
          key: 'title_en',
          labelKey: 'titleEn',
          type: 'text',
          full: true,
        },
        {
          key: 'description_fa',
          labelKey: 'descriptionFa',
          type: 'textarea',
          rows: 3,
          full: true,
        },
        {
          key: 'description_en',
          labelKey: 'descriptionEn',
          type: 'textarea',
          rows: 3,
          full: true,
        },
        {
          key: 'cta_label_fa',
          labelKey: 'ctaLabelFa',
          type: 'text',
        },
        {
          key: 'cta_label_en',
          labelKey: 'ctaLabelEn',
          type: 'text',
        },
        {
          key: 'cta_url',
          labelKey: 'ctaUrl',
          type: 'text',
          full: true,
        },
        {
          key: 'alt_fa',
          labelKey: 'altFa',
          type: 'text',
          full: true,
        },
        {
          key: 'alt_en',
          labelKey: 'altEn',
          type: 'text',
          full: true,
        },
        {
          key: 'sort_order',
          labelKey:
            'sortOrder',
          type: 'number',
        },
        {
          key: 'is_active',
          labelKey: 'active',
          type: 'checkbox',
        },
      ]}
      searchFields={[
        'title_fa',
        'title_en',
        'alt_fa',
        'alt_en',
        'sort_order',
      ]}
      defaultValues={{
        image: '',
        eyebrow_fa: '',
        eyebrow_en: '',
        title_fa: '',
        title_en: '',
        description_fa: '',
        description_en: '',
        cta_label_fa: '',
        cta_label_en: '',
        cta_url: '',
        alt_fa: '',
        alt_en: '',
        sort_order: 0,
        is_active: true,
      }}
    />
  );
}
