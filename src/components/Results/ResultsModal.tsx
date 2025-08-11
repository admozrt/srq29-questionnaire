import React, { useState, useCallback } from 'react';
import { User, Calendar, MapPin, FileText, AlertTriangle, CheckCircle, X, ExternalLink, Printer, Loader2, Wifi, WifiOff } from 'lucide-react';
import { PersonalInfo, Results } from '../../types';
import { getCurrentDateInIndonesia } from '../../utils/helpers';
import Footer from '../Footer/Footer';
import LogoHeader from '../LogoHeader/LogoHeader';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: Results;
  personalInfo: PersonalInfo;
  onFinish: () => void;
  onContinue: () => void;
  // New props for backend integration
  isSubmitting?: boolean;
  submitError?: string | null;
  submitSuccess?: boolean;
  onClearSubmitError?: () => void;
}

// Simple Print hook dengan window baru
const usePrint = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printError, setPrintError] = useState<string | null>(null);

  const handlePrint = useCallback((results: Results, personalInfo: PersonalInfo) => {
    if (isPrinting) return;

    try {
      setIsPrinting(true);
      setPrintError(null);

      // Buat window baru untuk print
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      
      if (!printWindow) {
        throw new Error('Popup diblokir oleh browser');
      }

      // HTML content untuk print (same as before, truncated for brevity)
      const printHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Hasil Skrining Kesehatan Jiwa</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              color: black;
              background: white;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 3px solid black;
            }
            /* Add all other print styles here */
          </style>
        </head>
        <body>
          <div class="header">
            <h1>HASIL SKRINING KESEHATAN JIWA</h1>
            <h2>Self Reporting Questionnaire 29 (SRQ-29)</h2>
            <p>RSJ Sambang Lihum - Provinsi Kalimantan Selatan</p>
          </div>
          
          <div class="section">
            <h3>Informasi Responden</h3>
            <p><strong>Tanggal:</strong> ${getCurrentDateInIndonesia()}</p>
            <p><strong>Nama:</strong> ${personalInfo.name}</p>
            <p><strong>Umur:</strong> ${personalInfo.age} tahun</p>
            <p><strong>Gender:</strong> ${personalInfo.gender}</p>
            <p><strong>Instansi:</strong> ${personalInfo.institution}</p>
            <p><strong>Total Skor:</strong> ${results.totalScore}/29</p>
          </div>

          <div class="section">
            <h3>Hasil Skrining</h3>
            ${results.gme ? '<p>☑ Masalah psikologis (cemas/depresi) - Rujukan: Psikiater/Psikolog klinis</p>' : ''}
            ${results.substance ? '<p>☑ Penggunaan zat psikoaktif - Rujukan: Psikiater/Konselor adiksi</p>' : ''}
            ${results.psychotic ? '<p>☑ Gejala psikotik (SEGERA) - Rujukan: Psikiater (segera)</p>' : ''}
            ${results.ptsd ? '<p>☑ Gejala PTSD - Rujukan: Psikiater/Trauma specialist</p>' : ''}
            ${!results.gme && !results.substance && !results.psychotic && !results.ptsd ? '<p>☑ Tidak terdeteksi masalah signifikan</p>' : ''}
          </div>

          <div class="note">
            <p><strong>Catatan Penting:</strong> Hasil ini hanya sebagai alat ukur objektif. Konsultasi lebih lanjut dengan psikiater/psikolog klinis diperlukan untuk diagnosa yang akurat.</p>
          </div>

          <div class="footer">
            <p>Dicetak: ${getCurrentDateInIndonesia()}</p>
            <p>© RSJ Sambang Lihum ${new Date().getFullYear()}</p>
          </div>
        </body>
        </html>
      `;

      // Tulis HTML ke window baru
      printWindow.document.write(printHTML);
      printWindow.document.close();

      // Wait sebentar untuk load, lalu print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setIsPrinting(false);
      }, 500);

    } catch (error) {
      console.error('Print gagal:', error);
      setPrintError('Gagal mencetak dokumen. Pastikan popup tidak diblokir.');
      setIsPrinting(false);
    }
  }, [isPrinting]);

  const clearError = useCallback(() => {
    setPrintError(null);
  }, []);

  return { isPrinting, printError, handlePrint, clearError };
};

const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  onClose,
  results,
  personalInfo,
  onFinish,
  onContinue,
  isSubmitting = false,
  submitError = null,
  submitSuccess = false,
  onClearSubmitError
}) => {
  const { isPrinting, printError, handlePrint, clearError } = usePrint();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="bg-sky-600 text-white p-4 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-200 transition-colors z-10 p-1 print-hide no-print"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          {/* Logo and Title Section */}
          <LogoHeader size="small" className="pr-8">
            <div className="text-center px-2">
              <FileText className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3" />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
                Hasil Skrining Kesehatan Jiwa
              </h1>
            </div>
          </LogoHeader>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Submission Status Messages */}
          {isSubmitting && process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg no-print">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin flex-shrink-0" />
                <div>
                  <p className="text-blue-800 text-sm font-medium">Menyimpan hasil tes...</p>
                  <p className="text-blue-700 text-xs mt-1">Mohon tunggu sebentar</p>
                </div>
              </div>
            </div>
          )}

          {submitSuccess && process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg no-print">
              <div className="flex items-start space-x-3">
                <div className="flex items-center">
                  <Wifi className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <CheckCircle className="w-4 h-4 text-green-500 ml-1 flex-shrink-0" />
                </div>
                <div>
                  <p className="text-green-800 text-sm font-medium">Data berhasil disimpan</p>
                  <p className="text-green-700 text-xs mt-1">Hasil tes telah tersimpan di database sistem</p>
                </div>
              </div>
            </div>
          )}

          {submitError && process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg no-print">
              <div className="flex items-start space-x-3">
                <div className="flex items-center">
                  <WifiOff className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  <AlertTriangle className="w-4 h-4 text-yellow-500 ml-1 flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <p className="text-yellow-800 text-sm font-medium">Penyimpanan data gagal</p>
                  <p className="text-yellow-700 text-xs mt-1">{submitError}</p>
                  <p className="text-yellow-600 text-xs mt-1 italic">
                    Hasil tes tetap dapat dicetak dan digunakan
                  </p>
                  {onClearSubmitError && (
                    <button
                      onClick={onClearSubmitError}
                      className="text-yellow-600 hover:text-yellow-800 text-xs underline mt-1"
                    >
                      Tutup pesan ini
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 print-keep-together">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-sm sm:text-base block sm:inline">Tanggal Tes:</span>
                  <span className="ml-0 sm:ml-2 text-sm sm:text-base block sm:inline break-words">
                    {getCurrentDateInIndonesia()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-sm sm:text-base block sm:inline">Nama Lengkap:</span>
                  <span className="ml-0 sm:ml-2 text-sm sm:text-base block sm:inline break-words">
                    {personalInfo.name}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 text-center font-bold text-sm sm:text-base mt-0.5 flex-shrink-0">
                  ♂♀
                </span>
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-sm sm:text-base block sm:inline">Jenis Kelamin:</span>
                  <span className="ml-0 sm:ml-2 text-sm sm:text-base block sm:inline">
                    {personalInfo.gender}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <span className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 text-center font-bold text-sm sm:text-base mt-0.5 flex-shrink-0">
                  #
                </span>
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-sm sm:text-base block sm:inline">Umur:</span>
                  <span className="ml-0 sm:ml-2 text-sm sm:text-base block sm:inline">
                    {personalInfo.age}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-sm sm:text-base block sm:inline">Instansi/Domisili:</span>
                  <span className="ml-0 sm:ml-2 text-sm sm:text-base block sm:inline break-words">
                    {personalInfo.institution}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section - Same as before */}
          <div className="border-t pt-6 sm:pt-8 print-keep-together">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
              Keterangan dan Rujukan
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              {results.gme && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-red-800 text-sm sm:text-base leading-tight">
                        Terdapat masalah psikologis seperti cemas dan depresi
                      </h3>
                      <p className="text-red-700 text-xs sm:text-sm mt-1">
                        Rujukan: Psikiater/Psikolog klinis
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {results.substance && (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-orange-800 text-sm sm:text-base leading-tight">
                        Terdapat penggunaan zat psikoaktif/narkoba
                      </h3>
                      <p className="text-orange-700 text-xs sm:text-sm mt-1">
                        Rujukan: Psikiater/Psikolog klinis, Konselor adiksi
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {results.psychotic && (
                <div className="bg-red-50 border-l-4 border-red-600 p-3 sm:p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-red-800 text-sm sm:text-base leading-tight">
                        Terdapat gejala-gejala gangguan psikotik yang perlu penanganan serius
                      </h3>
                      <p className="text-red-700 text-xs sm:text-sm mt-1">
                        Rujukan: Psikiater/Psikolog klinis (SEGERA)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {results.ptsd && (
                <div className="bg-purple-50 border-l-4 border-purple-500 p-3 sm:p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-purple-800 text-sm sm:text-base leading-tight">
                        Terdapat gejala-gejala gangguan PTSD (Post Traumatic Stress Disorder)
                      </h3>
                      <p className="text-purple-700 text-xs sm:text-sm mt-1">
                        Rujukan: Psikiater/Psikolog klinis trauma specialist
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!results.gme && !results.substance && !results.psychotic && !results.ptsd && (
                <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-green-800 text-sm sm:text-base leading-tight">
                        Tidak terdeteksi masalah kesehatan jiwa yang signifikan
                      </h3>
                      <p className="text-green-700 text-xs sm:text-sm mt-1">
                        Tetap jaga kesehatan mental dengan pola hidup sehat dan kelola stres dengan baik
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Important Note */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">
                    Catatan Penting:
                  </h3>
                  <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                    Hasil tes ini hanya sebagai alat ukur secara objektif. Diagnosa lebih lanjut diperlukan 
                    konsultasi ke psikiater/dokter/psikolog klinis terdekat. Total skor jawaban "YA": 
                    <strong className="ml-1">{results.totalScore}</strong> dari 29 pertanyaan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Print Error Message */}
          {printError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg no-print">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-800 text-sm font-medium">Gagal mencetak</p>
                  <p className="text-red-700 text-xs mt-1">{printError}</p>
                  <button
                    onClick={clearError}
                    className="text-red-600 hover:text-red-800 text-xs underline mt-1"
                  >
                    Tutup pesan ini
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t">
            <button
              onClick={() => handlePrint(results, personalInfo)}
              disabled={isPrinting}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border border-sky-600 text-sky-600 rounded-lg font-medium hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base inline-flex items-center justify-center gap-2"
            >
              <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
              {isPrinting ? 'Mencetak...' : 'Cetak Hasil'}
            </button>
            
            <button
              onClick={onFinish}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              Selesai
            </button>
            
            <button
              onClick={onContinue}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span className="truncate">Lanjutkan ke Pendaftaran Online</span>
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            </button>
          </div>
          
          <div className="no-print print-hide">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;