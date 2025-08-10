import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SRQ29Questionnaire from '../SRQ29Questionnaire';

// Mock semua dependencies
jest.mock('../../hooks/useQuestionnaire', () => ({
  useQuestionnaire: jest.fn()
}));

jest.mock('../Forms/PersonalInfoForm', () => {
  return function MockPersonalInfoForm({ onNext, personalInfo, onPersonalInfoChange }: any) {
    return (
      <div data-testid="personal-info-form">
        <h1>Personal Info Form</h1>
        <input 
          aria-label="Nama Lengkap"
          value={personalInfo.name}
          onChange={(e) => onPersonalInfoChange('name', e.target.value)}
        />
        <button onClick={onNext} disabled={!personalInfo.name}>
          Mulai Kuesioner
        </button>
      </div>
    );
  };
});

jest.mock('../Forms/QuestionnaireForm', () => {
  return function MockQuestionnaireForm({ onSubmit, answers, onBack }: any) {
    return (
      <div data-testid="questionnaire-form">
        <h1>SRQ-29 Kuesioner</h1>
        <button onClick={onBack}>Kembali</button>
        <button onClick={onSubmit} disabled={Object.keys(answers).length === 0}>
          Lihat Hasil
        </button>
      </div>
    );
  };
});

jest.mock('../Results/ResultsModal', () => {
  return function MockResultsModal({ isOpen, onClose, onFinish, onContinue, results }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="results-modal">
        <h1>Hasil Skrining Kesehatan Jiwa</h1>
        <button onClick={onClose}>Close</button>
        <button onClick={onFinish}>Selesai</button>
        <button onClick={onContinue}>Lanjutkan ke Pendaftaran Online</button>
        <div>Score: {results?.totalScore}</div>
      </div>
    );
  };
});

