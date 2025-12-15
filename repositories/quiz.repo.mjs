import Quiz from "../models/quiz.model.mjs";
import Counter from "../models/couter.model.mjs";
import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../utils/custom_error.mjs";

export const createQuizRepo = async (data) => {
  if (!data) {
    throw new CustomError("Request body is missing", 400);
  }

  if (!data.uploaderId || typeof data.uploaderId !== "string") {
    throw new CustomError("uploaderId (string) is required", 400);
  }

  if (!Array.isArray(data.quiz) || data.quiz.length === 0) {
    throw new CustomError("Quiz array is required", 400);
  }

  const counter = await Counter.findByIdAndUpdate(
    { _id: "quizId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const questionsWithId = data.quiz.map((q) => {
    if (
      typeof q.question !== "string" ||
      !Array.isArray(q.options) ||
      q.options.length < 2 ||
      !Number.isInteger(q.correctAnswer)
    ) {
      throw new CustomError("Invalid question format", 400, q);
    }

    if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
      throw new CustomError(
        "correctAnswer index out of range",
        400,
        q
      );
    }

    return {
      questionId: uuidv4(),
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer
    };
  });

const quiz = new Quiz({
  ...data,

  // ✅ YAHI LINE ADD KARO
  quizTime: data.quizTime ?? new Date().toISOString(),

  quizId: counter.seq,
  numberOfQuestions: questionsWithId.length,
  quiz: questionsWithId
});

  return await quiz.save();
};

export const getAllQuizRepo = async () => {
  return await Quiz.find().sort({ createdAt: -1 });
};
export const getAllQuizLessRepo = async () => {
  return await Quiz.find(
    {},
    { quiz: 0 } // ❌ questions exclude
  ).sort({ createdAt: -1 });
};

export const getQuizByIdRepo = async (id) => {
  const quiz = await Quiz.findOne({ quizId: id });
  if (!quiz) throw new CustomError("Quiz not found", 404);
  return quiz;
};

export const getQuizByUploaderIdRepo = async (uploaderId) => {
  const quizzes = await Quiz.find({ uploaderId }).sort({ createdAt: -1 });
  if (!quizzes.length) {
    throw new CustomError("No quiz found for this uploader", 404);
  }
  return quizzes;
};

export const updateQuizRepo = async (id, data) => {
  const quiz = await Quiz.findOneAndUpdate(
    { quizId: id },
    { $set: data },
    { new: true }
  );
  if (!quiz) throw new CustomError("Quiz not found", 404);
  return quiz;
};

export const deleteQuizRepo = async (id) => {
  const quiz = await Quiz.findOneAndDelete({ quizId: id });
  if (!quiz) throw new CustomError("Quiz not found", 404);
  return quiz;
};

export const updateQuestionRepo = async (quizId, questionId, data) => {
  const quiz = await Quiz.findOneAndUpdate(
    { quizId, "quiz.questionId": questionId },
    {
      $set: {
        "quiz.$.question": data.question,
        "quiz.$.options": data.options,
        "quiz.$.correctAnswer": data.correctAnswer
      }
    },
    { new: true }
  );

  if (!quiz) {
    throw new CustomError("Question not found in this quiz", 404);
  }

  return quiz;
};
