import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  Loader2,
  RefreshCw,
  LogOut,
  Clock,
  Home
} from 'lucide-react';
import { apiService, ScreeningStatistics } from '../../services/apiServices';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useRouter } from '../SimpleRouter';

interface RecentTest {
  id: number;
  name: string;
  age: number;
  gender: string;
  institution: string;
  total_score: number;
  gme_positive: boolean;
  substance_positive: boolean;
  psychotic_positive: boolean;
  ptsd_positive: boolean;
  test_date: string;
}

const AdminDashboard: React.FC = () => {
  const [statistics, setStatistics] = useState<ScreeningStatistics | null>(null);
  const [recentTests, setRecentTests] = useState<RecentTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Admin auth hook
  const { logout, getFormattedRemainingTime } = useAdminAuth();
  const router = useRouter();

  const handleGoHome = () => {
    router.goToQuestionnaire();
  };

  const handleLogout = () => {
    if (window.confirm('Yakin ingin keluar dari dashboard admin?')) {
      logout();
      router.goToQuestionnaire();
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsResponse, recentResponse] = await Promise.all([
        apiService.getStatistics(),
        apiService.getRecentTests(10)
      ]);

      if (statsResponse.success && statsResponse.data) {
        setStatistics(statsResponse.data);
      }

      if (recentResponse.success && recentResponse.data) {
        setRecentTests(recentResponse.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getResultsBadges = (test: RecentTest) => {
    const badges = [];
    if (test.gme_positive) badges.push({ label: 'GME', color: 'bg-red-100 text-red-800' });
    if (test.substance_positive) badges.push({ label: 'SUB', color: 'bg-orange-100 text-orange-800' });
    if (test.psychotic_positive) badges.push({ label: 'PSY', color: 'bg-red-200 text-red-900' });
    if (test.ptsd_positive) badges.push({ label: 'PTSD', color: 'bg-purple-100 text-purple-800' });
    
    if (badges.length === 0) {
      badges.push({ label: 'OK', color: 'bg-green-100 text-green-800' });
    }

    return badges;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-600" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Statistik Skrining Kesehatan Jiwa SRQ-29</p>
          </div>
          
          {/* Session Info & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Session Timer */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4" />
              <span>Sesi: {getFormattedRemainingTime()}</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleGoHome}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Kembali</span>
              </button>
              
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Tes</p>
                  <p className="text-2xl font-semibold text-gray-900">{statistics.total_tests}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Hari Ini</p>
                  <p className="text-2xl font-semibold text-gray-900">{statistics.today_tests}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Bulan Ini</p>
                  <p className="text-2xl font-semibold text-gray-900">{statistics.this_month_tests}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Rata-rata Skor</p>
                  <p className="text-2xl font-semibold text-gray-900">{statistics.average_score}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Positive Results Summary */}
        {statistics && (
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hasil Positif</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{statistics.positive_results.gme}</div>
                <div className="text-sm text-gray-500">Cemas/Depresi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{statistics.positive_results.substance}</div>
                <div className="text-sm text-gray-500">Zat Psikoaktif</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-800">{statistics.positive_results.psychotic}</div>
                <div className="text-sm text-gray-500">Psikotik</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{statistics.positive_results.ptsd}</div>
                <div className="text-sm text-gray-500">PTSD</div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Tests */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Tes Terbaru</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hasil
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTests.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{test.name}</div>
                      <div className="text-sm text-gray-500">{test.institution}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{test.age} tahun</div>
                      <div className="text-sm text-gray-500">{test.gender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{test.total_score}/29</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {getResultsBadges(test).map((badge, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(test.test_date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {recentTests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Belum ada data tes tersedia
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;