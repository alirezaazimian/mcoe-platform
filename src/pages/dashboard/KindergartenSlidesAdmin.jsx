import {
  djangoApi,
} from '@/api/djangoApi';
import EntityManager from '@/components/dashboard/EntityManager';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


const adminKindergartenSlidesApi = {
  list:
    djangoApi.kindergartenSlides.adminList,
  create:
    djangoApi.kindergartenSlides.create,
  update:
    djangoApi.kindergartenSlides.update,
  remove:
    djangoApi.kindergartenSlides.remove,
};


export default function KindergartenSlidesAdmin() {
  const {
    t,
  } = useDashboardLanguage();


  return (
    <EntityManager
      queryKey={[
        'dashboard',
        'kindergarten-slides',
      ]}
      title={t(
        'kindergartenSlides'
      )}
      description={t(
        'kindergartenSlidesIntro'
      )}
      api={adminKindergartenSlidesApi}
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
          labelKey:
            'kindergartenSlideTitle',
          faKey: 'title_fa',
          enKey: 'title_en',
        },
        {
          key: 'tag',
          labelKey:
            'kindergartenSlideTag',
          faKey: 'tag_fa',
          enKey: 'tag_en',
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
          key: 'text_fa',
          labelKey:
            'kindergartenSlideTextFa',
          type: 'textarea',
          rows: 4,
          full: true,
        },
        {
          key: 'text_en',
          labelKey:
            'kindergartenSlideTextEn',
          type: 'textarea',
          rows: 4,
          full: true,
        },
        {
          key: 'tag_fa',
          labelKey:
            'kindergartenSlideTagFa',
          type: 'text',
        },
        {
          key: 'tag_en',
          labelKey:
            'kindergartenSlideTagEn',
          type: 'text',
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
        'text_fa',
        'text_en',
        'tag_fa',
        'tag_en',
        'alt_fa',
        'alt_en',
      ]}
      defaultValues={{
        image: '',
        title_fa: '',
        title_en: '',
        text_fa: '',
        text_en: '',
        tag_fa: '',
        tag_en: '',
        alt_fa: '',
        alt_en: '',
        sort_order: 0,
        is_active: true,
      }}
    />
  );
}
