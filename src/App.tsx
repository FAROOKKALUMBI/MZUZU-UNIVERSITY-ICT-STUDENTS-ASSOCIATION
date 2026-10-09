import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ExecutivePage } from './pages/ExecutivePage';
import { ContactPage } from './pages/ContactPage';
import { JoinPage } from './pages/JoinPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/updates/:id" element={<UpdatesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/executive" element={<ExecutivePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
