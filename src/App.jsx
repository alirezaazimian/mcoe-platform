import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import ElementaryFirstCyclePage from '@/pages/ElementaryFirstCyclePage';
import ElementarySecondCyclePage from '@/pages/ElementarySecondCyclePage';
import MiddleSchoolFirstCyclePage from '@/pages/MiddleSchoolFirstCyclePage';
import { QueryClientProvider } from '@tanstack/react-query';
import KindergartenDreamPage from '@/pages/KindergartenDreamPage';

import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/ScrollToTop';

import { AuthProvider } from '@/lib/AuthContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import { queryClientInstance } from '@/lib/query-client';

import PageNotFound from '@/lib/PageNotFound';

import Home from '@/pages/Home';
import About from '@/pages/About';
import ComplexHistory from '@/pages/ComplexHistory';
import EducationalSpace from '@/pages/EducationalSpace';
import Levels from '@/pages/Levels';
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
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';


function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />


      <Route element={<Layout />}>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/history"
          element={<ComplexHistory />}
        />

        <Route
          path="/educational-space"
          element={<EducationalSpace />}
        />

        <Route
          path="/levels"
          element={<Levels />}
        />

        <Route
          path="/levels/kindergarten"
          element={<KindergartenDreamPage />}
        />

        <Route
          path="/levels/elementary1"
          element={<ElementaryFirstCyclePage />}
        />

        <Route
           path="/levels/elementary2"
         element={<ElementarySecondCyclePage />}
        />

        <Route
          path="/levels/middleSchool"
          element={<MiddleSchoolFirstCyclePage />}
        />


        <Route
          path="/working-groups"
          element={<WorkingGroups />}
        />

        <Route
          path="/working-groups/:slug"
          element={<WorkingGroupDetail />}
        />

        <Route
          path="/associations"
          element={<StudentAssociations />}
        />

        <Route
          path="/articles"
          element={<Articles />}
        />

        <Route
          path="/articles/:id"
          element={<ArticleDetail />}
        />

        <Route
          path="/news"
          element={<News />}
        />

        <Route
          path="/news/:id"
          element={<NewsDetail />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/events/:id"
          element={<EventDetail />}
        />

        <Route
          path="/collaborate"
          element={<Collaborate />}
        />

        <Route
          path="/search"
          element={<Search />}
        />
      </Route>


      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}


function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <QueryClientProvider
          client={queryClientInstance}
        >
          <Router>
            <ScrollToTop />
            <AppRoutes />
          </Router>

          <Toaster />
        </QueryClientProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}


export default App;