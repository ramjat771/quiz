import * as quizService from "../services/quiz.service.mjs";
import { successResponse } from "../utils/api_response.mjs";

export const createQuizController = async (req, res, next) => {
  try {
    const quiz = await quizService.createQuiz(req.body);
    return successResponse(res, quiz, "Quiz created successfully");
  } catch (err) {
    next(err);
  }
};

export const getAllQuizController = async (req, res, next) => {
  try {
    const quiz = await quizService.getAllQuiz();
    return successResponse(res, quiz, "Quiz fetched successfully");
  } catch (err) {
    next(err);
  }
};
export const getAllQuizLessController = async (req, res, next) => {
  try {
    const quiz = await quizService.getAllQuizLess();
    return successResponse(res, quiz, "Quiz fetched successfully");
  } catch (err) {
    next(err);
  }
};

export const getQuizByIdController = async (req, res, next) => {
  try {
    const quiz = await quizService.getQuizById(Number(req.params.id));
    return successResponse(res, quiz, "Quiz fetched successfully");
  } catch (err) {
    next(err);
  }
};

export const getQuizByUploaderIdController = async (req, res, next) => {
  try {
    const quizzes = await quizService.getQuizByUploaderId(
      req.params.uploaderId // ✅ STRING
    );
    return successResponse(res, quizzes, "Quiz fetched successfully");
  } catch (err) {
    next(err);
  }
};

export const updateQuizController = async (req, res, next) => {
  try {
    const quiz = await quizService.updateQuiz(
      Number(req.params.id),
      req.body
    );
    return successResponse(res, quiz, "Quiz updated successfully");
  } catch (err) {
    next(err);
  }
};

export const deleteQuizController = async (req, res, next) => {
  try {
    await quizService.deleteQuiz(Number(req.params.id));
    return successResponse(res, null, "Quiz deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const updateQuestionController = async (req, res, next) => {
  try {
    const quiz = await quizService.updateQuestion(
      Number(req.params.quizId),
      req.params.questionId,
      req.body
    );
    return successResponse(res, quiz, "Question updated successfully");
  } catch (err) {
    next(err);
  }
};
