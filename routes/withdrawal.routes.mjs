import { Router } from "express";
import * as withdrawalController from "../controller/withdrawal.controller.mjs";

const router = Router();

// Create withdrawal request
router.post("/", withdrawalController.createWithdrawalController);

// Get withdrawal list of user
router.get("/user/:userId", withdrawalController.getWithdrawalsByUserController);

// Update (only admin)
router.post("/status", withdrawalController.updateWithdrawalStatusController);

export default router;
