import EntityManager from '@/components/dashboard/EntityManager';
import {
  djangoApi,
} from '@/api/djangoApi';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


const categoryOptions = [
  {
    value: 'education',
    labelKey:
      'categoryEducation',
  },
  {
    value: 'parenting',
    labelKey:
      'categoryParenting',
  },
  {
    value: 'pedagogy',
    labelKey:
      'categoryPedagogy',
  },
  {
    value: 'psychology',
    labelKey:
      'categoryPsychology',
  },
  {
    value: 'general',
    labelKey:
      'categoryGeneral',
  },
];


const statusOptions = [
  {
    value: 'draft',
    labelKey:
      'statusDraft',
  },
  {
    value:
      'pending_review',
    labelKey:
      'statusPendingReview',
  },
  {
    value: 'approved',
    labelKey:
      'statusApproved',
  },
  {
    value: 'published',
    labelKey:
      'statusPublished',
  },
  {
    value: 'archived',
    labelKey:
      'statusArchived',
  },
];


const adminArticlesApi = {
  list:
    djangoApi.articles
      .adminList,
  create:
    djangoApi.articles
      .create,
  update:
    djangoApi.articles
      .update,
  remove:
    djangoApi.articles
      .remove,
};


export default function ArticlesAdmin() {
  const {
    t,
  } = useDashboardLanguage();


  return (
    <EntityManager
      queryKey={[
        'dashboard',
        'articles',
      ]}
      title={t('articles')}
      description={t(
        'articlesIntro'
      )}
      api={adminArticlesApi}
      getUpdateKey={(
        record
      ) => record.id}
      prepareRecordForForm={(
        record
      ) => ({
        ...record,
        tags:
          Array.isArray(
            record.tags
          )
            ? record.tags.join(
                ', '
              )
            : (
                record.tags ||
                ''
              ),
        publish_date:
          record.publish_date ||
          '',
      })}
      preparePayload={(
        payload
      ) => ({
        ...payload,
        tags:
          Array.isArray(
            payload.tags
          )
            ? payload.tags
            : String(
                payload.tags ||
                ''
              )
                .split(',')
                .map((item) =>
                  item.trim()
                )
                .filter(Boolean),
      })}
      columns={[
        {
          key:
            'featured_image',
          labelKey:
            'featuredImage',
          type: 'image',
        },
        {
          key: 'title',
          labelKey:
            'titleFa',
          faKey: 'title_fa',
          enKey: 'title_en',
        },
        {
          key: 'category',
          labelKey:
            'category',
          options:
            categoryOptions,
        },
        {
          key: 'status',
          labelKey:
            'status',
          options:
            statusOptions,
        },
        {
          key:
            'publish_date',
          labelKey:
            'publishDate',
        },
        {
          key: 'is_featured',
          labelKey:
            'featured',
          type: 'boolean',
        },
      ]}
      formFields={[
        {
          key: 'title_fa',
          labelKey:
            'titleFa',
          type: 'text',
          required: true,
        },
        {
          key: 'title_en',
          labelKey:
            'titleEn',
          type: 'text',
        },
        {
          key: 'slug_fa',
          labelKey:
            'slugFa',
          type: 'text',
        },
        {
          key: 'slug_en',
          labelKey:
            'slugEn',
          type: 'text',
        },
        {
          key: 'category',
          labelKey:
            'category',
          type: 'select',
          options:
            categoryOptions,
        },
        {
          key: 'status',
          labelKey:
            'status',
          type: 'select',
          options:
            statusOptions,
        },
        {
          key:
            'author_name',
          labelKey:
            'authorName',
          type: 'text',
        },
        {
          key:
            'reading_time_min',
          labelKey:
            'readingTime',
          type: 'number',
        },
        {
          key:
            'publish_date',
          labelKey:
            'publishDate',
          type: 'date',
        },
        {
          key:
            'is_featured',
          labelKey:
            'featured',
          type: 'checkbox',
        },
        {
          key:
            'featured_image',
          labelKey:
            'featuredImage',
          type: 'file',
          full: true,
        },
        {
          key: 'tags',
          labelKey: 'tags',
          type: 'text',
          full: true,
        },
        {
          key: 'summary_fa',
          labelKey:
            'summaryFa',
          type: 'textarea',
          rows: 3,
          full: true,
        },
        {
          key: 'summary_en',
          labelKey:
            'summaryEn',
          type: 'textarea',
          rows: 3,
          full: true,
        },
        {
          key: 'body_fa',
          labelKey:
            'bodyFa',
          type: 'textarea',
          rows: 9,
          full: true,
        },
        {
          key: 'body_en',
          labelKey:
            'bodyEn',
          type: 'textarea',
          rows: 9,
          full: true,
        },
      ]}
      searchFields={[
        'title_fa',
        'title_en',
        'summary_fa',
        'summary_en',
        'body_fa',
        'body_en',
        'author_name',
        'slug_fa',
        'slug_en',
        'category',
        'status',
      ]}
      defaultValues={{
        title_fa: '',
        title_en: '',
        summary_fa: '',
        summary_en: '',
        body_fa: '',
        body_en: '',
        featured_image: '',
        category: 'general',
        tags: '',
        author_name: '',
        reading_time_min: 5,
        status: 'draft',
        publish_date: '',
        slug_fa: '',
        slug_en: '',
        is_featured: false,
      }}
    />
  );
}