describe('SRQ29Questionnaire', () => {
  const mockUseQuestionnaire = {
    currentStep: 'info' as 'info' | 'questionnaire',
    setCurrentStep: jest.fn(),
    personalInfo: {
      name: '',
      age: '',
      gender: '',
      occupation: '',
      address: ''
    },
    handlePersonalInfoChange: jest.fn(),
    answers: {},
    handleAnswerChange: jest.fn(),
    results: null as null | { gme: boolean; substance: boolean; psychotic: boolean; ptsd: boolean; totalScore: number }, // 修改这一行
    showResultsModal: false,
    setShowResultsModal: jest.fn(),
    handleSubmit: jest.fn(),
    resetQuestionnaire: jest.fn()
  };


  beforeEach(() => {
    const { useQuestionnaire } = require('../../hooks/useQuestionnaire');
    useQuestionnaire.mockReturnValue(mockUseQuestionnaire);
    jest.clearAllMocks();
  });

  describe('Personal Info Step', () => {
    it('renders personal info form when currentStep is info', () => {
      render(<SRQ29Questionnaire />);
      
      expect(screen.getByTestId('personal-info-form')).toBeInTheDocument();
      expect(screen.getByText('Personal Info Form')).toBeInTheDocument();
    });

    it('passes correct props to PersonalInfoForm', () => {
      render(<SRQ29Questionnaire />);
      
      const nameInput = screen.getByLabelText('Nama Lengkap');
      expect(nameInput).toHaveValue('');
      
      const nextButton = screen.getByText('Mulai Kuesioner');
      expect(nextButton).toBeDisabled();
    });

    it('calls setCurrentStep when moving to questionnaire', async () => {
      const user = userEvent.setup();
      
      // Setup filled form
      mockUseQuestionnaire.personalInfo = {
        name: 'John Doe',
        age: '30',
        gender: 'Pria',
        occupation: 'Engineer',
        address: 'Jakarta'
      };
      
      render(<SRQ29Questionnaire />);
      
      const nextButton = screen.getByText('Mulai Kuesioner');
      await user.click(nextButton);
      
      expect(mockUseQuestionnaire.setCurrentStep).toHaveBeenCalledWith('questionnaire');
    });
  });

  describe('Questionnaire Step', () => {
    beforeEach(() => {
      mockUseQuestionnaire.currentStep = 'questionnaire';
      mockUseQuestionnaire.personalInfo = {
        name: 'John Doe',
        age: '30',
        gender: 'Pria',
        occupation: 'Engineer',
        address: 'Jakarta'
      };
    });

    it('renders questionnaire form when currentStep is questionnaire', () => {
      render(<SRQ29Questionnaire />);
      
      expect(screen.getByTestId('questionnaire-form')).toBeInTheDocument();
      expect(screen.getByText('SRQ-29 Kuesioner')).toBeInTheDocument();
    });

    it('shows back button that calls setCurrentStep', async () => {
      const user = userEvent.setup();
      render(<SRQ29Questionnaire />);
      
      const backButton = screen.getByText('Kembali');
      await user.click(backButton);
      
      expect(mockUseQuestionnaire.setCurrentStep).toHaveBeenCalledWith('info');
    });

    it('shows submit button that calls handleSubmit', async () => {
      const user = userEvent.setup();
      mockUseQuestionnaire.answers = { 0: true, 1: false };
      
      render(<SRQ29Questionnaire />);
      
      const submitButton = screen.getByText('Lihat Hasil');
      await user.click(submitButton);
      
      expect(mockUseQuestionnaire.handleSubmit).toHaveBeenCalled();
    });
  });

  describe('Results Modal', () => {
    beforeEach(() => {
      mockUseQuestionnaire.currentStep = 'questionnaire';
      mockUseQuestionnaire.showResultsModal = true;
      mockUseQuestionnaire.results = {
        gme: true,
        substance: false,
        psychotic: false,
        ptsd: false,
        totalScore: 6
      };
      mockUseQuestionnaire.personalInfo = {
        name: 'John Doe',
        age: '30',
        gender: 'Pria',
        occupation: 'Engineer',
        address: 'Jakarta'
      };
    });

    it('renders results modal when showResultsModal is true', () => {
      render(<SRQ29Questionnaire />);
      
      expect(screen.getByTestId('results-modal')).toBeInTheDocument();
      expect(screen.getByText('Hasil Skrining Kesehatan Jiwa')).toBeInTheDocument();
      expect(screen.getByText('Score: 6')).toBeInTheDocument();
    });

    it('does not render modal when showResultsModal is false', () => {
      mockUseQuestionnaire.showResultsModal = false;
      render(<SRQ29Questionnaire />);
      
      expect(screen.queryByTestId('results-modal')).not.toBeInTheDocument();
    });

    it('calls setShowResultsModal when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<SRQ29Questionnaire />);
      
      const closeButton = screen.getByText('Close');
      await user.click(closeButton);
      
      expect(mockUseQuestionnaire.setShowResultsModal).toHaveBeenCalledWith(false);
    });

    it('calls resetQuestionnaire when finish button is clicked', async () => {
      const user = userEvent.setup();
      render(<SRQ29Questionnaire />);
      
      const finishButton = screen.getByText('Selesai');
      await user.click(finishButton);
      
      expect(mockUseQuestionnaire.setShowResultsModal).toHaveBeenCalledWith(false);
      expect(mockUseQuestionnaire.resetQuestionnaire).toHaveBeenCalled();
    });

    it('opens external URL when continue button is clicked', async () => {
      const user = userEvent.setup();
      const mockWindowOpen = jest.spyOn(window, 'open').mockImplementation(() => null);
      
      render(<SRQ29Questionnaire />);
      
      const continueButton = screen.getByText('Lanjutkan ke Pendaftaran Online');
      await user.click(continueButton);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://antrian.sambanglihum.com/apps/RegOnline/',
        '_blank'
      );
      
      mockWindowOpen.mockRestore();
    });
  });

  describe('Flow Integration', () => {
    it('renders null when currentStep is not recognized', () => {
      mockUseQuestionnaire.currentStep = 'unknown' as any;
      
      const { container } = render(<SRQ29Questionnaire />);
      
      expect(container.firstChild).toBeNull();
    });

    it('properly handles step transitions', () => {
      const { rerender } = render(<SRQ29Questionnaire />);
      
      expect(screen.getByTestId('personal-info-form')).toBeInTheDocument();
      
      mockUseQuestionnaire.currentStep = 'questionnaire';
      rerender(<SRQ29Questionnaire />);
      
      expect(screen.getByTestId('questionnaire-form')).toBeInTheDocument();
      expect(screen.queryByTestId('personal-info-form')).not.toBeInTheDocument();
    });
  });
});