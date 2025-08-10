import React, { useState, useCallback } from 'react';
import { User, Calendar, MapPin, FileText, AlertTriangle, CheckCircle, X, ExternalLink, Printer } from 'lucide-react';
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

      // HTML content untuk print
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
            .header-table {
              width: 100%;
              margin-bottom: 15px;
            }
            .header-table td {
              vertical-align: middle;
            }
            .logo {
              width: 80px;
              height: 80px;
              object-fit: contain;
            }
            .title {
              text-align: center;
              padding: 0 20px;
            }
            .main-title {
              font-size: 18pt;
              font-weight: bold;
              margin: 0 0 8px 0;
            }
            .sub-title {
              font-size: 16pt;
              font-weight: bold;
              margin: 0 0 8px 0;
            }
            .institution {
              font-size: 12pt;
              margin: 0;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-size: 14pt;
              font-weight: bold;
              margin: 0 0 15px 0;
              padding: 8px 0;
              border-bottom: 2px solid black;
              text-transform: uppercase;
            }
            .info-table {
              width: 100%;
              margin-bottom: 20px;
            }
            .info-table td {
              vertical-align: top;
              padding-right: 20px;
              width: 50%;
            }
            .info-table p {
              margin: 0 0 8px 0;
              font-size: 11pt;
            }
            .info-table strong {
              display: inline-block;
              width: 100px;
              font-weight: bold;
            }
            .result-item {
              margin-bottom: 15px;
              padding: 10px;
              border: 2px solid black;
            }
            .result-title {
              font-size: 12pt;
              font-weight: bold;
              margin: 0 0 5px 0;
            }
            .result-desc {
              font-size: 11pt;
              margin: 0;
            }
            .note {
              margin: 25px 0;
              padding: 15px;
              border: 2px solid black;
            }
            .note-title {
              font-size: 12pt;
              font-weight: bold;
              margin: 0 0 8px 0;
              text-transform: uppercase;
            }
            .note-text {
              font-size: 11pt;
              margin: 0;
              line-height: 1.4;
            }
            .footer {
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px solid black;
              text-align: center;
              font-size: 10pt;
            }
            .footer p {
              margin: 3px 0;
            }
            @media print {
              body { margin: 0; }
              @page { margin: 2cm; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <table class="header-table">
              <tr>
                <td style="width: 100px; text-align: center;">
                  <img src="/file.png" alt="Logo Kiri" class="logo" />
                </td>
                <td class="title">
                  <h1 class="main-title">HASIL SKRINING KESEHATAN JIWA</h1>
                  <h2 class="sub-title">Self Reporting Questionnaire 29 (SRQ-29)</h2>
                  <p class="institution">RSJ Sambang Lihum - Provinsi Kalimantan Selatan</p>
                </td>
                <td style="width: 100px; text-align: center;">
                  <img src="/logo-rsj.png" alt="Logo RSJ" class="logo" />
                </td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h3 class="section-title">Informasi Responden</h3>
            <table class="info-table">
              <tr>
                <td>
                  <p><strong>Tanggal:</strong> ${getCurrentDateInIndonesia()}</p>
                  <p><strong>Nama:</strong> ${personalInfo.name}</p>
                  <p><strong>Gender:</strong> ${personalInfo.gender}</p>
                </td>
                <td>
                  <p><strong>Umur:</strong> ${personalInfo.age} tahun</p>
                  <p><strong>Instansi:</strong> ${personalInfo.institution}</p>
                  <p><strong>Total Skor:</strong> ${results.totalScore}/29</p>
                </td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h3 class="section-title">Hasil Skrining</h3>
            ${results.gme ? `
              <div class="result-item">
                <p class="result-title">☑ Masalah psikologis (cemas/depresi)</p>
                <p class="result-desc">Rujukan: Psikiater/Psikolog klinis</p>
              </div>
            ` : ''}
            ${results.substance ? `
              <div class="result-item">
                <p class="result-title">☑ Penggunaan zat psikoaktif</p>
                <p class="result-desc">Rujukan: Psikiater/Konselor adiksi</p>
              </div>
            ` : ''}
            ${results.psychotic ? `
              <div class="result-item">
                <p class="result-title">☑ Gejala psikotik (SEGERA)</p>
                <p class="result-desc">Rujukan: Psikiater (segera)</p>
              </div>
            ` : ''}
            ${results.ptsd ? `
              <div class="result-item">
                <p class="result-title">☑ Gejala PTSD</p>
                <p class="result-desc">Rujukan: Psikiater/Trauma specialist</p>
              </div>
            ` : ''}
            ${!results.gme && !results.substance && !results.psychotic && !results.ptsd ? `
              <div class="result-item">
                <p class="result-title">☑ Tidak terdeteksi masalah signifikan</p>
                <p class="result-desc">Tetap jaga kesehatan mental dengan pola hidup sehat</p>
              </div>
            ` : ''}
          </div>

          <div class="note">
            <p class="note-title">Catatan Penting:</p>
            <p class="note-text">
              Hasil ini hanya sebagai alat ukur objektif. Konsultasi lebih lanjut dengan 
              psikiater/psikolog klinis diperlukan untuk diagnosa yang akurat.
            </p>
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
  onContinue
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

          {/* Results Section */}
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