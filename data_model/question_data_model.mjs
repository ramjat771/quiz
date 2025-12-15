// data_model/question_data_model.mjs

export class QuestionDataModel {
  constructor({
    questionId,
    question,
    options,
    correctAnswer,
  }) {
    this.questionId = questionId;
    this.question = question;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }
}
