import { Results, QuestionnaireAnswers } from '../types';
import { SCORING_RULES } from '../data/questions';

export const calculateResults = (answers: QuestionnaireAnswers): Results => {
  const answersArray = Object.entries(answers).map(([key, value]) => ({ 
    index: parseInt(key), 
    answer: value 
  }));

  const gmeYesCount = answersArray
    .filter(item => 
      item.index >= SCORING_RULES.GME.range[0] && 
      item.index <= SCORING_RULES.GME.range[1] && 
      item.answer === true
    ).length;
  const gme = gmeYesCount >= SCORING_RULES.GME.threshold;

  const substance = answers[SCORING_RULES.SUBSTANCE.range[0]] === true;

  const psychoticYesCount = answersArray
    .filter(item => 
      item.index >= SCORING_RULES.PSYCHOTIC.range[0] && 
      item.index <= SCORING_RULES.PSYCHOTIC.range[1] && 
      item.answer === true
    ).length;
  const psychotic = psychoticYesCount >= SCORING_RULES.PSYCHOTIC.threshold;

  const ptsdYesCount = answersArray
    .filter(item => 
      item.index >= SCORING_RULES.PTSD.range[0] && 
      item.index <= SCORING_RULES.PTSD.range[1] && 
      item.answer === true
    ).length;
  const ptsd = ptsdYesCount >= SCORING_RULES.PTSD.threshold;

  const totalScore = answersArray.filter(item => item.answer === true).length;

  return { gme, substance, psychotic, ptsd, totalScore };
};