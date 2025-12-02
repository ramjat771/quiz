import { GLOBAL_RANDOM_CODE } from "../config/global.mjs";
import { getRandomResult } from "./result.mjs";
import * as orderService from "../services/order.service.mjs";
let currentCounter = 30;
let currentTotalCount = 0;
// ✅ Export getter so any file can access
export const getCurrentGameState = () => {
  return {
    counter: currentCounter,
    totalCount: currentTotalCount,
    period: `${GLOBAL_RANDOM_CODE}${currentTotalCount}`
  };
};

export const startGlobalCounter = (io) => {
  setInterval(async () => {
    currentCounter--;

    if (currentCounter === 5) {
      try {
        const value = await getRandomResult(`${GLOBAL_RANDOM_CODE}${currentTotalCount}`);
        const updated = await orderService.updateOrderResultByPeriod(`${GLOBAL_RANDOM_CODE}${currentTotalCount}`, value);
       
        io.emit("finalResult", {
          period: `${GLOBAL_RANDOM_CODE}${currentTotalCount}`,
          result: value,
        });
      } catch (_) {
        io.emit("finalResult", {
          period: `${GLOBAL_RANDOM_CODE}${currentTotalCount}`,
          result: undefined,
        });
      }
    }

    io.emit("countdown", {
      counter: currentCounter,
      period: `${GLOBAL_RANDOM_CODE}${currentTotalCount}`,
    });

    if (currentCounter <= 0) {
      currentTotalCount++;
      currentCounter = 30;
    }
  }, 1000);
};
