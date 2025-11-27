import { Router } from "express";
import * as orderController from "../controller/order.controller.mjs";

const router = Router();

// Create order
router.post("/", orderController.createOrderController);

// Get orders by userId (email)
router.get("/user/:email", orderController.getOrdersByUserController);

// Get order by period
router.get("/period/:period", orderController.getOrderByPeriodController);

// Update result
router.post("/result", orderController.updateOrderResultController);

// Delete order
router.delete("/:id", orderController.deleteOrderController);

export default router;
