import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  authApi,
  clearTokens,
  getAccessToken,
  getRefreshToken,
} from '@/api/authApi';


const AuthContext = createContext(null);


export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);

  const [
    isLoadingAuth,
    setIsLoadingAuth,
  ] = useState(true);

  const [
    authChecked,
    setAuthChecked,
  ] = useState(false);


  const checkUserAuth =
    useCallback(async () => {
      const access =
        getAccessToken();

      const refresh =
        getRefreshToken();

      if (!access && !refresh) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoadingAuth(false);
        setAuthChecked(true);

        return null;
      }

      setIsLoadingAuth(true);

      try {
        const currentUser =
          await authApi.me();

        setUser(currentUser);
        setIsAuthenticated(true);

        return currentUser;
      } catch (error) {
        console.error(
          'Authentication check failed:',
          error
        );

        clearTokens();

        setUser(null);
        setIsAuthenticated(false);

        return null;
      } finally {
        setIsLoadingAuth(false);
        setAuthChecked(true);
      }
    }, []);


  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);


  const login = useCallback(
    async (email, password) => {
      const data =
        await authApi.login(
          email,
          password
        );

      setUser(data.user);
      setIsAuthenticated(true);
      setAuthChecked(true);

      return data.user;
    },
    []
  );


  const register = useCallback(
    async (
      email,
      password,
      confirmPassword
    ) => {
      const data =
        await authApi.register(
          email,
          password,
          confirmPassword
        );

      setUser(data.user);
      setIsAuthenticated(true);
      setAuthChecked(true);

      return data.user;
    },
    []
  );


  const logout = useCallback(
    async (
      shouldRedirect = true
    ) => {
      try {
        await authApi.logout();
      } catch (error) {
        console.error(
          'Logout failed:',
          error
        );
      } finally {
        clearTokens();

        setUser(null);
        setIsAuthenticated(false);
        setAuthChecked(true);

        if (shouldRedirect) {
          window.location.href =
            '/login';
        }
      }
    },
    []
  );


  const navigateToLogin =
    useCallback(() => {
      const returnTo =
        window.location.pathname +
        window.location.search;

      window.location.href =
        `/login?returnTo=${
          encodeURIComponent(
            returnTo
          )
        }`;
    }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        authChecked,

        login,
        register,
        logout,
        navigateToLogin,
        checkUserAuth,

        // Temporary compatibility
        // with the old Base44 App.jsx.
        isLoadingPublicSettings: false,
        authError: null,
        appPublicSettings: null,
        checkAppState:
          checkUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
};