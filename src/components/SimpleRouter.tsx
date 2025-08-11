import React, { useState } from 'react';
import SRQ29Questionnaire from './SRQ29Questionnaire';
import ProtectedAdminRoute from './Admin/ProtectedAdminRoute';

type Route = 'questionnaire' | 'admin';

const SimpleRouter: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('questionnaire');

  const renderRoute = () => {
    switch (currentRoute) {
      case 'admin':
        return <ProtectedAdminRoute />;
      case 'questionnaire':
      default:
        return <SRQ29Questionnaire />;
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