import EntityManager from '@/components/dashboard/EntityManager';
import { djangoApi } from '@/api/djangoApi';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


export default function WorkgroupsAdmin() {
  const {
    t,
  } = useDashboardLanguage();


  return (
    <EntityManager
      queryKey={[
        'dashboard',
        'workgroups',
      ]}
      title={t('workgroups')}
      description={t(
        'workgroupsIntro'
      )}
      api={djangoApi.workingGroups}
      getUpdateKey={(
        record
      ) => record.slug}
      columns={[
        {
          key: 'image',
          labelKey: 'image',
          type: 'image',
        },
        {
          key: 'name',
          labelKey: 'nameFa',
          faKey: 'name_fa',
          enKey: 'name_en',
        },
        {
          key: 'slug',
          labelKey: 'slug',
        },
        {
          key: 'icon',
          labelKey: 'icon',
        },
        {
          key: 'sort_order',
          labelKey: 'sortOrder',
        },
      ]}
      formFields={[
        {
          key: 'name_fa',
          labelKey: 'nameFa',
          type: 'text',
          required: true,
        },
        {
          key: 'name_en',
          labelKey: 'nameEn',
          type: 'text',
        },
        {
          key: 'slug',
          labelKey: 'slug',
          type: 'text',
          required: true,
        },
        {
          key: 'icon',
          labelKey: 'icon',
          type: 'text',
        },
        {
          key: 'sort_order',
          labelKey: 'sortOrder',
          type: 'number',
        },
        {
          key: 'image',
          labelKey: 'image',
          type: 'file',
        },
        {
          key: 'description_fa',
          labelKey: 'descriptionFa',
          type: 'textarea',
          full: true,
        },
        {
          key: 'description_en',
          labelKey: 'descriptionEn',
          type: 'textarea',
          full: true,
        },
      ]}
      searchFields={[
        'name_fa',
        'name_en',
        'slug',
        'description_fa',
        'description_en',
      ]}
      defaultValues={{
        name_fa: '',
        name_en: '',
        slug: '',
        description_fa: '',
        description_en: '',
        icon: '',
        image: '',
        sort_order: 0,
      }}
    />
  );
}
