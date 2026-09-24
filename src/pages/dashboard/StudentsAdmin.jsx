import {
  useMemo,
  useState,
} from 'react';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Loader2,
  School,
  Upload,
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


const studentApi =
  adminApi(djangoApi.students);
const classroomApi =
  adminApi(djangoApi.classrooms);
const enrollmentApi =
  adminApi(djangoApi.enrollments);


function option(value, label) {
  return {
    value: String(value),
    label,
  };
}


function ImportPanel({
  years,
}) {
  const { t } =
    useDashboardLanguage();
  const queryClient =
    useQueryClient();
  const activeYear =
    years.find(
      (item) => item.is_active
    ) || years[0];
  const [academicYear, setAcademicYear] =
    useState(
      activeYear
        ? String(activeYear.id)
        : ''
    );
  const [files, setFiles] =
    useState([]);
  const [report, setReport] =
    useState(null);


  /**
   * @param {{ commit: boolean }} variables
   */
  const submitImport = ({
    commit,
  }) =>
    djangoApi.studentImport.submit({
      files,
      academicYear,
      commit,
    });


  const mutation = useMutation({
    mutationFn: submitImport,

    onSuccess: async (
      data,
      variables
    ) => {
      setReport(data);

      if (variables.commit) {
        await queryClient
          .invalidateQueries({
            queryKey: [
              'dashboard',
            ],
          });
      }
    },
  });


  const canPreview =
    files.length > 0 &&
    Boolean(academicYear) &&
    !mutation.isPending;


  return (
    <div className="mcoe-admin-page">
      <div
        className="neu-raised"
        style={{
          padding: 22,
          display: 'grid',
          gap: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            className="neu-inset-sm"
            style={{
              width: 44,
              height: 44,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 12,
            }}
          >
            <FileSpreadsheet
              style={{
                width: 20,
                height: 20,
              }}
            />
          </span>

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 18,
              }}
            >
              {t('studentImport')}
            </h2>
            <p
              style={{
                margin: '5px 0 0',
                fontSize: 12,
                opacity: 0.68,
              }}
            >
              {t('studentImportIntro')}
            </p>
          </div>
        </div>

        <div className="mcoe-admin-form-grid">
          <label
            style={{
              display: 'grid',
              gap: 8,
              fontSize: 12,
            }}
          >
            <span>{t('academicYear')}</span>
            <select
              value={academicYear}
              onChange={(event) => {
                setAcademicYear(
                  event.target.value
                );
                setReport(null);
              }}
              className="neu-inset-sm"
              style={inputStyle}
            >
              {years.map((year) => (
                <option
                  key={year.id}
                  value={year.id}
                >
                  {year.title}
                </option>
              ))}
            </select>
          </label>

          <label
            style={{
              display: 'grid',
              gap: 8,
              fontSize: 12,
            }}
          >
            <span>{t('excelFiles')}</span>
            <span
              className="neu-inset-sm"
              style={{
                ...inputStyle,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 9,
              }}
            >
              <Upload
                style={{
                  width: 16,
                  height: 16,
                }}
              />
              <span>
                {files.length
                  ? `${files.length} ${t('selectedFiles')}`
                  : t('chooseExcelFiles')}
              </span>
              <input
                type="file"
                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                multiple
                hidden
                onChange={(event) => {
                  setFiles(
                    Array.from(
                      event.target.files || []
                    )
                  );
                  setReport(null);
                }}
              />
            </span>
          </label>
        </div>

        {files.length > 0 && (
          <div
            className="neu-inset-sm"
            style={{
              padding: 12,
              display: 'grid',
              gap: 5,
              fontSize: 11,
            }}
          >
            {files.map((file) => (
              <span key={file.name}>
                {file.name}
              </span>
            ))}
          </div>
        )}

        {mutation.error && (
          <div
            className="neu-inset-sm"
            style={{
              padding: 12,
              color: '#9f3541',
              fontSize: 12,
            }}
          >
            {mutation.error.message ||
              t('requestFailed')}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            gap: 10,
          }}
        >
          <button
            type="button"
            className="btn-neu"
            disabled={!canPreview}
            onClick={() =>
              mutation.mutate({
                commit: false,
              })
            }
            style={buttonStyle}
          >
            {mutation.isPending && (
              <Loader2
                className="animate-spin"
                style={iconStyle}
              />
            )}
            {t('previewImport')}
          </button>

          <button
            type="button"
            className="btn-dark-neu"
            disabled={
              !report?.ready_to_commit ||
              mutation.isPending ||
              Boolean(report?.commit)
            }
            onClick={() =>
              mutation.mutate({
                commit: true,
              })
            }
            style={buttonStyle}
          >
            {t('commitImport')}
          </button>
        </div>
      </div>

      {report && (
        <ImportReport
          report={report}
        />
      )}
    </div>
  );
}


