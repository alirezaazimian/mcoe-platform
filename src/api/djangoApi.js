const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData
      ? {}
      : { 'Content-Type': 'application/json' }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export const djangoApi = {
  workingGroups: {
    list() {
      return request('/working-groups/');
    },

    get(slug) {
      return request(
        `/working-groups/${encodeURIComponent(slug)}/`
      );
    },
  },

  workingGroupMembers: {
    listByGroup(groupSlug) {
      return request(
        `/working-group-members/?group_slug=${encodeURIComponent(groupSlug)}`
      );
    },
  },

  news: {
    list() {
      return request('/news/');
    },

    get(id) {
      return request(`/news/${encodeURIComponent(id)}/`);
    },
  },

  articles: {
    list() {
      return request('/articles/');
    },

    get(id) {
      return request(`/articles/${encodeURIComponent(id)}/`);
    },
  },

  events: {
    list(status = 'all') {
      const query =
        status && status !== 'all'
          ? `?status=${encodeURIComponent(status)}`
          : '';

      return request(`/events/${query}`);
    },

    get(id) {
      return request(`/events/${encodeURIComponent(id)}/`);
    },
  },

  heroSlides: {
    list() {
      return request('/hero-slides/');
    },
  },

  collaborationRequests: {
    create(formData) {
      return request('/collaboration-requests/', {
        method: 'POST',
        body: formData,
      });
    },
  },
};