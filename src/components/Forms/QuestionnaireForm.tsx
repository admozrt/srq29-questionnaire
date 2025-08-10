import React from 'react';
import { PersonalInfo, QuestionnaireAnswers } from '../../types';
import { SRQ29_QUESTIONS } from '../../data/questions';
import Footer from '../Footer/Footer';

interface QuestionnaireFormProps {
  personalInfo: PersonalInfo;
  answers: QuestionnaireAnswers;
  onAnswerChange: (questionIndex: number, answer: boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
  personalInfo,
  answers,
  onAnswerChange,
  onBack,
  onSubmit
}) => {
  const allQuestionsAnswered = () => {
    return SRQ29_QUESTIONS.every((_, index) => 
      answers[index] !== undefined && answers[index] !== null
    );
  };

  const answeredCount = Object.keys(answers).filter(key => 
    answers[key] !== null && answers[key] !== undefined
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-sky-600 mb-2">SRQ-29 Kuesioner</h1>
            <p className="text-gray-600 text-sm sm:text-base px-4">
              Jawablah setiap pertanyaan dengan jujur berdasarkan pengalaman Anda dalam 30 hari terakhir
            </p>
          </div>

          {/* Respondent Info */}
          <div className="mb-6">
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-sky-800 mb-2 text-sm sm:text-base">Informasi Responden:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="truncate">
                  <span className="font-medium">Nama:</span> 
                  <span className="ml-1 break-words">{personalInfo.name}</span>
                </div>
                <div>
                  <span className="font-medium">Umur:</span> 
                  <span className="ml-1">{personalInfo.age}</span>
                </div>
                <div>
                  <span className="font-medium">Gender:</span> 
                  <span className="ml-1">{personalInfo.gender}</span>
                </div>
                <div className="truncate">
                  <span className="font-medium">Instansi/Domisili:</span> 
                  <span className="ml-1 break-words">{personalInfo.institution}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-gray-600 text-center sm:text-left">
                Progress: <span className="font-semibold">{answeredCount}/{SRQ29_QUESTIONS.length}</span> pertanyaan terjawab
              </p>
              <div className="w-full sm:w-64 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / SRQ29_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4 sm:space-y-6">
            {SRQ29_QUESTIONS.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow bg-white">
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 text-sm sm:text-base leading-relaxed">
                    <span className="text-sky-600 font-semibold text-base sm:text-lg">{index + 1}.</span> 
                    <span className="ml-2">{question}</span>
                  </h3>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                  <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-sky-50 transition-colors">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="yes"
                      checked={answers[index] === true}
                      onChange={() => onAnswerChange(index, true)}
                      className="w-4 h-4 text-sky-600 border-gray-300 focus:ring-sky-500"
                    />
                    <span className="text-sm sm:text-base font-medium text-sky-600">YA</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="no"
                      checked={answers[index] === false}
                      onChange={() => onAnswerChange(index, false)}
                      className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                    />
                    <span className="text-sm sm:text-base font-medium text-gray-600">TIDAK</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t">
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Kembali
            </button>
            
            {/* Progress info untuk mobile */}
            <div className="text-center sm:hidden">
              <p className="text-sm text-gray-600 mb-2">
                {answeredCount}/{SRQ29_QUESTIONS.length} terjawab
              </p>
              <div className="w-32 bg-gray-200 rounded-full h-2 mx-auto">
                <div 
                  className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / SRQ29_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={onSubmit}
              disabled={!allQuestionsAnswered()}
              className="w-full sm:w-auto px-6 py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              Lihat Hasil
            </button>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default QuestionnaireForm;