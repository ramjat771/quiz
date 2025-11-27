import { GLOBAL_RANDOM_CODE } from "../config/global.mjs";
import { getRandomResult } from "./result.mjs";
// socket/counter.mjs

export const startGlobalCounter = (io) => {
  let counter = 15;
let totalCount=0;
  setInterval(async() => {
    counter--;

    // send counter to all clients
    if (counter === 5) {
      getRandomResult()
        .then((value) => {
          io.emit("finalResult", {
            period: `${GLOBAL_RANDOM_CODE}${totalCount}`,
            result: value
          });
        })
        .catch((exception) => {
          io.emit("finalResult", {
            period: `${GLOBAL_RANDOM_CODE}${totalCount}`,
            result: undefined,
          });
        });
    }

      io.emit("countdown", {
      "counter":counter,
      "period":`${GLOBAL_RANDOM_CODE}${totalCount}`
    } );


    // when reach 0 → reset again to 30
    if (counter <= 0) {
      totalCount=totalCount+1;
      counter = 15;
    }
  }, 1000);
};
