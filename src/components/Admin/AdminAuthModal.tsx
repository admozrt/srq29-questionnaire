// src/components/Admin/AdminAuthModal.tsx

import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onAuthenticate: (success: boolean) => void;
  onClose: () => void;
}

const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onAuthenticate,
  onClose,
}) => {
  const [code, setCode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_CODE = 'srqITSALI';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Kode akses tidak boleh kosong');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulasi delay untuk keamanan
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (code === ADMIN_CODE) {
      // Simpan auth status di localStorage dengan expiry
      const authData = {
        authenticated: true,
        timestamp: Date.now(),
        expires: Date.now() + (4 * 60 * 60 * 1000) // 4 jam
      };
      localStorage.setItem('srq_admin_auth', JSON.stringify(authData));
      
      onAuthenticate(true);
      resetForm();
    } else {
      setError('Kode akses tidak valid');
      onAuthenticate(false);
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setCode('');
    setError('');
    setIsVisible(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gray-800 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-yellow-400" />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">
            Akses Administrator
          </h2>
          <p className="text-gray-300 text-sm text-center">
            Masukkan kode akses untuk mengakses dashboard admin
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kode Akses
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={isVisible ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError('');
                  }}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-center font-mono text-lg tracking-wider"
                  placeholder="Masukkan kode akses"
                  autoComplete="off"
                  maxLength={20}
                />
                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {isVisible ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-700 text-center">
                🔒 Dashboard admin berisi data sensitif pasien. 
                Akses hanya untuk petugas yang berwenang.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={isLoading}
              >
                Batal
              </button>
              
              <button
                type="submit"
                disabled={isLoading || !code.trim()}
                className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Memverifikasi...
                  </>
                ) : (
                  'Masuk'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 rounded-b-lg">
          <p className="text-xs text-gray-500 text-center">
            Sesi admin akan berakhir otomatis setelah 4 jam
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthModal;