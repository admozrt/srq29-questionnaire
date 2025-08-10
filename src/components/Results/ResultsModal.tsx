import React from 'react';
import { User, Calendar, MapPin, FileText, AlertTriangle, CheckCircle, X, ExternalLink } from 'lucide-react';
import { PersonalInfo, Results } from '../../types';
import { getCurrentDate } from '../../utils/helpers';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: Results;
  personalInfo: PersonalInfo;
  onFinish: () => void;
  onContinue: () => void;
}

const getCurrentDateInIndonesia = () => {
    const now = new Date();
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta'
    }).format(now);
  };

const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  onClose,
  results,
  personalInfo,
  onFinish,
  onContinue
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-emerald-600 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <FileText className="w-12 h-12 mx-auto mb-3" />
          <h1 className="text-2xl font-bold">Hasil Skrining Kesehatan Jiwa</h1>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="font-medium">Tanggal Tes:</span>
                  <span className="ml-2">{getCurrentDateInIndonesia()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="font-medium">Nama Lengkap:</span>
                  <span className="ml-2">{personalInfo.name}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="w-5 h-5 text-emerald-600 text-center font-bold">♂♀</span>
                <div>
                  <span className="font-medium">Jenis Kelamin:</span>
                  <span className="ml-2">{personalInfo.gender}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="w-5 h-5 text-emerald-600 text-center font-bold">#</span>
                <div>
                  <span className="font-medium">Umur:</span>
                  <span className="ml-2">{personalInfo.age}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="font-medium">Domisili:</span>
                  <span className="ml-2">{personalInfo.address}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="w-5 h-5 text-emerald-600 text-center font-bold">💼</span>
                <div>
                  <span className="font-medium">Pekerjaan:</span>
                  <span className="ml-2">{personalInfo.occupation}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Keterangan dan Rujukan</h2>
            
            <div className="space-y-4">
              {results.gme && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-800">Terdapat masalah psikologis seperti cemas dan depresi</h3>
                      <p className="text-red-700 text-sm mt-1">Rujukan: Psikiater/Psikolog klinis</p>
                    </div>
                  </div>
                </div>
              )}

              {results.substance && (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-orange-800">Terdapat penggunaan zat psikoaktif/narkoba</h3>
                      <p className="text-orange-700 text-sm mt-1">Rujukan: Psikiater/Psikolog klinis, Konselor adiksi</p>
                    </div>
                  </div>
                </div>
              )}

              {results.psychotic && (
                <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-800">Terdapat gejala-gejala gangguan psikotik yang perlu penanganan serius</h3>
                      <p className="text-red-700 text-sm mt-1">Rujukan: Psikiater/Psikolog klinis (SEGERA)</p>
                    </div>
                  </div>
                </div>
              )}

              {results.ptsd && (
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-purple-800">Terdapat gejala-gejala gangguan PTSD (Post Traumatic Stress Disorder)</h3>
                      <p className="text-purple-700 text-sm mt-1">Rujukan: Psikiater/Psikolog klinis trauma specialist</p>
                    </div>
                  </div>
                </div>
              )}

              {!results.gme && !results.substance && !results.psychotic && !results.ptsd && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-800">Tidak terdeteksi masalah kesehatan jiwa yang signifikan</h3>
                      <p className="text-green-700 text-sm mt-1">Tetap jaga kesehatan mental dengan pola hidup sehat dan kelola stres dengan baik</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Catatan Penting:</h3>
                  <p className="text-blue-700 text-sm">
                    Hasil tes ini hanya sebagai alat ukur secara objektif. Diagnosa lebih lanjut diperlukan 
                    konsultasi ke psikiater/dokter/psikolog klinis terdekat. Total skor jawaban "YA": <strong>{results.totalScore}</strong> dari 29 pertanyaan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-6 border-t">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
            >
              Cetak Hasil
            </button>
            
            <button
              onClick={onFinish}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Selesai
            </button>
            
            <button
              onClick={onContinue}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              Lanjutkan ke Pendaftaran Online
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;