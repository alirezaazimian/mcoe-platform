import {
  djangoApi,
} from '@/api/djangoApi';
import EntityManager from '@/components/dashboard/EntityManager';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


export const EDUCATION_SLIDER_LEVELS = {
  elementaryFirst: 'elementary-first',
  elementarySecond: 'elementary-second',
  middleFirst: 'middle-first',
};


export default function EducationLevelSlidesAdmin({
  level,
  titleKey,
  descriptionKey,
}) {
  const { t } =
    useDashboardLanguage();

  const api = {
    list: () =>
      djangoApi.educationHeroSlides
        .adminListByLevel(level),

    create: (payload) =>
      djangoApi.educationHeroSlides
        .create({
          ...payload,
          level,
        }),

    update:
      djangoApi.educationHeroSlides
        .update,

    remove:
      djangoApi.educationHeroSlides
        .remove,
  };


  return (
    <EntityManager
      queryKey={[
        'dashboard',
        'education-hero-slides',
        level,
      ]}
      title={t(titleKey)}
      description={t(descriptionKey)}
      api={api}
      getUpdateKey={(record) =>
        record.id
      }
      prepareRecordForForm={(record) => ({
        ...record,
        image:
          record.image_url ||
          '',
      })}
      preparePayload={(payload) => ({
        ...payload,
        level,
        sort_order: Number(
          payload.sort_order ||
          0
        ),
        is_active: Boolean(
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
          key: 'alt_fa',
          labelKey: 'altFa',
        },
        {
          key: 'sort_order',
          labelKey: 'sortOrder',
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
          labelKey: 'sortOrder',
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
