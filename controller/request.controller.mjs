import { getCurrentGameState } from "../socket/counter.mjs";
import { CustomError } from "../utils/custom_error.mjs";
import * as orderService from "../services/order.service.mjs";
export const requestController = async (req, res, next, requestType) => {
  const requestJson = JSON.parse(requestType);

  switch (requestJson.type) {
    case "bet":
      let gameState = getCurrentGameState();

      if (requestJson.period == gameState.period&&gameState.counter>9) {
        // only DB entry
        return await orderService.createOrder({
          userId: requestJson.email,
          orderAmount: requestJson.amount,
          chooseNumber: requestJson.selected,
          period: requestJson.period,
        });
      } else {
        throw new CustomError("Invalid period", 400);
      }

    case "withdrawal":
      return await withdrawalService.createWithdrawal({
        userId: requestJson.email,
        amount: requestJson.amount,
        data: requestType,
        type: "withdrawal",
      });

    default:
      return null;
  }
};
