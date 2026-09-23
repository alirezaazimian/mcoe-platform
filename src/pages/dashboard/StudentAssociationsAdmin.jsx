import {
  djangoApi,
} from '@/api/djangoApi';
import EntityManager from '@/components/dashboard/EntityManager';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


const adminStudentAssociationsApi = {
  list:
    djangoApi.studentAssociations
      .adminList,
  create:
    djangoApi.studentAssociations
      .create,
  update:
    djangoApi.studentAssociations
      .update,
  remove:
    djangoApi.studentAssociations
      .remove,
};


export default function StudentAssociationsAdmin() {
  const { t } =
    useDashboardLanguage();


  return (
    <EntityManager
      queryKey={[
        'dashboard',
        'student-associations',
      ]}
      title={t(
        'studentAssociations'
      )}
      description={t(
        'studentAssociationsIntro'
      )}
      api={
        adminStudentAssociationsApi
      }
      getUpdateKey={(record) =>
        record.slug
      }
      preparePayload={(payload) => ({
        ...payload,
        sort_order: Number(
          payload.sort_order || 0
        ),
        is_active: Boolean(
          payload.is_active
        ),
      })}
      columns={[
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
        {
          key: 'is_active',
          labelKey: 'active',
          type: 'boolean',
        },
      ]}
      formFields={[
        {
          key: 'slug',
          labelKey: 'slug',
          type: 'text',
          required: true,
        },
        {
          key: 'sort_order',
          labelKey: 'sortOrder',
          type: 'number',
        },
        {
          key: 'name_fa',
          labelKey: 'nameFa',
          type: 'text',
          required: true,
          full: true,
        },
        {
          key: 'name_en',
          labelKey: 'nameEn',
          type: 'text',
          full: true,
        },
        {
          key: 'description_fa',
          labelKey: 'descriptionFa',
          type: 'textarea',
          rows: 4,
          full: true,
        },
        {
          key: 'description_en',
          labelKey: 'descriptionEn',
          type: 'textarea',
          rows: 4,
          full: true,
        },
        {
          key: 'icon',
          labelKey: 'icon',
          type: 'text',
        },
        {
          key: 'accent_color',
          labelKey: 'accentColor',
          type: 'text',
          required: true,
        },
        {
          key: 'is_active',
          labelKey: 'active',
          type: 'checkbox',
        },
      ]}
      searchFields={[
        'slug',
        'name_fa',
        'name_en',
        'description_fa',
        'description_en',
      ]}
      defaultValues={{
        slug: '',
        name_fa: '',
        name_en: '',
        description_fa: '',
        description_en: '',
        icon: 'users-round',
        accent_color: '#2E7D32',
        is_active: true,
        sort_order: 0,
      }}
    />
  );
}
