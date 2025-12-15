import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  question: { type: String, required: true },
  options: {
    type: [String],
    required: true,
    validate: v => v.length >= 2
  },
  correctAnswer: { type: Number, required: true }
});

const quizSchema = new mongoose.Schema(
  {
    quizId: { type: Number, unique: true },     // auto-increment
    uploaderId: { type: String, required: true, index: true }, // ✅ STRING
    name: { type: String, required: true },
    description: { type: String },
    categoryId: { type: Number, required: true },
    imgUrl: { type: String },
    numberOfQuestions: { type: Number },
    quiz: { type: [questionSchema], required: true },
       quizTime: {
      type: String,
      default : "2025-01-20T10:30:00Z"
      // required: true, // 👈 quiz time mandatory
    },

  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
