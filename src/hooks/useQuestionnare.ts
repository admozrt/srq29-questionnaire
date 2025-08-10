import { useState } from 'react';
import { PersonalInfo, QuestionnaireAnswers, Results, Step } from '../types';
import { calculateResults } from '../utils/calculation';

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

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (questionIndex: number, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    const calculatedResults = calculateResults(answers);
    setResults(calculatedResults);
    setShowResultsModal(true);
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
    resetQuestionnaire
  };
};