import { type Request, Response } from "express";
import {
  getAllQuizzes,
  createQuiz as serviceCreateQuiz,
  getQuizById as serviceGetQuizById,
  deleteQuizById as serviceDeleteQuizById,
} from "../services/quiz.service";

export async function createQuiz(req: Request, res: Response) {
  try {
    const data = req.body;

    const createdQuiz = await serviceCreateQuiz(data);

    return res.status(201).json({
      success: true,
      message: "Quiz created",
      data: createdQuiz,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function getQuizzes(req: Request, res: Response) {
  const data = await getAllQuizzes();

  return res.status(200).json({
    success: true,
    data: data,
  });
}

type QuizByIdParams = {
  id: string;
};

export async function getQuizById(req: Request<QuizByIdParams>, res: Response) {
  try {
    const { id } = req.params;

    const quiz = await serviceGetQuizById(id);

    return res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Couldn't find this quiz ;(",
    });
  }
}

export async function deleteQuiz(req: Request<QuizByIdParams>, res: Response) {
  try {
    const { id } = req.params;

    await serviceDeleteQuizById(id);

    return res.status(200).json({
      success: true,
      message: "successfully deleted quiz",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Couldn't find this quiz ;(",
    });
  }
}
