import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { LeadershipPage } from './components/pages/LeadershipPage';
import { CommunitiesPage } from './components/pages/CommunitiesPage';
import { RegistrationPage } from './components/pages/RegistrationPage';
import { ProgramsPage } from './components/pages/ProgramsPage';
import { NewsPage } from './components/pages/NewsPage';
import { EventsPage } from './components/pages/EventsPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { ContactPage } from './components/pages/ContactPage';

import { AdminDashboard } from './components/admin/AdminDashboard';
import { CoordinatorPortal } from './components/coordinator/CoordinatorPortal';

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const { session } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutPage />;
      case 'leadership':
        return <LeadershipPage />;
      case 'communities':
        return <CommunitiesPage />;
      case 'register':
        return <RegistrationPage />;
      case 'programs':
        return <ProgramsPage />;
      case 'news':
        return <NewsPage />;
      case 'events':
        return <EventsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return session.role === 'admin' ? <AdminDashboard /> : <HomePage setActiveTab={setActiveTab} />;
      case 'coordinator':
        return session.role === 'coordinator' ? <CoordinatorPortal /> : <HomePage setActiveTab={setActiveTab} />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A120D] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-600/20 selection:text-emerald-700">
      
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Auth Portal Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(role) => {
          if (role === 'admin') {
            setActiveTab('admin');
          } else if (role === 'coordinator') {
            setActiveTab('coordinator');
          }
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
