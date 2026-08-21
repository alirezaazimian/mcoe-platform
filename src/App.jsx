import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from '@/lib/LanguageContext';
import Layout from '@/components/layout/Layout';
// Add page imports here
import Home from '@/pages/Home';
import About from '@/pages/About';
import ComplexHistory from '@/pages/ComplexHistory';
import EducationalSpace from '@/pages/EducationalSpace';

import Levels from '@/pages/Levels';
import EducationLevelDetail from '@/pages/EducationLevelDetail';
import WorkingGroups from '@/pages/WorkingGroups';
import WorkingGroupDetail from '@/pages/WorkingGroupDetail';
import StudentAssociations from '@/pages/StudentAssociations';
import Articles from '@/pages/Articles';
import ArticleDetail from '@/pages/ArticleDetail';
import News from '@/pages/News';
import NewsDetail from '@/pages/NewsDetail';
import Events from '@/pages/Events';
import EventDetail from '@/pages/EventDetail';
import Collaborate from '@/pages/Collaborate';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
         path="/reset-password"
         element={<ResetPassword />}
      />

      <Route 
        path="/login" 
        element={<Login />}
         />
      <Route
        path="/register"
        element={<Register />}
         />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<ComplexHistory />} />
        <Route path="/educational-space" element={<EducationalSpace />} />

        <Route path="/levels" element={<Levels />} />
        <Route path="/levels/:id" element={<EducationLevelDetail />} />
        <Route path="/working-groups" element={<WorkingGroups />} />
        <Route path="/working-groups/:slug" element={<WorkingGroupDetail />} />
        <Route path="/associations" element={<StudentAssociations />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/collaborate" element={<Collaborate />} />
        <Route path="/search" element={<Search />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App