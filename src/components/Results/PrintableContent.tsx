import React from 'react';
// import { User, Calendar, MapPin, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { PersonalInfo, Results } from '../../types';
import { getCurrentDateInIndonesia } from '../../utils/helpers';

interface PrintableContentProps {
  results: Results;
  personalInfo: PersonalInfo;
}

const PrintableContent: React.FC<PrintableContentProps> = ({
  results,
  personalInfo
}) => {
  return (
    <div className="print-only hidden print:block bg-white p-8">
      {/* Header for Print */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1"></div>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              HASIL SKRINING KESEHATAN JIWA
            </h1>
            <h2 className="text-lg font-semibold text-gray-600 mt-2">
              Self Reporting Questionnaire 29 (SRQ-29)
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Rumah Sakit Jiwa Sambang Lihum - Provinsi Kalimantan Selatan
            </p>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          INFORMASI RESPONDEN
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex">
              <span className="font-medium w-32">Tanggal Tes:</span>
              <span>{getCurrentDateInIndonesia()}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">Nama Lengkap:</span>
              <span>{personalInfo.name}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">Jenis Kelamin:</span>
              <span>{personalInfo.gender}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-medium w-32">Umur:</span>
              <span>{personalInfo.age} tahun</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">Instansi/Domisili:</span>
              <span>{personalInfo.institution}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">Total Skor:</span>
              <span className="font-bold">{results.totalScore}/29</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          HASIL SKRINING DAN RUJUKAN
        </h3>
        
        <div className="space-y-4">
          {results.gme && (
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <h4 className="font-semibold text-gray-800">
                ✓ Terdapat masalah psikologis seperti cemas dan depresi
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Rujukan: Psikiater/Psikolog klinis
              </p>
            </div>
          )}

          {results.substance && (
            <div className="border-l-4 border-orange-600 pl-4 py-2">
              <h4 className="font-semibold text-gray-800">
                ✓ Terdapat penggunaan zat psikoaktif/narkoba
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Rujukan: Psikiater/Psikolog klinis, Konselor adiksi
              </p>
            </div>
          )}

          {results.psychotic && (
            <div className="border-l-4 border-red-800 pl-4 py-2">
              <h4 className="font-semibold text-gray-800">
                ✓ Terdapat gejala-gejala gangguan psikotik yang perlu penanganan serius
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Rujukan: Psikiater/Psikolog klinis (SEGERA)
              </p>
            </div>
          )}

          {results.ptsd && (
            <div className="border-l-4 border-purple-600 pl-4 py-2">
              <h4 className="font-semibold text-gray-800">
                ✓ Terdapat gejala-gejala gangguan PTSD (Post Traumatic Stress Disorder)
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Rujukan: Psikiater/Psikolog klinis trauma specialist
              </p>
            </div>
          )}

          {!results.gme && !results.substance && !results.psychotic && !results.ptsd && (
            <div className="border-l-4 border-green-600 pl-4 py-2">
              <h4 className="font-semibold text-gray-800">
                ✓ Tidak terdeteksi masalah kesehatan jiwa yang signifikan
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Tetap jaga kesehatan mental dengan pola hidup sehat dan kelola stres dengan baik
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Important Note */}
      <div className="border border-gray-400 p-4 rounded">
        <h4 className="font-semibold text-gray-800 mb-2">CATATAN PENTING:</h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          Hasil tes ini hanya sebagai alat ukur secara objektif. Diagnosa lebih lanjut diperlukan 
          konsultasi ke psikiater/dokter/psikolog klinis terdekat. Total skor jawaban "YA": 
          <strong> {results.totalScore}</strong> dari 29 pertanyaan.
        </p>
      </div>

      {/* Footer Information */}
      <div className="mt-8 pt-4 border-t border-gray-300 text-center">
        <p className="text-sm text-gray-600">
          Dokumen ini dicetak pada {getCurrentDateInIndonesia()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          © RSJ Sambang Lihum {new Date().getFullYear()} - Sistem Skrining Kesehatan Jiwa
        </p>
      </div>
    </div>
  );
};

export default PrintableContent;