import {
  djangoApi,
} from '@/api/djangoApi';
import EntityManager from '@/components/dashboard/EntityManager';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


export const PAGE_HERO_KEYS = {
  kindergarten: 'kindergarten',
  about: 'about',
};


export default function PageHeroAdmin({
  page,
  titleKey,
  descriptionKey,
}) {
  const { t } =
    useDashboardLanguage();

  const api = {
    list: () =>
      djangoApi.pageHeroes
        .adminListByPage(page),

    create: (payload) =>
      djangoApi.pageHeroes.create({
        ...payload,
        page,
      }),

    update:
      djangoApi.pageHeroes.update,

    remove:
      djangoApi.pageHeroes.remove,
  };


  return (
    <EntityManager
      queryKey={[
        'dashboard',
        'page-heroes',
        page,
      ]}
      title={t(titleKey)}
      description={t(
        descriptionKey
      )}
      api={api}
      getUpdateKey={(record) =>
        record.page
      }
      singleRecord
      allowDelete={false}
      prepareRecordForForm={(
        record
      ) => ({
        ...record,
        image:
          record.image_url ||
          '',
      })}
      preparePayload={(payload) => ({
        ...payload,
        page,
      })}
      columns={[
        {
          key: 'image_url',
          labelKey: 'heroImage',
          type: 'image',
        },
        {
          key: 'alt_fa',
          labelKey: 'altFa',
        },
        {
          key: 'alt_en',
          labelKey: 'altEn',
        },
      ]}
      formFields={[
        {
          key: 'image',
          labelKey: 'heroImage',
          type: 'file',
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
      ]}
      searchFields={[
        'alt_fa',
        'alt_en',
      ]}
      defaultValues={{
        page,
        image: '',
        alt_fa: '',
        alt_en: '',
      }}
    />
  );
}
