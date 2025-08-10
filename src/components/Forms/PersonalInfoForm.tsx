import React from 'react';
import { PersonalInfo } from '../../types';
import { validatePersonalInfo } from '../../utils/helpers';
import Footer from '../Footer/Footer';
import LogoHeader from '../LogoHeader/LogoHeader';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onPersonalInfoChange: (field: keyof PersonalInfo, value: string) => void;
  onNext: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  personalInfo,
  onPersonalInfoChange,
  onNext,
}) => {
  const canProceed = validatePersonalInfo(personalInfo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-sky-600 text-white py-6 rounded-t-lg">
          {/* Logo and Title Section */}
          <LogoHeader size="large" className="px-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">SELAMAT DATANG</h1>
              <p className="text-sm mt-2">
                Sistem Skrining Kesehatan Jiwa - Rumah Sakit Jiwa Sambang Lihum - 
                Daerah Provinsi Kalimantan Selatan
              </p>
            </div>
          </LogoHeader>
        </div>
        
        {/* Main Form Container */}
        <div className="bg-white p-8 rounded-b-lg shadow-lg">
          {/* Questionnaire Introduction */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-sky-600 mb-4">
              Self Reporting Questionnaire 29 (SRQ-29)
            </h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                Self Reporting Questionnaire 29 (SRQ-29) merupakan kuesioner yang dikembangkan 
                oleh World Health Organization (WHO) sebagai alat ukur atau masalah gangguan jiwa 
                dan kesulitan di validasi penggunanya dan kemungkinan penggunaan ini psikiatrik 
                gejala psikotik gangguan mental emosional (aspek kecemasan dan depresi), 
                penggunaan zat psikiatif, gejala psikotik (gangguan jiwa), dan gejala PTSD 
                (Post traumatic stress disorder)
              </p>
            </div>
          </div>

          {/* Instructions List */}
          <div className="space-y-4 mb-6">
            {[
              "Pastikan usia anda 18 tahun",
              "Bacalah petunjuk ini sebaik-baiknya sebelum mulai mengisi",
              "Pertanyaan-pertanyaan berikut berhubungan dengan masalah yang mungkin mengganggu Anda selama 30 hari terakhir",
              "Jika Anda merasa pertanyaan itu berlaku Untuk Anda dan Anda mengalami masalah yang disebutkan dalam 30 hari terakhir, maka pilihlah jawaban Ya. Sebaliknya, apabila Anda menganggap pertanyaan itu tidak berlaku bagi Anda dan tidak mengalami masalah yang disebutkan dalam 30 hari terakhir, maka pilihlah jawaban yang paling sesuai di antara Ya dan Tidak",
              "Jawab lagsung setiap pertanyaan, jangan Anda biarkan terlalu lama dan jangan pikirkan hanya untuk memberikan kesan yang Anda",
            ].map((instruction, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm gap-2">
                <div className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                  {index + 1}
                </div>
                <span>{instruction}</span>
              </div>
            ))}
          </div>

          {/* Personal Info Form */}
          <div className="space-y-4">
            {/* Name and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => onPersonalInfoChange('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  value={personalInfo.gender}
                  onChange={(e) => onPersonalInfoChange('gender', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
              </div>
            </div>

            {/* Age and Institution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Umur
                </label>
                <input
                  type="number"
                  value={personalInfo.age}
                  onChange={(e) => onPersonalInfoChange('age', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Masukkan umur"
                  min="18"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instansi/Domisili
                </label>
                <input
                  type="text"
                  value={personalInfo.institution}
                  onChange={(e) => onPersonalInfoChange('institution', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Masukkan instansi/domisili"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="w-full mt-6 bg-sky-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Mulai Kuesioner
          </button>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default PersonalInfoForm;