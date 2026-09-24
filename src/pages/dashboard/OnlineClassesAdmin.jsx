import {
  useMemo,
  useState,
} from 'react';

import {
  useQuery,
} from '@tanstack/react-query';

import {
  CalendarClock,
  ClipboardCheck,
} from 'lucide-react';

import {
  djangoApi,
} from '@/api/djangoApi';
import EntityManager from '@/components/dashboard/EntityManager';
import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


function adminApi(api) {
  return {
    list: api.adminList,
    create: api.create,
    update: api.update,
    remove: api.remove,
  };
}


function option(value, label) {
  return {
    value: String(value),
    label,
  };
}


function toLocalInput(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(
    date.getTime()
  )) {
    return value;
  }

  /** @type {Record<string, string>} */
  const parts = {};

  new Intl.DateTimeFormat(
      'en-CA',
      {
        timeZone: 'Asia/Tehran',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }
    )
    .formatToParts(date)
    .forEach((item) => {
      parts[item.type] =
        item.value;
    });

  return (
    `${parts.year}-` +
    `${parts.month}-` +
    `${parts.day}T` +
    `${parts.hour}:` +
    `${parts.minute}`
  );
}


const sessionApi =
  adminApi(
    djangoApi.onlineSessions
  );
const attendanceApi = {
  list:
    djangoApi.sessionAttendance
      .adminList,
  update:
    djangoApi.sessionAttendance
      .update,
};


