import * as orderService from "../services/order.service.mjs";
import * as balanceService from "../services/balance.service.mjs";
export const getRandomResult = async (period) => {

 
   const order = await orderService.getOrderByPeriod(period);

//  console.log(`orders ${order}`)

  // await new Promise((resolve) => setTimeout(resolve, 2000));
 const randomValue = Math.floor(Math.random() * 10);

        const earnings= calculateUserTotalEarnings(randomValue,order)
        for (const user of earnings) {
    // console.log("User:", user.userId);
    // console.log("Total Win:", user.totalWin);
    const result = await balanceService.addBalance(user.userId,  user.totalWin, "winAmout");
        }

         
      

  return randomValue;
};


function calculateUserTotalEarnings(result, orders) {
  const redWins = [1, 3, 7, 9];
  const greenWins = [2, 4, 6, 8];

  const userTotals = {};

  for (const order of orders) {
    const bet = order.chooseNumber;
    const amount = order.orderAmount;

    // 2% cut first
    const netAmount = amount - (amount * 0.02);
    let winAmount = 0;

    // ------- RED -------
    if (bet === "Red") {
      if (redWins.includes(result)) winAmount = netAmount * 2;
      else if (result === 0 || result === 5) winAmount = netAmount * 1.5;
    }

    // ------- GREEN -------
    else if (bet === "Green") {
      if (greenWins.includes(result)) winAmount = netAmount * 2;
      else if (result === 0 || result === 5) winAmount = netAmount * 1.5;
    }

    // ------- VIOLET -------
    else if (bet === "Violet") {
      if (result === 0 || result === 5) {
        winAmount = netAmount * 2;   // same as Red/Green special case
      }
    }

    // ------- NUMBER -------
    else {
      if (parseInt(bet) === result) {
        winAmount = netAmount * 9; // number matched
      }
    }

    // accumulate user-wise
    if (!userTotals[order.userId]) {
      userTotals[order.userId] = 0;
    }

    userTotals[order.userId] += winAmount;
  }

  // convert to final array
  return Object.keys(userTotals).map(uid => ({
    userId: uid,
    totalWin: Number(userTotals[uid].toFixed(2))
  }));
}

