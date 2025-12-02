import { Router } from "express";

import userRoutes from "./user.routes.mjs"
import balanceRoutes from "./balance.routes.mjs"
import orderRoutes from "./order.routes.mjs";
import withdrawalRoutes from "./withdrawal.routes.mjs"
import tranRoutes from "./transaction.routes.mjs"
// import transRoutes from "./transaction.routes"
const router = Router();
router.use("/user",userRoutes)
router.use("/orders", orderRoutes);
router.use("/balance",balanceRoutes)
router.use("/withdrawal",withdrawalRoutes)
router.use("/trans",tranRoutes)
export default router;
