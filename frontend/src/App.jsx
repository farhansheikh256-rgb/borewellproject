import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import BookService from './pages/BookService';
import About from './pages/About';
import Contact from './pages/Contact';
import Certified from './pages/Certified';
import Team from './pages/about/Team';
import WhyUs from './pages/about/WhyUs';
import Reviews from './pages/Reviews';
import Dashboard from './pages/admin/Dashboard';
import AdminEnquiries from './pages/admin/Enquiries';
import AdminLogin from './pages/admin/AdminLogin';
import ChatLeads from './pages/admin/ChatLeads';
import WhatsAppWidget from './components/Chatbot/WhatsAppWidget';
import PlaceholderPage from './pages/PlaceholderPage';
// Problem Pages
import LowPressure from './pages/problems/LowPressure';
import NoWater from './pages/problems/NoWater';
import PoorQuality from './pages/problems/PoorQuality';
import RunningOut from './pages/problems/RunningOut';
// Service Pages
import Pumps from './pages/services/Pumps';
import Filtration from './pages/services/Filtration';
import Rehab from './pages/services/Rehab';
import HandPump from './pages/services/HandPump';
import ContractWorks from './pages/services/ContractWorks';
import BorewellDrilling from './pages/services/BorewellDrilling';
import Testing from './pages/services/Testing';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const AdminProtectedRoute = ({ children }) => {
  const { isAdmin } = useAppContext();
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
};

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/"        element={<Layout><Home /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/about"   element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/book"    element={<Layout><BookService /></Layout>} />

          {/* Problems */}
          <Route path="/problems/low-pressure" element={<Layout><LowPressure /></Layout>} />
          <Route path="/problems/no-water" element={<Layout><NoWater /></Layout>} />
          <Route path="/problems/poor-quality" element={<Layout><PoorQuality /></Layout>} />
          <Route path="/problems/running-out" element={<Layout><RunningOut /></Layout>} />

          <Route path="/services/pumps" element={<Layout><Pumps /></Layout>} />
          <Route path="/services/filtration" element={<Layout><Filtration /></Layout>} />
          <Route path="/services/testing" element={<Layout><Testing /></Layout>} />
          <Route path="/services/rehab" element={<Layout><Rehab /></Layout>} />
          <Route path="/services/hand-pump" element={<Layout><HandPump /></Layout>} />
          <Route path="/services/contract" element={<Layout><ContractWorks /></Layout>} />
          <Route path="/services/drilling" element={<Layout><BorewellDrilling /></Layout>} />

          <Route path="/about/team" element={<Layout><Team /></Layout>} />
          <Route path="/about/why-us" element={<Layout><WhyUs /></Layout>} />

          <Route path="/certified" element={<Layout><Certified /></Layout>} />

          <Route path="/reviews" element={<Layout><Reviews /></Layout>} />

          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
          <Route path="/admin/enquiries" element={<AdminProtectedRoute><AdminEnquiries /></AdminProtectedRoute>} />
          <Route path="/admin/chat-leads" element={<AdminProtectedRoute><ChatLeads /></AdminProtectedRoute>} />
        </Routes>
        <WhatsAppWidget />
      </Router>
    </AppProvider>
  );
}

export default App;
