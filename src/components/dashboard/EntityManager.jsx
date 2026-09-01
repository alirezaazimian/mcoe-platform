import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';

import Modal from './Modal';

import {
  useDashboardLanguage,
} from '@/lib/DashboardLanguageContext';


function FilePreview({
  value,
}) {
  const [
    objectUrl,
    setObjectUrl,
  ] = useState('');


  useEffect(() => {
    if (
      typeof File !==
        'undefined' &&
      value instanceof File
    ) {
      const url =
        URL.createObjectURL(
          value
        );

      setObjectUrl(url);

      return () => {
        URL.revokeObjectURL(
          url
        );
      };
    }

    setObjectUrl('');

    return undefined;
  }, [value]);


  const src =
    objectUrl ||
    (
      typeof value ===
      'string'
        ? value
        : ''
    );


  if (!src) {
    return null;
  }


  return (
    <img
      src={src}
      alt=""
      style={{
        width: 72,
        height: 72,
        borderRadius: 10,
        objectFit: 'cover',
        boxShadow:
          'var(--shadow-in-sm)',
      }}
    />
  );
}


export default function EntityManager({
  queryKey,
  title,
  description,
  columns,
  formFields,
  searchFields,
  defaultValues,
  api,
  getUpdateKey,
}) {
  const {
    t,
    lang,
  } = useDashboardLanguage();

  const queryClient =
    useQueryClient();

  const [
    search,
    setSearch,
  ] = useState('');

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [
    editing,
    setEditing,
  ] = useState(null);

  const [
    form,
    setForm,
  ] = useState(
    defaultValues
  );

  const [
    formError,
    setFormError,
  ] = useState('');


  const {
    data: records = [],
    isLoading,
    error: loadError,
  } = useQuery({
    queryKey,
    queryFn: api.list,
  });


  const refresh = () =>
    queryClient.invalidateQueries({
      queryKey,
    });


  const saveMutation =
    useMutation({
      mutationFn: async ({
        currentRecord,
        payload,
      }) => {
        if (currentRecord) {
          return api.update(
            getUpdateKey(
              currentRecord
            ),
            payload
          );
        }

        return api.create(
          payload
        );
      },

      onSuccess: async () => {
        await refresh();

        setModalOpen(false);
        setEditing(null);
        setForm(defaultValues);
        setFormError('');
      },

      onError: (error) => {
        setFormError(
          error?.message ||
          t('requestFailed')
        );
      },
    });


  const deleteMutation =
    useMutation({
      mutationFn: (record) =>
        api.remove(
          getUpdateKey(record)
        ),

      onSuccess: refresh,

      onError: (error) => {
        window.alert(
          error?.message ||
          t('requestFailed')
        );
      },
    });


  const filtered =
    useMemo(() => {
      const q =
        search
          .trim()
          .toLowerCase();

      if (!q) {
        return records;
      }

      return records.filter(
        (record) =>
          searchFields.some(
            (key) =>
              String(
                record[key] || ''
              )
                .toLowerCase()
                .includes(q)
          )
      );
    }, [
      records,
      search,
      searchFields,
    ]);


  const openAdd = () => {
    setEditing(null);
    setForm({
      ...defaultValues,
    });
    setFormError('');
    setModalOpen(true);
  };


  const openEdit = (
    record
  ) => {
    setEditing(record);

    setForm({
      ...defaultValues,
      ...record,
    });

    setFormError('');
    setModalOpen(true);
  };


  const setField = (
    key,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };


  const save = () => {
    const missing =
      formFields.filter(
        (field) =>
          field.required &&
          !String(
            form[field.key] ?? ''
          ).trim()
      );

    if (missing.length) {
      setFormError(
        t('requiredFields')
      );

      return;
    }

    saveMutation.mutate({
      currentRecord: editing,
      payload: form,
    });
  };


  const remove = (
    record
  ) => {
    if (
      !window.confirm(
        t('confirmDelete')
      )
    ) {
      return;
    }

    deleteMutation.mutate(
      record
    );
  };


  const localizedValue = (
    record,
    column
  ) => {
    if (
      column.faKey &&
      column.enKey
    ) {
      return lang === 'fa'
        ? (
            record[
              column.faKey
            ] ||
            record[
              column.enKey
            ]
          )
        : (
            record[
              column.enKey
            ] ||
            record[
              column.faKey
            ]
          );
    }

    return record[
      column.key
    ];
  };


  const renderCell = (
    record,
    column
  ) => {
    const value =
      localizedValue(
        record,
        column
      );

    if (
      column.type === 'image'
    ) {
      return value
        ? (
            <img
              src={value}
              alt=""
              style={{
                width: 40,
                height: 40,
                borderRadius: 9,
                objectFit:
                  'cover',
              }}
            />
          )
        : (
            <span
              style={{
                color:
                  '#b3b3b3',
              }}
            >
              —
            </span>
          );
    }

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return (
        <span
          style={{
            color:
              '#b3b3b3',
          }}
        >
          —
        </span>
      );
    }

    return (
      <span
        style={{
          fontSize: 13,
          color: '#3a3a3a',
        }}
      >
        {String(value)}
      </span>
    );
  };


  const renderField = (
    field
  ) => {
    const value =
      form[field.key] ??
      (
        field.type ===
        'number'
          ? ''
          : ''
      );

    const label =
      t(field.labelKey);

    if (
      field.type ===
      'textarea'
    ) {
      return (
        <FieldWrap
          label={label}
          required={
            field.required
          }
        >
          <textarea
            value={value}
            rows={4}
            onChange={(
              event
            ) =>
              setField(
                field.key,
                event.target.value
              )
            }
            style={{
              ...fieldStyle,
              resize:
                'vertical',
            }}
            placeholder={label}
          />
        </FieldWrap>
      );
    }


    if (
      field.type ===
      'file'
    ) {
      return (
        <FieldWrap
          label={label}
          required={
            field.required
          }
        >
          <div
            style={{
              display: 'flex',
              alignItems:
                'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <FilePreview
              value={value}
            />

            <label
              className="btn-neu"
              style={{
                display:
                  'inline-flex',
                alignItems:
                  'center',
                gap: 8,
                padding:
                  '10px 14px',
                fontSize: 12,
                fontWeight: 600,
                color: '#3a3a3a',
                cursor: 'pointer',
              }}
            >
              <ImagePlus
                style={{
                  width: 14,
                  height: 14,
                }}
              />

              {value
                ? t(
                    'replaceImage'
                  )
                : t(
                    'chooseImage'
                  )}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(
                  event
                ) => {
                  const file =
                    event
                      .target
                      .files?.[0];

                  if (file) {
                    setField(
                      field.key,
                      file
                    );
                  }
                }}
              />
            </label>
          </div>
        </FieldWrap>
      );
    }


    return (
      <FieldWrap
        label={label}
        required={
          field.required
        }
      >
        <input
          type={
            field.type ===
            'number'
              ? 'number'
              : 'text'
          }
          value={value}
          onChange={(
            event
          ) => {
            const nextValue =
              field.type ===
              'number'
                ? (
                    event
                      .target
                      .value === ''
                      ? ''
                      : Number(
                          event
                            .target
                            .value
                        )
                  )
                : event
                    .target
                    .value;

            setField(
              field.key,
              nextValue
            );
          }}
          style={fieldStyle}
          placeholder={label}
        />
      </FieldWrap>
    );
  };


  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding:
          'clamp(12px, 3vw, 24px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems:
            'flex-start',
          justifyContent:
            'space-between',
          gap: 16,
          marginBottom: 18,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 600,
              color: '#2e2a26',
            }}
          >
            {title}
          </h1>

          {description && (
            <p
              style={{
                margin:
                  '6px 0 0',
                color: '#6e6e6e',
                fontSize: 12,
              }}
            >
              {description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="btn-dark-neu"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding:
              '10px 15px',
            fontSize: 12,
            fontWeight: 650,
          }}
        >
          <Plus
            style={{
              width: 15,
              height: 15,
            }}
          />

          {t('addNew')}
        </button>
      </div>


      <div
        className="neu-inset-sm"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
          padding:
            '8px 12px',
          maxWidth: 420,
        }}
      >
        <Search
          style={{
            width: 15,
            height: 15,
            color: '#9a9a9a',
          }}
        />

        <input
          value={search}
          onChange={(
            event
          ) =>
            setSearch(
              event.target.value
            )
          }
          placeholder={t('search')}
          style={{
            flex: 1,
            minWidth: 0,
            border: 0,
            outline: 0,
            background:
              'transparent',
            fontFamily:
              'inherit',
            fontSize: 12,
            color: '#3a3a3a',
          }}
        />
      </div>


      {loadError ? (
        <div
          className="neu-inset"
          style={{
            padding: 28,
            color: '#6a514d',
            fontSize: 13,
          }}
        >
          {loadError.message ||
            t(
              'requestFailed'
            )}
        </div>
      ) : isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent:
              'center',
            padding: 60,
          }}
        >
          <Loader2
            className="animate-spin"
            style={{
              width: 28,
              height: 28,
              color: '#9a9a9a',
            }}
          />
        </div>
      ) : filtered.length ===
        0 ? (
        <div
          className="neu-inset"
          style={{
            padding: 40,
            textAlign: 'center',
            color: '#9a9a9a',
            fontSize: 14,
          }}
        >
          {t('noRecords')}
        </div>
      ) : (
        <>
          <div
            className="neu-raised hidden md:block"
            style={{
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                overflowX: 'auto',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse:
                    'collapse',
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom:
                        '1px solid #d9d3cc',
                    }}
                  >
                    {columns.map(
                      (column) => (
                        <th
                          key={
                            column.key
                          }
                          style={{
                            textAlign:
                              'start',
                            padding:
                              '14px 16px',
                            fontSize: 11,
                            fontWeight:
                              600,
                            letterSpacing:
                              '0.06em',
                            color:
                              '#6e6e6e',
                            whiteSpace:
                              'nowrap',
                          }}
                        >
                          {t(
                            column
                              .labelKey
                          )}
                        </th>
                      )
                    )}

                    <th
                      style={{
                        textAlign:
                          'start',
                        padding:
                          '14px 16px',
                        fontSize: 11,
                        fontWeight: 600,
                        color:
                          '#6e6e6e',
                      }}
                    >
                      {t('actions')}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map(
                    (record) => (
                      <tr
                        key={
                          record.id
                        }
                        style={{
                          borderBottom:
                            '1px solid #ebe7e2',
                        }}
                      >
                        {columns.map(
                          (
                            column
                          ) => (
                            <td
                              key={
                                column.key
                              }
                              style={{
                                padding:
                                  '12px 16px',
                                verticalAlign:
                                  'middle',
                              }}
                            >
                              {renderCell(
                                record,
                                column
                              )}
                            </td>
                          )
                        )}

                        <td
                          style={{
                            padding:
                              '12px 16px',
                          }}
                        >
                          <div
                            style={{
                              display:
                                'flex',
                              alignItems:
                                'center',
                              gap: 6,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                openEdit(
                                  record
                                )
                              }
                              style={
                                iconActionBtn
                              }
                              title={t(
                                'edit'
                              )}
                            >
                              <Pencil
                                style={{
                                  width:
                                    14,
                                  height:
                                    14,
                                }}
                              />
                            </button>

                            <button
                              type="button"
                              disabled={
                                deleteMutation.isPending
                              }
                              onClick={() =>
                                remove(
                                  record
                                )
                              }
                              style={{
                                ...iconActionBtn,
                                color:
                                  '#6a514d',
                              }}
                              title={t(
                                'delete'
                              )}
                            >
                              <Trash2
                                style={{
                                  width:
                                    14,
                                  height:
                                    14,
                                }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>


          <div
            className="md:hidden"
            style={{
              display: 'flex',
              flexDirection:
                'column',
              gap: 10,
            }}
          >
            {filtered.map(
              (record) => (
                <div
                  key={record.id}
                  className="neu-raised"
                  style={{
                    padding: 14,
                    display: 'flex',
                    flexDirection:
                      'column',
                    gap: 9,
                  }}
                >
                  {columns
                    .slice(0, 3)
                    .map(
                      (
                        column
                      ) => (
                        <div
                          key={
                            column.key
                          }
                          style={{
                            display:
                              'flex',
                            justifyContent:
                              'space-between',
                            alignItems:
                              'center',
                            gap: 10,
                          }}
                        >
                          <span
                            style={{
                              fontSize:
                                11,
                              color:
                                '#9a9a9a',
                            }}
                          >
                            {t(
                              column
                                .labelKey
                            )}
                          </span>

                          <div
                            style={{
                              textAlign:
                                'end',
                              maxWidth:
                                '62%',
                            }}
                          >
                            {renderCell(
                              record,
                              column
                            )}
                          </div>
                        </div>
                      )
                    )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'flex-end',
                      gap: 6,
                      marginTop: 4,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        openEdit(
                          record
                        )
                      }
                      style={
                        iconActionBtn
                      }
                    >
                      <Pencil
                        style={{
                          width: 14,
                          height: 14,
                        }}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        remove(
                          record
                        )
                      }
                      style={{
                        ...iconActionBtn,
                        color:
                          '#6a514d',
                      }}
                    >
                      <Trash2
                        style={{
                          width: 14,
                          height: 14,
                        }}
                      />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}


      <Modal
        open={modalOpen}
        onClose={() => {
          if (
            !saveMutation.isPending
          ) {
            setModalOpen(
              false
            );
          }
        }}
        title={
          editing
            ? t('edit')
            : t('addNew')
        }
      >
        {formError && (
          <div
            className="neu-inset-sm"
            style={{
              padding:
                '10px 12px',
              color: '#6a514d',
              fontSize: 12,
              lineHeight: 1.7,
            }}
          >
            {formError}
          </div>
        )}

        <div
          className="mcoe-admin-form-grid"
        >
          {formFields.map(
            (field) => (
              <div
                key={field.key}
                style={
                  field.full
                    ? {
                        gridColumn:
                          '1 / -1',
                      }
                    : undefined
                }
              >
                {renderField(
                  field
                )}
              </div>
            )
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent:
              'flex-end',
            gap: 10,
            marginTop: 8,
          }}
        >
          <button
            type="button"
            onClick={() =>
              setModalOpen(false)
            }
            disabled={
              saveMutation.isPending
            }
            className="btn-neu"
            style={{
              padding:
                '10px 18px',
              fontSize: 13,
              fontWeight: 600,
              color: '#6e6e6e',
            }}
          >
            {t('cancel')}
          </button>

          <button
            type="button"
            onClick={save}
            disabled={
              saveMutation.isPending
            }
            className="btn-dark-neu"
            style={{
              padding:
                '10px 22px',
              fontSize: 13,
              fontWeight: 600,
              display: 'flex',
              alignItems:
                'center',
              gap: 8,
            }}
          >
            {saveMutation.isPending && (
              <Loader2
                className="animate-spin"
                style={{
                  width: 14,
                  height: 14,
                }}
              />
            )}

            {t('save')}
          </button>
        </div>
      </Modal>
    </div>
  );
}


const fieldStyle = {
  background: '#ebe7e2',
  boxShadow:
    'var(--shadow-in-sm)',
  borderRadius: 10,
  border: 'none',
  padding: '10px 12px',
  fontSize: 13,
  color: '#3a3a3a',
  fontFamily: 'inherit',
  width: '100%',
  outline: 'none',
};


const iconActionBtn = {
  background: '#ebe7e2',
  boxShadow:
    'var(--shadow-in-sm)',
  border: 'none',
  borderRadius: 8,
  width: 32,
  height: 32,
  cursor: 'pointer',
  color: '#6e6e6e',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};


function FieldWrap({
  label,
  required,
  children,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        marginBottom: 4,
      }}
    >
      <label
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing:
            '0.04em',
          color: '#6e6e6e',
        }}
      >
        {label}

        {required
          ? ' *'
          : ''}
      </label>

      {children}
    </div>
  );
}
