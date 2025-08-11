// src/components/Admin/ProtectedAdminRoute.tsx

import React, { useEffect } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useRouter } from '../SimpleRouter';
import AdminAuthModal from './AdminAuthModal';
import AdminDashboard from './AdminDashboard';
import { Loader2, Shield } from 'lucide-react';

const ProtectedAdminRoute: React.FC = () => {
  const {
    isAuthenticated,
    isLoading,
    showAuthModal,
    requestAuth,
    handleAuthResult,
    closeAuthModal,
  } = useAdminAuth();
  
  const router = useRouter();

  // Request auth on mount if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      requestAuth();
    }
  }, [isLoading, isAuthenticated, requestAuth]);

  // Handle authentication failure - redirect to home
  const handleAuthFailure = (success: boolean) => {
    handleAuthResult(success);
    if (!success) {
      // If user cancels or fails auth, go back to questionnaire
      setTimeout(() => {
        router.goToQuestionnaire();
      }, 1500);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  // Unauthenticated state with modal
  if (!isAuthenticated) {
    return (
      <>
        {/* Placeholder screen */}
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <Shield className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              Area Administrator
            </h1>
            <p className="text-gray-500 mb-6">
              Akses terbatas untuk petugas yang berwenang
            </p>
            <div className="space-y-3">
              <button
                onClick={requestAuth}
                className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
              >
                Masuk sebagai Admin
              </button>
              <button
                onClick={router.goToQuestionnaire}
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>

        {/* Authentication Modal */}
        <AdminAuthModal
          isOpen={showAuthModal}
          onAuthenticate={handleAuthFailure}
          onClose={() => {
            closeAuthModal();
            router.goToQuestionnaire();
          }}
        />
      </>
    );
  }

  // Authenticated - show dashboard
  return <AdminDashboard />;
};

export default ProtectedAdminRoute;