export type ExerciseType = 'daily' | 'formal' | 'academic';

export interface Exercise {
  scenario: string;
  requirements: string[];
  reference_answer: string;
}

export interface EvaluationResult {
  scores: {
    [key: string]: number;
  };
  suggestions: string[];
  improved_version: string;
} 