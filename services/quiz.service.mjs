import * as quizRepo from "../repositories/quiz.repo.mjs";

export const createQuiz = (data) => quizRepo.createQuizRepo(data);
export const getAllQuiz = () => quizRepo.getAllQuizRepo();
export const getAllQuizLess = () => quizRepo.getAllQuizLessRepo();
export const getQuizById = (id) => quizRepo.getQuizByIdRepo(id);
export const getQuizByUploaderId = (uploaderId) =>
  quizRepo.getQuizByUploaderIdRepo(uploaderId);
export const updateQuiz = (id, data) => quizRepo.updateQuizRepo(id, data);
export const deleteQuiz = (id) => quizRepo.deleteQuizRepo(id);
export const updateQuestion = (quizId, questionId, data) =>
  quizRepo.updateQuestionRepo(quizId, questionId, data);
