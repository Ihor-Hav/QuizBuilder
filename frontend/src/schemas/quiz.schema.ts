import { z } from "zod";

const OptionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean().default(false),
  order: z.number().int().min(1),
});

const QuestionSchema = z.object({
  text: z.string().min(2, "Question must have at least 2 symbols"),
  type: z.enum(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "TEXT"]),
  order: z.number().int().min(1),
  points: z.number().int().min(1).default(1),
  options: z
    .array(OptionSchema)
    .min(2, "Question must have at least 2 options"),
});

export const QuizFormSchema = z.object({
  title: z.string().min(2, "Field must have at least 2 symbols"),
  description: z.string().optional(),
  questions: z
    .array(QuestionSchema)
    .min(1, "Quiz must have at least 1 question"),
});

export type QuizFormData = z.infer<typeof QuizFormSchema>;
export type QuestionFormData = z.infer<typeof QuestionSchema>;
