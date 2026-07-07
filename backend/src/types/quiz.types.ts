import { QuestionType } from "../generated/prisma/enums";

export type QuizTypes = {
  title: string;
  description?: string;

  questions: QuestionTypes[];
};

export type QuestionTypes = {
  text: string;
  type: QuestionType;
  order: number;
  points: number;

  options: OptionTypes[];
};

export type OptionTypes = {
  text: string;
  isCorrect: boolean;
  order: number;
};