export default function OnlineClassesAdmin() {
  const { t } =
    useDashboardLanguage();
  const [tab, setTab] =
    useState('onlineSessions');

  const assignmentsQuery = useQuery({
    queryKey: [
      'dashboard',
      'teaching-assignments',
    ],
    queryFn: () =>
      djangoApi.teachingAssignments
        .adminList(),
  });

  const assignments =
    /** @type {any[]} */ (
      assignmentsQuery.data || []
    );
  const activeAssignments =
    assignments.filter(
      (item) => item.is_active
    );

  const assignmentOptions =
    useMemo(
      () => assignments
        .filter(
          (item) => item.is_active
        )
        .map(
          (item) => option(
            item.id,
            item.display_name
          )
        ),
      [assignments]
    );

  if (assignmentsQuery.isLoading) {
    return (
      <div className="mcoe-admin-page">
        <div
          className="neu-inset"
          style={{
            padding: 28,
            textAlign: 'center',
          }}
        >
          {t('loading')}
        </div>
      </div>
    );
  }

  if (assignmentsQuery.error) {
    return (
      <div className="mcoe-admin-page">
        <div
          className="neu-inset"
          style={{
            padding: 20,
            color: '#9f3541',
          }}
        >
          {assignmentsQuery.error
            .message ||
            t('requestFailed')}
        </div>
      </div>
    );
  }

  const sessionStatusOptions = [
    option('draft', t('draft')),
    option(
      'scheduled',
      t('scheduled')
    ),
    option('live', t('live')),
    option('ended', t('ended')),
    option(
      'cancelled',
      t('cancelled')
    ),
  ];
  const attendanceStatusOptions = [
    option(
      'expected',
      t('expected')
    ),
    option(
      'present',
      t('present')
    ),
    option('absent', t('absent')),
    option('excused', t('excused')),
  ];

  return (
    <div>
      <div
        className="neu-inset"
        style={{
          margin:
            'clamp(12px, 3vw, 24px) auto 14px',
          maxWidth: 1152,
          padding: '12px 15px',
          fontSize: 12,
          lineHeight: 1.8,
          color: '#6e6e6e',
        }}
      >
        {t('providerPendingNotice')}
      </div>

      <div className="mcoe-admin-tabs">
        <button
          type="button"
          className={
            tab === 'onlineSessions'
              ? 'is-active'
              : ''
          }
          onClick={() =>
            setTab('onlineSessions')
          }
        >
          <CalendarClock
            style={{
              width: 15,
              height: 15,
            }}
          />
          {t('onlineSessions')}
        </button>

        <button
          type="button"
          className={
            tab === 'sessionAttendance'
              ? 'is-active'
              : ''
          }
          onClick={() =>
            setTab(
              'sessionAttendance'
            )
          }
        >
          <ClipboardCheck
            style={{
              width: 15,
              height: 15,
            }}
          />
          {t('sessionAttendance')}
        </button>
      </div>

      {tab === 'onlineSessions' && (
        <EntityManager
          queryKey={[
            'dashboard',
            'online-sessions',
          ]}
          title={t('onlineClasses')}
          description={t(
            'onlineClassesIntro'
          )}
          api={sessionApi}
          getUpdateKey={(record) =>
            record.id
          }
          allowDelete={false}
          columns={[
            {
              key: 'title',
              labelKey: 'sessionTitle',
            },
            {
              key: 'classroom_name',
              labelKey: 'classroom',
            },
            {
              key: 'subject_name',
              labelKey: 'subject',
            },
            {
              key: 'teacher_name',
              labelKey: 'teacherName',
            },
            {
              key: 'starts_at',
              labelKey: 'startsAt',
              type: 'datetime',
              timeZone:
                'Asia/Tehran',
            },
            {
              key: 'status',
              labelKey: 'status',
              options:
                sessionStatusOptions,
            },
            {
              key: 'roster_count',
              labelKey: 'rosterCount',
            },
            {
              key: 'provider_key',
              labelKey: 'meetingProvider',
              options: [
                option(
                  'unconfigured',
                  t('notConnected')
                ),
              ],
            },
          ]}
          formFields={[
            {
              key: 'assignment',
              labelKey:
                'teachingAssignment',
              type: 'select',
              options:
                assignmentOptions,
              required: true,
              full: true,
            },
            {
              key: 'title',
              labelKey: 'sessionTitle',
              type: 'text',
              required: true,
              full: true,
            },
            {
              key: 'starts_at',
              labelKey: 'startsAt',
              type: 'datetime',
              required: true,
            },
            {
              key: 'duration_minutes',
              labelKey:
                'durationMinutes',
              type: 'number',
              required: true,
            },
            {
              key: 'join_window_minutes',
              labelKey:
                'joinWindowMinutes',
              type: 'number',
              required: true,
            },
            {
              key: 'status',
              labelKey: 'status',
              type: 'select',
              options:
                sessionStatusOptions,
              required: true,
            },
            {
              key: 'allow_recording',
              labelKey:
                'allowRecording',
              type: 'checkbox',
            },
            {
              key: 'recording_url',
              labelKey: 'recordingUrl',
              type: 'url',
              full: true,
            },
            {
              key: 'notes',
              labelKey: 'notes',
              type: 'textarea',
              full: true,
            },
          ]}
          searchFields={[
            'title',
            'classroom_name',
            'subject_name',
            'teacher_name',
            'status_label',
          ]}
          prepareRecordForForm={(
            record
          ) => ({
            ...record,
            assignment: String(
              record.assignment
            ),
            starts_at:
              toLocalInput(
                record.starts_at
              ),
          })}
          preparePayload={(payload) => ({
            ...payload,
            starts_at:
              payload.starts_at
                ? new Date(
                    `${payload.starts_at}:00+03:30`
                  ).toISOString()
                : '',
          })}
          defaultValues={{
            assignment:
              activeAssignments[0]
                ? String(
                    activeAssignments[0].id
                  )
                : '',
            title: '',
            starts_at: '',
            duration_minutes: 60,
            join_window_minutes: 15,
            status: 'draft',
            allow_recording: true,
            recording_url: '',
            notes: '',
          }}
        />
      )}

      {tab ===
        'sessionAttendance' && (
        <EntityManager
          queryKey={[
            'dashboard',
            'session-attendance',
          ]}
          title={t(
            'sessionAttendance'
          )}
          description={t(
            'sessionAttendanceIntro'
          )}
          api={attendanceApi}
          getUpdateKey={(record) =>
            record.id
          }
          allowCreate={false}
          allowDelete={false}
          columns={[
            {
              key: 'session_title',
              labelKey: 'sessionTitle',
            },
            {
              key: 'student_name',
              labelKey: 'studentName',
            },
            {
              key: 'classroom_name',
              labelKey: 'classroom',
            },
            {
              key: 'status',
              labelKey:
                'attendanceStatus',
              options:
                attendanceStatusOptions,
            },
            {
              key: 'attended_minutes',
              labelKey:
                'attendedMinutes',
            },
          ]}
          formFields={[
            {
              key: 'status',
              labelKey:
                'attendanceStatus',
              type: 'select',
              options:
                attendanceStatusOptions,
              required: true,
            },
          ]}
          searchFields={[
            'session_title',
            'student_name',
            'national_code',
            'classroom_name',
          ]}
          defaultValues={{
            status: 'expected',
          }}
        />
      )}
    </div>
  );
}
