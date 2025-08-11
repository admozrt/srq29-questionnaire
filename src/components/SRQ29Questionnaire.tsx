// src/components/SRQ29Questionnaire.tsx

import React from 'react';
import { useQuestionnaire } from '../hooks/useQuestionnare';
import PersonalInfoForm from './Forms/PersonalInfoForm';
import QuestionnaireForm from './Forms/QuestionnaireForm';
import ResultsModal from './Results/ResultsModal';

const SRQ29Questionnaire: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    personalInfo,
    handlePersonalInfoChange,
    answers,
    handleAnswerChange,
    results,
    showResultsModal,
    setShowResultsModal,
    handleSubmit,
    resetQuestionnaire,
    // New props for backend integration
    isSubmitting,
    submitError,
    submitSuccess,
    clearSubmitError,
  } = useQuestionnaire();

  const handleFinish = () => {
    setShowResultsModal(false);
    resetQuestionnaire();
  };

  const handleContinue = () => {
    window.open('https://antrian.sambanglihum.com/apps/RegOnline/', '_blank');
  };

  if (currentStep === 'info') {
    return (
      <PersonalInfoForm 
        personalInfo={personalInfo}
        onPersonalInfoChange={handlePersonalInfoChange}
        onNext={() => setCurrentStep('questionnaire')}
      />
    );
  }

  if (currentStep === 'questionnaire') {
    return (
      <>
        <QuestionnaireForm
          personalInfo={personalInfo}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onBack={() => setCurrentStep('info')}
          onSubmit={handleSubmit}
        />
        
        {results && (
          <ResultsModal
            isOpen={showResultsModal}
            onClose={() => setShowResultsModal(false)}
            results={results}
            personalInfo={personalInfo}
            onFinish={handleFinish}
            onContinue={handleContinue}
            // New props for backend integration
            isSubmitting={isSubmitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
            onClearSubmitError={clearSubmitError}
          />
        )}
      </>
    );
  }

  return null;
};

export default SRQ29Questionnaire;