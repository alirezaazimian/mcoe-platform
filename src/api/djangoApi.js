import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from '@/api/authApi';


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api';


/**
 * @typedef {RequestInit & {
 *   auth?: boolean
 * }} ApiRequestOptions
 */


function createApiError(
  message,
  status
) {
  return Object.assign(
    new Error(message),
    { status }
  );
}


async function readErrorMessage(
  response
) {
  try {
    const data =
      await response.json();

    if (data.detail) {
      return data.detail;
    }

    if (
      data.non_field_errors &&
      data.non_field_errors.length
    ) {
      return data.non_field_errors[0];
    }

    const firstKey =
      Object.keys(data)[0];

    if (firstKey) {
      const value =
        data[firstKey];

      if (Array.isArray(value)) {
        return `${firstKey}: ${value[0]}`;
      }

      if (
        typeof value === 'string'
      ) {
        return `${firstKey}: ${value}`;
      }
    }
  } catch {
    // Ignore non-JSON error bodies.
  }

  return (
    `API request failed: ` +
    `${response.status} ` +
    `${response.statusText}`
  );
}


async function refreshAdminAccessToken() {
  const refresh =
    getRefreshToken();

  if (!refresh) {
    throw createApiError(
      'Session expired.',
      401
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/auth/refresh/`,
    {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify({
        refresh,
      }),
    }
  );

  if (!response.ok) {
    clearTokens();

    throw createApiError(
      'Session expired.',
      401
    );
  }

  const data =
    await response.json();

  setTokens(
    data.access,
    data.refresh || refresh
  );

  return data.access;
}


/**
 * @param {string} endpoint
 * @param {ApiRequestOptions} [options]
 * @param {boolean} [allowRefresh]
 */
async function request(
  endpoint,
  options = {},
  allowRefresh = true
) {
  const {
    auth = false,
    ...fetchOptions
  } = options;

  const url =
    `${API_BASE_URL}${endpoint}`;

  const isFormData =
    fetchOptions.body instanceof
    FormData;

  const headers =
    new Headers(
      fetchOptions.headers || {}
    );

  if (
    !isFormData &&
    !headers.has(
      'Content-Type'
    )
  ) {
    headers.set(
      'Content-Type',
      'application/json'
    );
  }

  if (auth) {
    const access =
      getAccessToken();

    if (access) {
      headers.set(
        'Authorization',
        `Bearer ${access}`
      );
    }
  }

  const response = await fetch(
    url,
    {
      ...fetchOptions,
      headers,
    }
  );

  if (
    response.status === 401 &&
    auth &&
    allowRefresh &&
    getRefreshToken()
  ) {
    await refreshAdminAccessToken();

    return request(
      endpoint,
      options,
      false
    );
  }

  if (!response.ok) {
    const message =
      await readErrorMessage(
        response
      );

    throw createApiError(
      message,
      response.status
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}


function normalizeTags(
  value
) {
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        String(item).trim()
      )
      .filter(Boolean);
  }

  if (
    typeof value === 'string'
  ) {
    return value
      .split(',')
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);
  }

  return [];
}


function makeBody(
  payload,
  fileKey,
  normalize
) {
  const normalized =
    normalize(payload);

  const file =
    payload[fileKey];

  const hasNewFile =
    typeof File !==
      'undefined' &&
    file instanceof File;

  if (!hasNewFile) {
    return JSON.stringify(
      normalized
    );
  }

  const formData =
    new FormData();

  Object.entries(
    normalized
  ).forEach(
    ([key, value]) => {
      if (
        value === null ||
        value === undefined
      ) {
        return;
      }

      if (
        Array.isArray(value) ||
        (
          typeof value ===
          'object'
        )
      ) {
        formData.append(
          key,
          JSON.stringify(
            value
          )
        );

        return;
      }

      formData.append(
        key,
        String(value)
      );
    }
  );

  formData.append(
    fileKey,
    file
  );

  return formData;
}


function workingGroupFormData(
  payload
) {
  const formData =
    new FormData();

  const textFields = [
    'name_fa',
    'name_en',
    'slug',
    'description_fa',
    'description_en',
    'icon',
  ];

  textFields.forEach((key) => {
    const value =
      payload[key];

    if (
      value !== undefined &&
      value !== null
    ) {
      formData.append(
        key,
        String(value)
      );
    }
  });

  if (
    payload.sort_order !==
      undefined &&
    payload.sort_order !== null
  ) {
    formData.append(
      'sort_order',
      String(payload.sort_order)
    );
  }

  if (
    typeof File !==
      'undefined' &&
    payload.image instanceof File
  ) {
    formData.append(
      'image',
      payload.image
    );
  }

  return formData;
}


function normalizeArticle(
  payload
) {
  return {
    title_fa:
      payload.title_fa || '',
    title_en:
      payload.title_en || '',
    summary_fa:
      payload.summary_fa || '',
    summary_en:
      payload.summary_en || '',
    body_fa:
      payload.body_fa || '',
    body_en:
      payload.body_en || '',
    category:
      payload.category || 'general',
    tags:
      normalizeTags(
        payload.tags
      ),
    author_name:
      payload.author_name || '',
    reading_time_min:
      Number(
        payload.reading_time_min ||
        0
      ),
    status:
      payload.status || 'draft',
    publish_date:
      payload.publish_date || null,
    slug_fa:
      payload.slug_fa || '',
    slug_en:
      payload.slug_en || '',
    is_featured:
      Boolean(
        payload.is_featured
      ),
  };
}


function normalizeNews(
  payload
) {
  return {
    title_fa:
      payload.title_fa || '',
    title_en:
      payload.title_en || '',
    summary_fa:
      payload.summary_fa || '',
    summary_en:
      payload.summary_en || '',
    body_fa:
      payload.body_fa || '',
    body_en:
      payload.body_en || '',
    category:
      payload.category || 'general',
    tags:
      normalizeTags(
        payload.tags
      ),
    author_name:
      payload.author_name || '',
    status:
      payload.status || 'draft',
    publish_date:
      payload.publish_date || null,
    slug_fa:
      payload.slug_fa || '',
    slug_en:
      payload.slug_en || '',
    is_featured:
      Boolean(
        payload.is_featured
      ),
  };
}


function normalizeEvent(
  payload
) {
  const capacity =
    payload.capacity === '' ||
    payload.capacity === null ||
    payload.capacity === undefined
      ? null
      : Number(
          payload.capacity
        );

  return {
    title_fa:
      payload.title_fa || '',
    title_en:
      payload.title_en || '',
    description_fa:
      payload.description_fa || '',
    description_en:
      payload.description_en || '',
    category:
      payload.category || '',
    event_date:
      payload.event_date || '',
    venue_fa:
      payload.venue_fa || '',
    venue_en:
      payload.venue_en || '',
    organizer_fa:
      payload.organizer_fa || '',
    organizer_en:
      payload.organizer_en || '',
    capacity,
    registration_deadline:
      payload.registration_deadline ||
      null,
    registration_url:
      payload.registration_url || '',
    map_url:
      payload.map_url || '',
    status:
      payload.status || 'upcoming',
  };
}


export const djangoApi = {
  workingGroups: {
    list() {
      return request(
        '/working-groups/'
      );
    },

    get(slug) {
      return request(
        `/working-groups/` +
        `${encodeURIComponent(slug)}/`
      );
    },

    create(payload) {
      return request(
        '/working-groups/',
        {
          method: 'POST',
          body:
            workingGroupFormData(
              payload
            ),
          auth: true,
        }
      );
    },

    update(
      currentSlug,
      payload
    ) {
      return request(
        `/working-groups/` +
        `${encodeURIComponent(currentSlug)}/`,
        {
          method: 'PATCH',
          body:
            workingGroupFormData(
              payload
            ),
          auth: true,
        }
      );
    },

    remove(slug) {
      return request(
        `/working-groups/` +
        `${encodeURIComponent(slug)}/`,
        {
          method: 'DELETE',
          auth: true,
        }
      );
    },
  },

  workingGroupMembers: {
    listByGroup(groupSlug) {
      return request(
        `/working-group-members/` +
        `?group_slug=` +
        `${encodeURIComponent(groupSlug)}`
      );
    },
  },

  news: {
    list() {
      return request(
        '/news/'
      );
    },

    get(id) {
      return request(
        `/news/` +
        `${encodeURIComponent(id)}/`
      );
    },

    adminList() {
      return request(
        '/news/?admin=true',
        {
          auth: true,
        }
      );
    },

    create(payload) {
      return request(
        '/news/',
        {
          method: 'POST',
          body: makeBody(
            payload,
            'featured_image',
            normalizeNews
          ),
          auth: true,
        }
      );
    },

    update(id, payload) {
      return request(
        `/news/` +
        `${encodeURIComponent(id)}/`,
        {
          method: 'PATCH',
          body: makeBody(
            payload,
            'featured_image',
            normalizeNews
          ),
          auth: true,
        }
      );
    },

    remove(id) {
      return request(
        `/news/` +
        `${encodeURIComponent(id)}/`,
        {
          method: 'DELETE',
          auth: true,
        }
      );
    },
  },

  articles: {
    list() {
      return request(
        '/articles/'
      );
    },

    get(id) {
      return request(
        `/articles/` +
        `${encodeURIComponent(id)}/`
      );
    },

    adminList() {
      return request(
        '/articles/?admin=true',
        {
          auth: true,
        }
      );
    },

    create(payload) {
      return request(
        '/articles/',
        {
          method: 'POST',
          body: makeBody(
            payload,
            'featured_image',
            normalizeArticle
          ),
          auth: true,
        }
      );
    },

    update(id, payload) {
      return request(
        `/articles/` +
        `${encodeURIComponent(id)}/`,
        {
          method: 'PATCH',
          body: makeBody(
            payload,
            'featured_image',
            normalizeArticle
          ),
          auth: true,
        }
      );
    },

    remove(id) {
      return request(
        `/articles/` +
        `${encodeURIComponent(id)}/`,
        {
          method: 'DELETE',
          auth: true,
        }
      );
    },
  },

  events: {
    list(status = 'all') {
      const query =
        status &&
        status !== 'all'
          ? `?status=${encodeURIComponent(status)}`
          : '';

      return request(
        `/events/${query}`
      );
    },

    get(id) {
      return request(
        `/events/` +
        `${encodeURIComponent(id)}/`
      );
    },

    adminList() {
      return request(
        '/events/',
        {
          auth: true,
        }
      );
    },

    create(payload) {
      return request(
        '/events/',
        {
          method: 'POST',
          body: makeBody(
            payload,
            'banner_image',
            normalizeEvent
          ),
          auth: true,
        }
      );
    },

    update(id, payload) {
      return request(
        `/events/` +
        `${encodeURIComponent(id)}/`,
        {
          method: 'PATCH',
          body: makeBody(
            payload,
            'banner_image',
            normalizeEvent
          ),
          auth: true,
        }
      );
    },

    remove(id) {
      return request(
        `/events/` +
        `${encodeURIComponent(id)}/`,
        {
          method: 'DELETE',
          auth: true,
        }
      );
    },
  },

  heroSlides: {
    list() {
      return request(
        '/hero-slides/'
      );
    },
  },

  collaborationRequests: {
    create(formData) {
      return request(
        '/collaboration-requests/',
        {
          method: 'POST',
          body: formData,
        }
      );
    },
  },
};
