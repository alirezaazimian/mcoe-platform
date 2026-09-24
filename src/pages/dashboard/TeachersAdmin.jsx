import {
  useMemo,
  useState,
} from 'react';

import {
  useQuery,
} from '@tanstack/react-query';

import {
  BookOpen,
  Presentation,
  UsersRound,
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


const teacherApi =
  adminApi(djangoApi.teachers);
const subjectApi =
  adminApi(djangoApi.subjects);
const assignmentApi =
  adminApi(
    djangoApi.teachingAssignments
  );


export default function TeachersAdmin() {
  const { t } =
    useDashboardLanguage();
  const [tab, setTab] =
    useState('teachers');

  const yearsQuery = useQuery({
    queryKey: [
      'dashboard',
      'academic-years',
    ],
    queryFn: () =>
      djangoApi.academicYears
        .adminList(),
  });
  const classroomsQuery = useQuery({
    queryKey: [
      'dashboard',
      'classrooms',
    ],
    queryFn: () =>
      djangoApi.classrooms
        .adminList(),
  });
  const teachersQuery = useQuery({
    queryKey: [
      'dashboard',
      'teachers',
    ],
    queryFn: () =>
      djangoApi.teachers
        .adminList(),
  });
  const subjectsQuery = useQuery({
    queryKey: [
      'dashboard',
      'subjects',
    ],
    queryFn: () =>
      djangoApi.subjects
        .adminList(),
  });

  const years =
    /** @type {any[]} */ (
      yearsQuery.data || []
    );
  const classrooms =
    /** @type {any[]} */ (
      classroomsQuery.data || []
    );
  const teachers =
    /** @type {any[]} */ (
      teachersQuery.data || []
    );
  const subjects =
    /** @type {any[]} */ (
      subjectsQuery.data || []
    );
  const activeYear =
    years.find(
      (item) => item.is_active
    ) || years[0];

  const yearOptions = useMemo(
    () => years.map(
      (item) => option(
        item.id,
        item.title
      )
    ),
    [years]
  );
  const classroomOptions = useMemo(
    () => classrooms.map(
      (item) => option(
        item.id,
        `${item.name} — ${item.grade_name} — ${item.academic_year_title}`
      )
    ),
    [classrooms]
  );
  const teacherOptions = useMemo(
    () => teachers
      .filter(
        (item) => item.is_active
      )
      .map(
        (item) => option(
          item.id,
          item.full_name
        )
      ),
    [teachers]
  );
  const subjectOptions = useMemo(
    () => subjects
      .filter(
        (item) => item.is_active
      )
      .map(
        (item) => option(
          item.id,
          item.name_fa
        )
      ),
    [subjects]
  );
  const activeTeachers =
    teachers.filter(
      (item) => item.is_active
    );
  const activeSubjects =
    subjects.filter(
      (item) => item.is_active
    );

  const loading =
    yearsQuery.isLoading ||
    classroomsQuery.isLoading ||
    teachersQuery.isLoading ||
    subjectsQuery.isLoading;
  const loadError =
    yearsQuery.error ||
    classroomsQuery.error ||
    teachersQuery.error ||
    subjectsQuery.error;

  if (loading) {
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

  if (loadError) {
    return (
      <div className="mcoe-admin-page">
        <div
          className="neu-inset"
          style={{
            padding: 20,
            color: '#9f3541',
          }}
        >
          {loadError.message ||
            t('requestFailed')}
        </div>
      </div>
    );
  }

  const tabs = [
    {
      key: 'teachers',
      Icon: UsersRound,
    },
    {
      key: 'subjects',
      Icon: BookOpen,
    },
    {
      key: 'teachingAssignments',
      Icon: Presentation,
    },
  ];

  return (
    <div>
      <div className="mcoe-admin-tabs">
        {tabs.map(({
          key,
          Icon,
        }) => (
          <button
            key={key}
            type="button"
            className={
              tab === key
                ? 'is-active'
                : ''
            }
            onClick={() =>
              setTab(key)
            }
          >
            <Icon
              style={{
                width: 15,
                height: 15,
              }}
            />
            {t(key)}
          </button>
        ))}
      </div>

      {tab === 'teachers' && (
        <EntityManager
          queryKey={[
            'dashboard',
            'teachers',
          ]}
          title={t('teachers')}
          description={t(
            'teachersIntro'
          )}
          api={teacherApi}
          getUpdateKey={(record) =>
            record.id
          }
          allowDelete={false}
          columns={[
            {
              key: 'full_name',
              labelKey: 'teacherName',
            },
            {
              key: 'personnel_code',
              labelKey: 'personnelCode',
            },
            {
              key: 'mobile',
              labelKey: 'primaryMobile',
            },
            {
              key: 'email',
              labelKey: 'email',
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'boolean',
            },
          ]}
          formFields={[
            {
              key: 'personnel_code',
              labelKey: 'personnelCode',
              type: 'text',
            },
            {
              key: 'first_name',
              labelKey: 'firstName',
              type: 'text',
              required: true,
            },
            {
              key: 'last_name',
              labelKey: 'lastName',
              type: 'text',
              required: true,
            },
            {
              key: 'mobile',
              labelKey: 'primaryMobile',
              type: 'text',
            },
            {
              key: 'email',
              labelKey: 'email',
              type: 'text',
            },
            {
              key: 'bio',
              labelKey: 'teacherBio',
              type: 'textarea',
              full: true,
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'checkbox',
            },
          ]}
          searchFields={[
            'full_name',
            'personnel_code',
            'mobile',
            'email',
          ]}
          defaultValues={{
            personnel_code: '',
            first_name: '',
            last_name: '',
            mobile: '',
            email: '',
            bio: '',
            is_active: true,
          }}
        />
      )}

      {tab === 'subjects' && (
        <EntityManager
          queryKey={[
            'dashboard',
            'subjects',
          ]}
          title={t('subjects')}
          description={t(
            'subjectsIntro'
          )}
          api={subjectApi}
          getUpdateKey={(record) =>
            record.id
          }
          allowDelete={false}
          columns={[
            {
              key: 'name_fa',
              labelKey: 'nameFa',
            },
            {
              key: 'name_en',
              labelKey: 'nameEn',
            },
            {
              key: 'code',
              labelKey: 'subjectCode',
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'boolean',
            },
          ]}
          formFields={[
            {
              key: 'code',
              labelKey: 'subjectCode',
              type: 'text',
              required: true,
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
              key: 'description',
              labelKey: 'descriptionFa',
              type: 'textarea',
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
            'name_fa',
            'name_en',
            'code',
          ]}
          defaultValues={{
            code: '',
            name_fa: '',
            name_en: '',
            description: '',
            sort_order: 0,
            is_active: true,
          }}
        />
      )}

      {tab ===
        'teachingAssignments' && (
        <EntityManager
          queryKey={[
            'dashboard',
            'teaching-assignments',
          ]}
          title={t(
            'teachingAssignments'
          )}
          description={t(
            'teachingAssignmentsIntro'
          )}
          api={assignmentApi}
          getUpdateKey={(record) =>
            record.id
          }
          allowDelete={false}
          columns={[
            {
              key: 'teacher_name',
              labelKey: 'teacherName',
            },
            {
              key: 'subject_name',
              labelKey: 'subject',
            },
            {
              key: 'classroom_name',
              labelKey: 'classroom',
            },
            {
              key: 'grade_name',
              labelKey: 'grade',
            },
            {
              key: 'academic_year_title',
              labelKey: 'academicYear',
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'boolean',
            },
          ]}
          formFields={[
            {
              key: 'academic_year',
              labelKey: 'academicYear',
              type: 'select',
              options: yearOptions,
              required: true,
            },
            {
              key: 'classroom',
              labelKey: 'classroom',
              type: 'select',
              options:
                classroomOptions,
              required: true,
            },
            {
              key: 'subject',
              labelKey: 'subject',
              type: 'select',
              options: subjectOptions,
              required: true,
            },
            {
              key: 'teacher',
              labelKey: 'teacherName',
              type: 'select',
              options: teacherOptions,
              required: true,
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'checkbox',
            },
          ]}
          searchFields={[
            'teacher_name',
            'subject_name',
            'classroom_name',
            'grade_name',
          ]}
          defaultValues={{
            academic_year:
              activeYear
                ? String(
                    activeYear.id
                  )
                : '',
            classroom:
              classrooms[0]
                ? String(
                    classrooms[0].id
                  )
                : '',
            subject:
              activeSubjects[0]
                ? String(
                    activeSubjects[0].id
                  )
                : '',
            teacher:
              activeTeachers[0]
                ? String(
                    activeTeachers[0].id
                  )
                : '',
            is_active: true,
          }}
        />
      )}
    </div>
  );
}
