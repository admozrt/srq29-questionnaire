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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-sky-600 mb-2">SRQ-29 Kuesioner</h1>
            <p className="text-gray-600">Jawablah setiap pertanyaan dengan jujur berdasarkan pengalaman Anda dalam 30 hari terakhir</p>
          </div>

          <div className="mb-6">
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
              <h3 className="font-semibold text-sky-800 mb-2">Informasi Responden:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="font-medium">Nama:</span> {personalInfo.name}</div>
                <div><span className="font-medium">Umur:</span> {personalInfo.age}</div>
                <div><span className="font-medium">Gender:</span> {personalInfo.gender}</div>
                <div><span className="font-medium">Instansi/Domisili:</span> {personalInfo.institution}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {SRQ29_QUESTIONS.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-800 flex-1 pr-4">
                    <span className="text-sky-600 font-semibold">{index + 1}.</span> {question}
                  </h3>
                </div>
                
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="yes"
                      checked={answers[index] === true}
                      onChange={() => onAnswerChange(index, true)}
                      className="w-4 h-4 text-sky-600 border-gray-300 focus:ring-sky-500"
                    />
                    <span className="text-sm font-medium text-sky-600">YA</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="no"
                      checked={answers[index] === false}
                      onChange={() => onAnswerChange(index, false)}
                      className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                    />
                    <span className="text-sm font-medium text-gray-600">TIDAK</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Kembali
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Progress: {answeredCount}/{SRQ29_QUESTIONS.length} pertanyaan terjawab
              </p>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / SRQ29_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={onSubmit}
              disabled={!allQuestionsAnswered()}
              className="px-6 py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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