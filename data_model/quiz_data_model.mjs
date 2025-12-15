// data_model/quiz_data_model.mjs

import { QuestionDataModel } from "./question_data_model.mjs";

export class QuizDataModel {
  constructor(rawQuiz) {
    this.quizId = rawQuiz.quizId;
    this.uploaderId = rawQuiz.uploaderId;
    this.name = rawQuiz.name;
    this.description = rawQuiz.description;
    this.categoryId = rawQuiz.categoryId;
    this.imgUrl = rawQuiz.imgUrl;
    this.numberOfQuestions = rawQuiz.numberOfQuestions;

    // 🔥 mongoose doc / plain object → QuestionDataModel[]
    this.questions = Array.isArray(rawQuiz.quiz)
      ? rawQuiz.quiz.map(q => new QuestionDataModel(q))
      : [];

    this.currentIndex = 0;
  }

  /** ▶️ Sequential question */
  getNextQuestion() {
    if (this.questions.length === 0) return null;

    if (this.currentIndex >= this.questions.length) {
      this.currentIndex = 0;
    }
    return this.questions[this.currentIndex++];
  }

  /** 🎯 Random question */
  getRandomQuestion() {
    if (this.questions.length === 0) return null;
    const index = Math.floor(Math.random() * this.questions.length);
    return this.questions[index];
  }

  /** 🔄 Reset quiz state */
  reset() {
    this.currentIndex = 0;
  }
}
