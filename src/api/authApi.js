const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api';

const ACCESS_TOKEN_KEY = 'mcoe_access_token';
const REFRESH_TOKEN_KEY = 'mcoe_refresh_token';


export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}


export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}


export function setTokens(access, refresh) {
  if (access) {
    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      access
    );
  }

  if (refresh) {
    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      refresh
    );
  }
}


export function clearTokens() {
  localStorage.removeItem(
    ACCESS_TOKEN_KEY
  );

  localStorage.removeItem(
    REFRESH_TOKEN_KEY
  );
}


async function getErrorMessage(response) {
  try {
    const data = await response.json();

    if (data.detail) {
      return data.detail;
    }

    if (
      data.non_field_errors &&
      data.non_field_errors.length
    ) {
      return data.non_field_errors[0];
    }

    const firstKey = Object.keys(data)[0];

    if (firstKey) {
      const value = data[firstKey];

      if (Array.isArray(value)) {
        return value[0];
      }

      if (typeof value === 'string') {
        return value;
      }
    }
  } catch {
    // Ignore JSON parsing errors.
  }

  return `Request failed with status ${response.status}`;
}


async function refreshAccessToken() {
  const refresh = getRefreshToken();

  if (!refresh) {
    throw new Error(
      'No refresh token available.'
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/auth/refresh/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh,
      }),
    }
  );

  if (!response.ok) {
    clearTokens();

    throw new Error(
      'Session expired.'
    );
  }

  const data = await response.json();

  setTokens(
    data.access,
    data.refresh || refresh
  );

  return data.access;
}


async function authRequest(
  endpoint,
  options = {},
  allowRefresh = true
) {
  const access = getAccessToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (access) {
    headers.Authorization =
      `Bearer ${access}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  if (
    response.status === 401 &&
    allowRefresh &&
    getRefreshToken()
  ) {
    await refreshAccessToken();

    return authRequest(
      endpoint,
      options,
      false
    );
  }

  if (!response.ok) {
    const message =
      await getErrorMessage(response);

    const error = new Error(message);
    error.status = response.status;

    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}


export const authApi = {
  async login(email, password) {
    const response = await fetch(
      `${API_BASE_URL}/auth/login/`,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(response)
      );
    }

    const data = await response.json();

    setTokens(
      data.access,
      data.refresh
    );

    return data;
  },


  async register(
    email,
    password,
    confirmPassword
  ) {
    const response = await fetch(
      `${API_BASE_URL}/auth/register/`,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          confirm_password:
            confirmPassword,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        await getErrorMessage(response)
      );
    }

    const data = await response.json();

    setTokens(
      data.access,
      data.refresh
    );

    return data;
  },


  me() {
    return authRequest(
      '/auth/me/'
    );
  },


  async logout() {
    const refresh =
      getRefreshToken();

    try {
      if (refresh) {
        await authRequest(
          '/auth/logout/',
          {
            method: 'POST',
            body: JSON.stringify({
              refresh,
            }),
          }
        );
      }
    } finally {
      clearTokens();
    }
  },
};