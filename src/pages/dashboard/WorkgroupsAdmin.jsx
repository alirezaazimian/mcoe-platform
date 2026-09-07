import {
  useMemo,
  useState,
} from 'react';

import {
  useQuery,
} from '@tanstack/react-query';

import EntityManager from '@/components/dashboard/EntityManager';
import { djangoApi } from '@/api/djangoApi';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


const groupDefaultValues = {
  name_fa: '',
  name_en: '',
  slug: '',
  description_fa: '',
  description_en: '',
  summary_fa: '',
  summary_en: '',
  objectives_fa: '',
  objectives_en: '',
  programs_fa: '',
  programs_en: '',
  icon: '',
  image: '',
  sort_order: 0,
};


const memberDefaultValues = {
  group_slug: '',
  name_fa: '',
  name_en: '',
  role_fa: '',
  role_en: '',
  summary_fa: '',
  summary_en: '',
  bio_fa: '',
  bio_en: '',
  education_fa: '',
  education_en: '',
  experience_fa: '',
  experience_en: '',
  expertise_fa: '',
  expertise_en: '',
  email: '',
  linkedin_url: '',
  photo: '',
  sort_order: 0,
};


export default function WorkgroupsAdmin() {
  const {
    t,
    lang,
  } = useDashboardLanguage();
  const [tab, setTab] = useState('groups');

  const {
    data: groups = [],
  } = useQuery({
    queryKey: [
      'dashboard',
      'workgroups',
      'options',
    ],
    queryFn:
      djangoApi.workingGroups.list,
  });

  const groupOptions = useMemo(
    () => [
      {
        value: '',
        labelKey: 'chooseWorkgroup',
      },
      ...groups.map((group) => ({
        value: group.slug,
        labelKey:
          lang === 'fa'
            ? group.name_fa
            : (
                group.name_en ||
                group.name_fa
              ),
      })),
    ],
    [groups, lang]
  );

  const membersApi = useMemo(
    () => ({
      ...djangoApi.workingGroupMembers,
      list: () =>
        djangoApi.workingGroupMembers.adminList(),
    }),
    []
  );

  return (
    <div>
      <div className="mcoe-admin-tabs">
        <button
          type="button"
          className={tab === 'groups' ? 'is-active' : ''}
          onClick={() => setTab('groups')}
        >
          {t('workgroupDetails')}
        </button>
        <button
          type="button"
          className={tab === 'members' ? 'is-active' : ''}
          onClick={() => setTab('members')}
        >
          {t('workgroupMembers')}
        </button>
      </div>

      {tab === 'groups' ? (
        <EntityManager
          queryKey={['dashboard', 'workgroups']}
          title={t('workgroups')}
          description={t('workgroupsIntro')}
          api={djangoApi.workingGroups}
          getUpdateKey={(record) => record.slug}
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
              key: 'summary_fa',
              labelKey: 'summaryFa',
              type: 'textarea',
              full: true,
            },
            {
              key: 'summary_en',
              labelKey: 'summaryEn',
              type: 'textarea',
              full: true,
            },
            {
              key: 'description_fa',
              labelKey: 'descriptionFa',
              type: 'textarea',
              rows: 8,
              full: true,
            },
            {
              key: 'description_en',
              labelKey: 'descriptionEn',
              type: 'textarea',
              rows: 8,
              full: true,
            },
            {
              key: 'objectives_fa',
              labelKey: 'objectivesFa',
              type: 'textarea',
              rows: 6,
              full: true,
            },
            {
              key: 'objectives_en',
              labelKey: 'objectivesEn',
              type: 'textarea',
              rows: 6,
              full: true,
            },
            {
              key: 'programs_fa',
              labelKey: 'programsFa',
              type: 'textarea',
              rows: 6,
              full: true,
            },
            {
              key: 'programs_en',
              labelKey: 'programsEn',
              type: 'textarea',
              rows: 6,
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
          defaultValues={groupDefaultValues}
        />
      ) : (
        <EntityManager
          queryKey={['dashboard', 'workgroup-members']}
          title={t('workgroupMembers')}
          description={t('workgroupMembersIntro')}
          api={membersApi}
          getUpdateKey={(record) => record.id}
          columns={[
            {
              key: 'photo_url',
              labelKey: 'photo',
              type: 'image',
            },
            {
              key: 'name',
              labelKey: 'nameFa',
              faKey: 'name_fa',
              enKey: 'name_en',
            },
            {
              key: 'group_slug',
              labelKey: 'workgroup',
            },
            {
              key: 'role',
              labelKey: 'roleFa',
              faKey: 'role_fa',
              enKey: 'role_en',
            },
            {
              key: 'sort_order',
              labelKey: 'sortOrder',
            },
          ]}
          formFields={[
            {
              key: 'group_slug',
              labelKey: 'workgroup',
              type: 'select',
              options: groupOptions,
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
            },
            {
              key: 'name_en',
              labelKey: 'nameEn',
              type: 'text',
            },
            {
              key: 'role_fa',
              labelKey: 'roleFa',
              type: 'text',
            },
            {
              key: 'role_en',
              labelKey: 'roleEn',
              type: 'text',
            },
            {
              key: 'photo',
              labelKey: 'photo',
              type: 'file',
            },
            {
              key: 'email',
              labelKey: 'email',
              type: 'text',
            },
            {
              key: 'linkedin_url',
              labelKey: 'linkedinUrl',
              type: 'url',
            },
            ...[
              ['summary_fa', 'summaryFa'],
              ['summary_en', 'summaryEn'],
              ['bio_fa', 'bioFa'],
              ['bio_en', 'bioEn'],
              ['education_fa', 'educationFa'],
              ['education_en', 'educationEn'],
              ['experience_fa', 'experienceFa'],
              ['experience_en', 'experienceEn'],
              ['expertise_fa', 'expertiseFa'],
              ['expertise_en', 'expertiseEn'],
            ].map(([key, labelKey]) => ({
              key,
              labelKey,
              type: 'textarea',
              rows: 5,
              full: true,
            })),
          ]}
          searchFields={[
            'name_fa',
            'name_en',
            'role_fa',
            'role_en',
            'group_slug',
          ]}
          defaultValues={memberDefaultValues}
          prepareRecordForForm={(record) => ({
            ...record,
            photo: record.photo_url || '',
          })}
        />
      )}
    </div>
  );
}
