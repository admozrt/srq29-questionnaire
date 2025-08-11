import { useState } from 'react';
import { PersonalInfo, QuestionnaireAnswers, Results, Step } from '../types';
import { calculateResults } from '../utils/calculation';
import { apiService, SubmitScreeningData } from '../services/apiServices';

export const useQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    age: '',
    gender: '',
    institution: ''
  });
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  const [results, setResults] = useState<Results | null>(null);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (questionIndex: number, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = async () => {
    const calculatedResults = calculateResults(answers);
    setResults(calculatedResults);
    setShowResultsModal(true);

    // Submit to backend
    await submitToBackend(calculatedResults);
  };

  const submitToBackend = async (calculatedResults: Results) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      const submitData: SubmitScreeningData = {
        personal_info: personalInfo,
        results: calculatedResults,
        answers: answers
      };

      const response = await apiService.submitScreeningResults(submitData);

      if (response.success) {
        setSubmitSuccess(true);
        // console.log('Hasil skrining berhasil disimpan:', response.data);
      } else {
        throw new Error(response.message || 'Gagal menyimpan hasil skrining');
      }
    } catch (error) {
      // console.error('Error submitting to backend:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Terjadi kesalahan saat menyimpan data. Data tetap dapat dicetak.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentStep('info');
    setAnswers({});
    setResults(null);
    setPersonalInfo({
      name: '',
      age: '',
      gender: '',
      institution: ''
    });
    setShowResultsModal(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const clearSubmitError = () => {
    setSubmitError(null);
  };

  return {
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
    // New states for backend integration
    isSubmitting,
    submitError,
    submitSuccess,
    clearSubmitError,
  };
};