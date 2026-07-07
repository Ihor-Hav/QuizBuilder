import { prisma } from "../db/prisma";
import { QuizTypes } from "../types/quiz.types";

export async function getAllQuizzes() {
  return await prisma.quiz.findMany({
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });
}

export async function createQuiz(data: QuizTypes) {
  try {
    const createdData = await prisma.quiz.create({
      data: {
        title: data.title,
        description: data.description,

        questions: {
          create: data.questions.map((question) => ({
            text: question.text,
            type: question.type,
            order: question.order,
            points: question.points,

            options: {
              create: question.options.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect,
                order: option.order,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return createdData;
  } catch (e) {
    console.log(e);
    throw new Error("Couldn't create quiz");
  }
}

export async function getQuizById(id: string) {
  try {
    const quiz = await prisma.quiz.findFirst({
      where: {
        id,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return quiz;
  } catch (e) {
    throw new Error("Coulnd't find the quiz");
  }
}
export async function deleteQuizById(id: string) {
  try {
    await prisma.quiz.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    throw new Error("Coulnd't find the quiz");
  }
}