function ImportReport({
  report,
}) {
  const { t } =
    useDashboardLanguage();
  const cards = [
    [
      'sourceRows',
      report.source_rows,
    ],
    [
      'uniqueStudents',
      report.unique_students,
    ],
    [
      'duplicateRows',
      report.duplicate_rows,
    ],
    [
      'missingClass',
      report.missing_class,
    ],
    [
      'missingSms',
      report.missing_sms_mobile,
    ],
  ];


  return (
    <div
      className="neu-raised"
      style={{
        padding: 22,
        marginTop: 18,
        display: 'grid',
        gap: 18,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
        }}
      >
        {report.ready_to_commit ? (
          <CheckCircle2
            style={{
              color: '#2e7d32',
              ...iconStyle,
            }}
          />
        ) : (
          <AlertTriangle
            style={{
              color: '#b26a20',
              ...iconStyle,
            }}
          />
        )}
        <strong>
          {report.commit
            ? t('importCompleted')
            : report.ready_to_commit
              ? t('importReady')
              : t('importHasErrors')}
        </strong>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(125px, 1fr))',
          gap: 10,
        }}
      >
        {cards.map(([key, value]) => (
          <div
            key={key}
            className="neu-inset-sm"
            style={{
              padding: 13,
              display: 'grid',
              gap: 5,
            }}
          >
            <span
              style={{
                fontSize: 11,
                opacity: 0.66,
              }}
            >
              {t(key)}
            </span>
            <strong
              style={{
                fontSize: 20,
              }}
            >
              {value ?? 0}
            </strong>
          </div>
        ))}
      </div>

      <div
        className="neu-inset-sm"
        style={{
          padding: 14,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        {Object.entries(
          report.grade_counts || {}
        ).map(([grade, count]) => (
          <span
            key={grade}
            className="mcoe-admin-badge"
          >
            {grade}: {count}
          </span>
        ))}
      </div>

      {report.commit && (
        <div
          className="neu-inset-sm"
          style={{
            padding: 14,
            fontSize: 12,
            lineHeight: 1.9,
          }}
        >
          {t('createdStudents')}:{' '}
          {report.commit.students_created}
          {' · '}
          {t('updatedStudents')}:{' '}
          {report.commit.students_updated}
          {' · '}
          {t('createdEnrollments')}:{' '}
          {report.commit.enrollments_created}
        </div>
      )}

      {[
        ['errors', report.errors],
        ['warnings', report.warnings],
      ].map(([title, entries]) =>
        entries?.length ? (
          <div
            key={title}
            className="neu-inset-sm"
            style={{
              padding: 14,
              display: 'grid',
              gap: 7,
              fontSize: 11,
            }}
          >
            <strong>{t(title)}</strong>
            {entries.map((entry, index) => (
              <span
                key={`${entry.filename}-${entry.row}-${index}`}
              >
                {entry.filename} — {t('row')} {entry.row}
                {entry.masked_code
                  ? ` — ${entry.masked_code}`
                  : ''}
                {' — '}
                {entry.message}
              </span>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
}


export default function StudentsAdmin() {
  const { t } =
    useDashboardLanguage();
  const [tab, setTab] =
    useState('students');

  const yearsQuery = useQuery({
    queryKey: [
      'dashboard',
      'academic-years',
    ],
    queryFn: () =>
      djangoApi.academicYears
        .adminList(),
  });
  const gradesQuery = useQuery({
    queryKey: [
      'dashboard',
      'grades',
    ],
    queryFn: () =>
      djangoApi.grades
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
  const studentsQuery = useQuery({
    queryKey: [
      'dashboard',
      'students',
    ],
    queryFn: () =>
      djangoApi.students
        .adminList(),
  });

  const years =
    /** @type {any[]} */ (
      yearsQuery.data || []
    );
  const grades =
    /** @type {any[]} */ (
      gradesQuery.data || []
    );
  const classrooms =
    /** @type {any[]} */ (
      classroomsQuery.data || []
    );
  const students =
    /** @type {any[]} */ (
      studentsQuery.data || []
    );
  const activeYear =
    years.find(
      (item) => item.is_active
    ) || years[0];

  const yearOptions =
    useMemo(
      () => years.map(
        (item) =>
          option(
            item.id,
            item.title
          )
      ),
      [years]
    );
  const gradeOptions =
    useMemo(
      () => grades.map(
        (item) =>
          option(
            item.id,
            item.name_fa
          )
      ),
      [grades]
    );
  const classroomOptions =
    useMemo(
      () => [
        option('', t('unassigned')),
        ...classrooms.map(
          (item) =>
            option(
              item.id,
              `${item.name} — ${item.grade_name}`
            )
        ),
      ],
      [classrooms, t]
    );
  const studentOptions =
    useMemo(
      () => students.map(
        (item) =>
          option(
            item.id,
            `${item.full_name} — ${item.national_code}`
          )
      ),
      [students]
    );

  const loading =
    yearsQuery.isLoading ||
    gradesQuery.isLoading ||
    classroomsQuery.isLoading ||
    studentsQuery.isLoading;
  const loadError =
    yearsQuery.error ||
    gradesQuery.error ||
    classroomsQuery.error ||
    studentsQuery.error;


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
          <Loader2
            className="animate-spin"
            style={{
              width: 22,
              height: 22,
              margin: '0 auto',
            }}
          />
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
      key: 'students',
      Icon: UsersRound,
    },
    {
      key: 'classes',
      Icon: School,
    },
    {
      key: 'enrollments',
      Icon: CheckCircle2,
    },
    {
      key: 'studentImport',
      Icon: FileSpreadsheet,
    },
  ];


  return (
    <div>
      <div className="mcoe-admin-tabs">
        {tabs.map(
          ({
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
          )
        )}
      </div>

      {tab === 'students' && (
        <EntityManager
          queryKey={[
            'dashboard',
            'students',
          ]}
          title={t('students')}
          description={t(
            'studentsIntro'
          )}
          api={studentApi}
          getUpdateKey={(record) =>
            record.id
          }
          allowDelete={false}
          columns={[
            {
              key: 'full_name',
              labelKey: 'studentName',
            },
            {
              key: 'national_code',
              labelKey: 'nationalCode',
            },
            {
              key: 'current_grade',
              labelKey: 'grade',
            },
            {
              key: 'current_classroom',
              labelKey: 'classroom',
            },
            {
              key: 'sms_mobile',
              labelKey: 'smsMobile',
            },
            {
              key: 'portal_enabled',
              labelKey: 'portalAccess',
              type: 'boolean',
            },
          ]}
          formFields={[
            {
              key: 'national_code',
              labelKey: 'nationalCode',
              type: 'text',
              required: true,
            },
            {
              key: 'birth_date_jalali',
              labelKey: 'birthDateJalali',
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
              key: 'father_name',
              labelKey: 'fatherName',
              type: 'text',
            },
            {
              key: 'gender',
              labelKey: 'gender',
              type: 'select',
              options: [
                option(
                  'female',
                  t('female')
                ),
                option(
                  'male',
                  t('male')
                ),
                option(
                  'unspecified',
                  t('unspecified')
                ),
              ],
            },
            {
              key: 'primary_mobile',
              labelKey: 'primaryMobile',
              type: 'text',
            },
            {
              key: 'sms_mobile',
              labelKey: 'smsMobile',
              type: 'text',
            },
            {
              key: 'home_phone',
              labelKey: 'homePhone',
              type: 'text',
            },
            {
              key: 'postal_code',
              labelKey: 'postalCode',
              type: 'text',
            },
            {
              key: 'address',
              labelKey: 'address',
              type: 'textarea',
              full: true,
            },
            {
              key: 'portal_enabled',
              labelKey: 'portalAccess',
              type: 'checkbox',
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'checkbox',
            },
          ]}
          searchFields={[
            'first_name',
            'last_name',
            'national_code',
            'primary_mobile',
            'sms_mobile',
            'current_grade',
            'current_classroom',
          ]}
          defaultValues={{
            national_code: '',
            first_name: '',
            last_name: '',
            father_name: '',
            gender: 'female',
            birth_date_jalali: '',
            primary_mobile: '',
            sms_mobile: '',
            home_phone: '',
            postal_code: '',
            address: '',
            portal_enabled: false,
            is_active: true,
          }}
        />
      )}

      {tab === 'classes' && (
        <EntityManager
          queryKey={[
            'dashboard',
            'classrooms',
          ]}
          title={t('classes')}
          description={t(
            'classesIntro'
          )}
          api={classroomApi}
          getUpdateKey={(record) =>
            record.id
          }
          columns={[
            {
              key: 'name',
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
              key: 'student_count',
              labelKey: 'studentCount',
            },
            {
              key: 'capacity',
              labelKey: 'capacity',
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
              key: 'grade',
              labelKey: 'grade',
              type: 'select',
              options: gradeOptions,
              required: true,
            },
            {
              key: 'name',
              labelKey: 'classroom',
              type: 'text',
              required: true,
            },
            {
              key: 'capacity',
              labelKey: 'capacity',
              type: 'number',
            },
            {
              key: 'is_active',
              labelKey: 'active',
              type: 'checkbox',
            },
          ]}
          searchFields={[
            'name',
            'grade_name',
            'academic_year_title',
          ]}
          defaultValues={{
            academic_year:
              activeYear
                ? String(activeYear.id)
                : '',
            grade:
              grades[0]
                ? String(grades[0].id)
                : '',
            name: '',
            capacity: '',
            is_active: true,
          }}
        />
      )}

      {tab === 'enrollments' && (
        <EntityManager
          queryKey={[
            'dashboard',
            'enrollments',
          ]}
          title={t('enrollments')}
          description={t(
            'enrollmentsIntro'
          )}
          api={enrollmentApi}
          getUpdateKey={(record) =>
            record.id
          }
          columns={[
            {
              key: 'student_name',
              labelKey: 'studentName',
            },
            {
              key: 'national_code',
              labelKey: 'nationalCode',
            },
            {
              key: 'grade_name',
              labelKey: 'grade',
            },
            {
              key: 'classroom_name',
              labelKey: 'classroom',
            },
            {
              key: 'academic_year_title',
              labelKey: 'academicYear',
            },
            {
              key: 'status',
              labelKey: 'status',
              options: [
                option(
                  'active',
                  t('active')
                ),
                option(
                  'inactive',
                  t('inactive')
                ),
                option(
                  'transferred',
                  t('transferred')
                ),
                option(
                  'graduated',
                  t('graduated')
                ),
              ],
            },
          ]}
          formFields={[
            {
              key: 'student',
              labelKey: 'studentName',
              type: 'select',
              options: studentOptions,
              required: true,
              full: true,
            },
            {
              key: 'academic_year',
              labelKey: 'academicYear',
              type: 'select',
              options: yearOptions,
              required: true,
            },
            {
              key: 'grade',
              labelKey: 'grade',
              type: 'select',
              options: gradeOptions,
              required: true,
            },
            {
              key: 'classroom',
              labelKey: 'classroom',
              type: 'select',
              options: classroomOptions,
            },
            {
              key: 'status',
              labelKey: 'status',
              type: 'select',
              options: [
                option(
                  'active',
                  t('active')
                ),
                option(
                  'inactive',
                  t('inactive')
                ),
                option(
                  'transferred',
                  t('transferred')
                ),
                option(
                  'graduated',
                  t('graduated')
                ),
              ],
            },
          ]}
          searchFields={[
            'student_name',
            'national_code',
            'grade_name',
            'classroom_name',
          ]}
          defaultValues={{
            student:
              students[0]
                ? String(students[0].id)
                : '',
            academic_year:
              activeYear
                ? String(activeYear.id)
                : '',
            grade:
              grades[0]
                ? String(grades[0].id)
                : '',
            classroom: '',
            status: 'active',
          }}
        />
      )}

      {tab === 'studentImport' && (
        <ImportPanel
          years={years}
        />
      )}
    </div>
  );
}


const inputStyle = {
  border: 'none',
  borderRadius: 10,
  padding: '11px 13px',
  fontFamily: 'inherit',
  fontSize: 12,
  color: 'inherit',
  background: 'transparent',
  outline: 'none',
  width: '100%',
};


const buttonStyle = {
  border: 'none',
  padding: '10px 17px',
  borderRadius: 10,
  fontFamily: 'inherit',
  fontSize: 12,
  fontWeight: 700,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
};


const iconStyle = {
  width: 17,
  height: 17,
};
