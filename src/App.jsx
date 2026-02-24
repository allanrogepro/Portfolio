import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import Loader from './components/Loader';
import BackToTopButton from './components/BackToTopButton';
import CustomCursor from './components/CustomCursor';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const ProjectEditor = lazy(() => import('./pages/Admin/ProjectEditor'));
const Messages = lazy(() => import('./pages/Admin/Messages'));
const Legal = lazy(() => import('./pages/Legal'));

// ... (ScrollToTop component remains same)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Faux loading for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Check if current path matches any valid route pattern (for Header/Footer)
  // Exclude /login and /admin from default layout if desired, or keep them.
  // Let's keep Header/Footer for Login but maybe not for Admin later.
  // For now, simple check.
  const isValidRoute =
    location.pathname === '/' ||
    location.pathname === '/about' ||
    location.pathname === '/projects' ||
    location.pathname === '/legal' ||
    location.pathname.startsWith('/project/');

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen font-sans">
        <CustomCursor />
        {/* ... Loader logic ... */}
        <AnimatePresence>
          {isLoading && <Loader key="loader" />}
        </AnimatePresence>

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        {isValidRoute && <Header onOpenContact={() => setIsContactOpen(true)} />}

        <motion.div
          initial={{ scale: 1.05 }}
          animate={{
            scale: isLoading ? 1.05 : 1,
            opacity: isLoading ? 0.8 : 1
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col min-h-screen"
        >
          {isValidRoute && <BackToTopButton />}
          <ScrollToTop />

          <main className="flex-grow">
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-gray-50"></div>}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home isAppLoading={isLoading} />} />
                  <Route path="/about" element={<About onOpenContact={() => setIsContactOpen(true)} />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/legal" element={<Legal />} />

                  {/* Admin Routes */}
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute>
                        <Routes>
                          <Route index element={<Dashboard />} />
                          <Route path="new" element={<ProjectEditor />} />
                          <Route path="edit/:id" element={<ProjectEditor />} />
                          <Route path="messages" element={<Messages />} />
                        </Routes>
                      </ProtectedRoute>
                    }
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          {isValidRoute && <Footer onOpenContact={() => setIsContactOpen(true)} />}
        </motion.div>
      </div>
    </AuthProvider>
  );
}

export default App;
