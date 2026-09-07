import {
  useMemo,
  useState,
} from 'react';

import EntityManager from '@/components/dashboard/EntityManager';
import { djangoApi } from '@/api/djangoApi';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


function withAdminList(api) {
  return {
    ...api,
    list: () => api.adminList(),
  };
}


export default function SiteContentAdmin() {
  const { t } = useDashboardLanguage();
  const [tab, setTab] = useState('images');

  const apis = useMemo(
    () => ({
      images: withAdminList(
        djangoApi.siteImages
      ),
      levels: withAdminList(
        djangoApi.educationLevels
      ),
      partners: withAdminList(
        djangoApi.partners
      ),
      facilities: withAdminList(
        djangoApi.facilities
      ),
      sections: withAdminList(
        djangoApi.siteSections
      ),
    }),
    []
  );

  const tabs = [
    ['images', 'siteImages'],
    ['levels', 'educationLevels'],
    ['partners', 'partners'],
    ['facilities', 'facilities'],
    ['sections', 'sectionTexts'],
  ];

  return (
    <div>
      <div className="mcoe-admin-tabs">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={tab === key ? 'is-active' : ''}
            onClick={() => setTab(key)}
          >
            {t(label)}
          </button>
        ))}
      </div>

      {tab === 'images' && (
        <EntityManager
          queryKey={['dashboard', 'site-images']}
          title={t('siteImages')}
          description={t('siteImagesIntro')}
          api={apis.images}
          getUpdateKey={(record) => record.id}
          columns={[
            {
              key: 'image',
              labelKey: 'image',
              type: 'image',
            },
            {
              key: 'section',
              labelKey: 'siteSection',
              options: [
                {
                  value: 'home_gallery',
                  labelKey: 'homeGallery',
                },
                {
                  value: 'educational_space',
                  labelKey: 'educationalSpace',
                },
              ],
            },
            {
              key: 'alt',
              labelKey: 'alternativeText',
              faKey: 'alt_fa',
              enKey: 'alt_en',
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'boolean',
            },
            {
              key: 'sort_order',
              labelKey: 'sortOrder',
            },
          ]}
          formFields={[
            {
              key: 'section',
              labelKey: 'siteSection',
              type: 'select',
              required: true,
              options: [
                {
                  value: 'home_gallery',
                  labelKey: 'homeGallery',
                },
                {
                  value: 'educational_space',
                  labelKey: 'educationalSpace',
                },
              ],
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
              required: true,
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'checkbox',
            },
            {
              key: 'alt_fa',
              labelKey: 'altFa',
              type: 'text',
            },
            {
              key: 'alt_en',
              labelKey: 'altEn',
              type: 'text',
            },
            {
              key: 'caption_fa',
              labelKey: 'captionFa',
              type: 'textarea',
              full: true,
            },
            {
              key: 'caption_en',
              labelKey: 'captionEn',
              type: 'textarea',
              full: true,
            },
          ]}
          searchFields={[
            'section',
            'alt_fa',
            'alt_en',
            'caption_fa',
            'caption_en',
          ]}
          defaultValues={{
            section: 'home_gallery',
            image: '',
            alt_fa: '',
            alt_en: '',
            caption_fa: '',
            caption_en: '',
            is_active: true,
            sort_order: 0,
          }}
        />
      )}

      {tab === 'levels' && (
        <EntityManager
          queryKey={['dashboard', 'education-levels']}
          title={t('educationLevels')}
          description={t('educationLevelsIntro')}
          api={apis.levels}
          getUpdateKey={(record) => record.slug}
          columns={[
            {
              key: 'image',
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
              key: 'slug',
              labelKey: 'slug',
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
              key: 'title_fa',
              labelKey: 'titleFa',
              type: 'text',
              required: true,
            },
            {
              key: 'title_en',
              labelKey: 'titleEn',
              type: 'text',
            },
            {
              key: 'age_label_fa',
              labelKey: 'ageLabelFa',
              type: 'text',
            },
            {
              key: 'age_label_en',
              labelKey: 'ageLabelEn',
              type: 'text',
            },
            {
              key: 'image',
              labelKey: 'image',
              type: 'file',
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'checkbox',
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
          searchFields={['title_fa', 'title_en', 'slug']}
          defaultValues={{
            slug: '',
            title_fa: '',
            title_en: '',
            description_fa: '',
            description_en: '',
            age_label_fa: '',
            age_label_en: '',
            image: '',
            is_active: true,
            sort_order: 0,
          }}
        />
      )}

      {tab === 'partners' && (
        <EntityManager
          queryKey={['dashboard', 'partners']}
          title={t('partners')}
          description={t('partnersIntro')}
          api={apis.partners}
          getUpdateKey={(record) => record.id}
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
              key: 'url',
              labelKey: 'websiteUrl',
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'boolean',
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
              key: 'url',
              labelKey: 'websiteUrl',
              type: 'url',
            },
            {
              key: 'icon',
              labelKey: 'icon',
              type: 'text',
            },
            {
              key: 'image',
              labelKey: 'partnerLogo',
              type: 'file',
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
          searchFields={['name_fa', 'name_en', 'url']}
          defaultValues={{
            name_fa: '',
            name_en: '',
            url: '',
            icon: '',
            image: '',
            is_active: true,
            sort_order: 0,
          }}
        />
      )}

      {tab === 'facilities' && (
        <EntityManager
          queryKey={['dashboard', 'facilities']}
          title={t('facilities')}
          description={t('facilitiesIntro')}
          api={apis.facilities}
          getUpdateKey={(record) => record.id}
          columns={[
            {
              key: 'name',
              labelKey: 'nameFa',
              faKey: 'name_fa',
              enKey: 'name_en',
            },
            {
              key: 'icon',
              labelKey: 'icon',
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'boolean',
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
              key: 'is_active',
              labelKey: 'active',
              type: 'checkbox',
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
          searchFields={['name_fa', 'name_en', 'description_fa']}
          defaultValues={{
            name_fa: '',
            name_en: '',
            description_fa: '',
            description_en: '',
            icon: '',
            is_active: true,
            sort_order: 0,
          }}
        />
      )}

      {tab === 'sections' && (
        <EntityManager
          queryKey={['dashboard', 'site-sections']}
          title={t('sectionTexts')}
          description={t('sectionTextsIntro')}
          api={apis.sections}
          getUpdateKey={(record) => record.key}
          columns={[
            {
              key: 'key',
              labelKey: 'sectionKey',
            },
            {
              key: 'title',
              labelKey: 'titleFa',
              faKey: 'title_fa',
              enKey: 'title_en',
            },
          ]}
          formFields={[
            {
              key: 'key',
              labelKey: 'sectionKey',
              type: 'text',
              required: true,
            },
            {
              key: 'title_fa',
              labelKey: 'titleFa',
              type: 'text',
            },
            {
              key: 'title_en',
              labelKey: 'titleEn',
              type: 'text',
            },
            {
              key: 'subtitle_fa',
              labelKey: 'subtitleFa',
              type: 'textarea',
              full: true,
            },
            {
              key: 'subtitle_en',
              labelKey: 'subtitleEn',
              type: 'textarea',
              full: true,
            },
            {
              key: 'body_fa',
              labelKey: 'bodyFa',
              type: 'textarea',
              rows: 6,
              full: true,
            },
            {
              key: 'body_en',
              labelKey: 'bodyEn',
              type: 'textarea',
              rows: 6,
              full: true,
            },
          ]}
          searchFields={['key', 'title_fa', 'title_en']}
          defaultValues={{
            key: '',
            title_fa: '',
            title_en: '',
            subtitle_fa: '',
            subtitle_en: '',
            body_fa: '',
            body_en: '',
          }}
        />
      )}
    </div>
  );
}
