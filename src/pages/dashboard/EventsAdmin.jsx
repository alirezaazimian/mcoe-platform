import EntityManager from '@/components/dashboard/EntityManager';
import {
  djangoApi,
} from '@/api/djangoApi';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


const statusOptions = [
  {
    value: 'upcoming',
    labelKey:
      'eventStatusUpcoming',
  },
  {
    value: 'completed',
    labelKey:
      'eventStatusCompleted',
  },
];


const adminEventsApi = {
  list:
    djangoApi.events.adminList,
  create:
    djangoApi.events.create,
  update:
    djangoApi.events.update,
  remove:
    djangoApi.events.remove,
};


function dateTimeValue(
  value
) {
  if (!value) {
    return '';
  }

  return String(value).slice(
    0,
    16
  );
}


export default function EventsAdmin() {
  const {
    t,
  } = useDashboardLanguage();


  return (
    <EntityManager
      queryKey={[
        'dashboard',
        'events',
      ]}
      title={t('events')}
      description={t(
        'eventsIntro'
      )}
      api={adminEventsApi}
      getUpdateKey={(
        record
      ) => record.id}
      prepareRecordForForm={(
        record
      ) => ({
        ...record,
        event_date:
          dateTimeValue(
            record.event_date
          ),
        registration_deadline:
          dateTimeValue(
            record.registration_deadline
          ),
        capacity:
          record.capacity ??
          '',
      })}
      columns={[
        {
          key:
            'banner_image',
          labelKey:
            'eventImage',
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
          key: 'event_date',
          labelKey:
            'eventDate',
        },
        {
          key: 'status',
          labelKey:
            'status',
          options:
            statusOptions,
        },
        {
          key: 'venue',
          labelKey:
            'venueFa',
          faKey: 'venue_fa',
          enKey: 'venue_en',
        },
        {
          key: 'capacity',
          labelKey:
            'capacity',
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
          key: 'category',
          labelKey:
            'category',
          type: 'text',
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
          key: 'event_date',
          labelKey:
            'eventDate',
          type: 'datetime',
          required: true,
        },
        {
          key:
            'registration_deadline',
          labelKey:
            'registrationDeadline',
          type: 'datetime',
        },
        {
          key: 'venue_fa',
          labelKey:
            'venueFa',
          type: 'text',
        },
        {
          key: 'venue_en',
          labelKey:
            'venueEn',
          type: 'text',
        },
        {
          key:
            'organizer_fa',
          labelKey:
            'organizerFa',
          type: 'text',
        },
        {
          key:
            'organizer_en',
          labelKey:
            'organizerEn',
          type: 'text',
        },
        {
          key: 'capacity',
          labelKey:
            'capacity',
          type: 'number',
        },
        {
          key:
            'registration_url',
          labelKey:
            'registrationUrl',
          type: 'url',
        },
        {
          key: 'map_url',
          labelKey:
            'mapUrl',
          type: 'url',
        },
        {
          key:
            'banner_image',
          labelKey:
            'eventImage',
          type: 'file',
          full: true,
        },
        {
          key:
            'description_fa',
          labelKey:
            'descriptionFa',
          type: 'textarea',
          rows: 6,
          full: true,
        },
        {
          key:
            'description_en',
          labelKey:
            'descriptionEn',
          type: 'textarea',
          rows: 6,
          full: true,
        },
      ]}
      searchFields={[
        'title_fa',
        'title_en',
        'description_fa',
        'description_en',
        'category',
        'venue_fa',
        'venue_en',
        'organizer_fa',
        'organizer_en',
        'status',
      ]}
      defaultValues={{
        title_fa: '',
        title_en: '',
        description_fa: '',
        description_en: '',
        banner_image: '',
        category: '',
        event_date: '',
        venue_fa: '',
        venue_en: '',
        organizer_fa: '',
        organizer_en: '',
        capacity: '',
        registration_deadline:
          '',
        registration_url: '',
        map_url: '',
        status: 'upcoming',
      }}
    />
  );
}
