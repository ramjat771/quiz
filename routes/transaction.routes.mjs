import { Router } from "express";
import * as trxController from "../controller/transaction.controller.mjs";

const router = Router();

router.post("/", trxController.createTransactionController);
router.get("/", trxController.getAllTransactionsController);
router.get("/:id", trxController.getTransactionByIdController);
router.get("/email/:email", trxController.getTransactionByEmailController);
router.patch("/:id", trxController.updateTransactionController);
router.delete("/:id", trxController.deleteTransactionController);

export default router;
