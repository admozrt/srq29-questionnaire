import React, { useState } from 'react';
import SRQ29Questionnaire from './SRQ29Questionnaire';
import ProtectedAdminRoute from './Admin/ProtectedAdminRoute';

type Route = 'questionnaire' | 'admin';

const SimpleRouter: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('questionnaire');

  const renderRoute = () => {
    switch (currentRoute) {
      case 'admin':
        // React 19 hoists these tags into <head>. Keep the admin dashboard
        // out of search indexes.
        return (
          <>
            <title>Admin Dashboard | SRQ-29 RSJ Sambang Lihum</title>
            <meta name="robots" content="noindex, nofollow" />
            <ProtectedAdminRoute />
          </>
        );
      case 'questionnaire':
      default:
        return (
          <>
            <title>
              Skrining Kesehatan Jiwa SRQ-29 | RSJ Sambang Lihum
            </title>
            <meta
              name="description"
              content="Tes skrining kesehatan jiwa online gratis dengan kuesioner SRQ-29 standar WHO dari RSJ Sambang Lihum, Kalimantan Selatan. Deteksi dini gangguan mental emosional, penggunaan zat, gejala psikotik, dan PTSD."
            />
            <SRQ29Questionnaire />
          </>
        );
    }
  };

  // Provide router context to child components
  const routerValue = {
    currentRoute,
    navigate: setCurrentRoute,
    goToAdmin: () => setCurrentRoute('admin'),
    goToQuestionnaire: () => setCurrentRoute('questionnaire'),
  };

  return (
    <RouterContext.Provider value={routerValue}>
      {renderRoute()}
    </RouterContext.Provider>
  );
};

// Router Context for sharing navigation functions
export const RouterContext = React.createContext<{
  currentRoute: Route;
  navigate: (route: Route) => void;
  goToAdmin: () => void;
  goToQuestionnaire: () => void;
} | null>(null);

export const useRouter = () => {
  const context = React.useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterContext');
  }
  return context;
};

export default SimpleRouter;