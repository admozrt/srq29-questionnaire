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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-sky-600 text-white py-4 sm:py-6 rounded-t-lg">
          {/* Logo and Title Section */}
          <LogoHeader size="large" className="px-3 sm:px-6">
            <div className="text-center px-2">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                SELAMAT DATANG
              </h1>
              <p className="text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed">
                Sistem Skrining Kesehatan Jiwa <br/> Rumah Sakit Jiwa Sambang Lihum - 
                Daerah Provinsi Kalimantan Selatan
              </p>
            </div>
          </LogoHeader>
        </div>
        
        {/* Main Form Container */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-b-lg shadow-lg">
          {/* Questionnaire Introduction */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-sky-600 mb-3 sm:mb-4">
              Self Reporting Questionnaire 29 (SRQ-29)
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 space-y-2 text-left sm:text-center">
              <p className="leading-relaxed">
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
          <div className="space-y-3 sm:space-y-4 mb-6">
            {[
              "Pastikan usia Anda minimal 18 tahun untuk mengisi kuesioner ini",
              "Bacalah petunjuk ini sebaik-baiknya sebelum mulai mengisi",
              "Pertanyaan-pertanyaan berikut berhubungan dengan masalah yang mungkin mengganggu Anda selama 30 hari terakhir",
              "Jika Anda merasa pertanyaan itu berlaku Untuk Anda dan Anda mengalami masalah yang disebutkan dalam 30 hari terakhir, maka pilihlah jawaban Ya. Sebaliknya, apabila Anda menganggap pertanyaan itu tidak berlaku bagi Anda dan tidak mengalami masalah yang disebutkan dalam 30 hari terakhir, maka pilihlah jawaban yang paling sesuai di antara Ya dan Tidak",
              "Jawab langsung setiap pertanyaan, jangan Anda biarkan terlalu lama dan jangan pikirkan hanya untuk memberikan kesan yang baik",
            ].map((instruction, index) => (
              <div key={index} className="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="leading-relaxed">{instruction}</span>
              </div>
            ))}
          </div>

          {/* Personal Info Form */}
          <div className="space-y-4 sm:space-y-6">
            {/* Name and Gender */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => onPersonalInfoChange('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm sm:text-base transition-colors"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  value={personalInfo.gender}
                  onChange={(e) => onPersonalInfoChange('gender', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm sm:text-base transition-colors"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
              </div>
            </div>

            {/* Age and Institution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Umur <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={personalInfo.age}
                  onChange={(e) => onPersonalInfoChange('age', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm sm:text-base transition-colors"
                  placeholder="Masukkan umur"
                  min="18"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Instansi/Domisili <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personalInfo.institution}
                  onChange={(e) => onPersonalInfoChange('institution', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm sm:text-base transition-colors"
                  placeholder="Masukkan instansi/domisili"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="w-full mt-6 sm:mt-8 bg-sky-600 text-white py-3 sm:py-4 px-6 rounded-lg font-medium hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
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