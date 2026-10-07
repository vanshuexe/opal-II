import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to an in-page anchor (e.g. /services#vastu-consultation) when present
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`flex flex-col min-h-screen font-sans ${isAdminRoute ? 'bg-[#0E1118]' : 'bg-[#FAF8F2] text-[#1A1612]'} antialiased`}>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/about-s3t-koncepts" element={<AboutPage />} />
          <Route path="/portfolio" element={<WorkPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/book-consultation" element={<ConsultationPage />} />
          <Route path="/book-free-consultation" element={<ConsultationPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          {/* Fallback to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingButtons />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
