import { Router } from "express";
import * as quizController from "../controller/quiz.controller.mjs";

const router = Router();

router.post("/", quizController.createQuizController);
router.get("/", quizController.getAllQuizController);
router.get("/less", quizController.getAllQuizLessController);

// ✅ uploaderId (STRING)
router.get(
  "/uploader/:uploaderId",
  quizController.getQuizByUploaderIdController
);

router.get("/:id", quizController.getQuizByIdController);
router.patch("/:id", quizController.updateQuizController);
router.delete("/:id", quizController.deleteQuizController);

// Question PATCH
router.patch(
  "/:quizId/questions/:questionId",
  quizController.updateQuestionController
);

export default router;
