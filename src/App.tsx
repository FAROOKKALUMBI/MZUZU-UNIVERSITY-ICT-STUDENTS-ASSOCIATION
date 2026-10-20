import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ExecutivePage } from './pages/ExecutivePage';
import { ContactPage } from './pages/ContactPage';
import { JoinPage } from './pages/JoinPage';
import { AdminPage } from './pages/AdminPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/updates/:id" element={<UpdatesPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:levelId" element={<ResourcesPage />} />
            <Route path="/resources/:levelId/:courseId" element={<ResourcesPage />} />
            <Route path="/resources/:levelId/:courseId/:typeId" element={<ResourcesPage />} />
            <Route path="/executive" element={<ExecutivePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ContentProvider>
  </AuthProvider>
  );
}

export default App;
