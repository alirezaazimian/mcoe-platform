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
        'alt_fa',
        'alt_en',
        'sort_order',
      ]}
      defaultValues={{
        image: '',
        alt_fa: '',
        alt_en: '',
        sort_order: 0,
        is_active: true,
      }}
    />
  );
}
