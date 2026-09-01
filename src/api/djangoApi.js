import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from '@/api/authApi';


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api';


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

  const headers = {
    ...(isFormData
      ? {}
      : {
          'Content-Type':
            'application/json',
        }),
    ...fetchOptions.headers,
  };

  if (auth) {
    const access =
      getAccessToken();

    if (access) {
      headers.Authorization =
        `Bearer ${access}`;
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
      return request('/news/');
    },

    get(id) {
      return request(
        `/news/` +
        `${encodeURIComponent(id)}/`
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
