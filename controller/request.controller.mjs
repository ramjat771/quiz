
import * as orderService from "../services/order.service.mjs";
import * as withdrawalService from "../services/withdrawal.service.mjs";
export const requestController=async(requestType)=>{


   const requestJson= JSON.parse(requestType)
switch(requestJson.type){
    case "bet":
console.log(`bet placed start${requestType}`)
 if (requestJson?.type === "bet") {
  await orderService.createOrder({
    userId: requestJson.email,
    orderAmount: requestJson.amount,
    chooseNumber: requestJson.selected,
    period: requestJson.period,
  });
}
console.log(`bet placed successfully${requestType}`)
        break;

    case "add":
   

        break;    
    case "withdrawal":

     const payload = {
      userId:requestJson.email,
      amount:requestJson.amount,
      data: requestType || null,
      type: requestJson.type || "withdrawal"
    };

    
     const result = await withdrawalService.createWithdrawal(payload);
console.log(`withdrawal success`)

        break; 
    default:
        console.log(`default case `)      

}

console.log(`request type is ${requestJson.type} a\n request is ${requestJson}`)
}