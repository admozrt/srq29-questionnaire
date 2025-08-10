export interface PersonalInfo {
  name: string;
  age: string;
  gender: string;
  occupation: string;
  address: string;
}

export interface QuestionnaireAnswers {
  [key: string]: boolean | null;
}

export interface Results {
  gme: boolean;
  substance: boolean;
  psychotic: boolean;
  ptsd: boolean;
  totalScore: number;
}

export type Step = 'info' | 'questionnaire' | 'results';