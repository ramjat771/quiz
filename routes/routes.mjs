import { Router } from "express";

import userRoutes from "./user.routes.mjs"
import balanceRoutes from "./balance.routes.mjs"
import orderRoutes from "./order.routes.mjs";
import withdrawalRoutes from "./withdrawal.routes.mjs"
const router = Router();
router.use("/user",userRoutes)
router.use("/orders", orderRoutes);
router.use("/balance",balanceRoutes)
router.use("/withdrawal",balanceRoutes)
export default router;
