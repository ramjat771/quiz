import { Router } from "express";
import * as balanceController from "../controller/balance.controller.mjs";

const router = Router();

// 1️⃣ Create or return existing balance
router.post("/", balanceController.initOrGetBalanceController);

// 2️⃣ Overwrite/Set balance
router.patch("/", balanceController.updateBalanceController);

// 3️⃣ Add balance
router.post("/add", balanceController.addBalanceController);

// 4️⃣ Subtract balance
router.post("/subtract", balanceController.subtractBalanceController);

export default router;
