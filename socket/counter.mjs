import { GLOBAL_RANDOM_CODE } from "../config/global.mjs";

import * as quizService from "../services/quiz.service.mjs";

import { QuizDataModel } from "../data_model/quiz_data_model.mjs";
let currentCounter = 12;
let currentTotalCount = 0;
let quizInitTimer=0;
let quizModel;
let quizId=1;
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
    quizInitTimer++;

if(quizInitTimer==1){
 quizModel=await questionInit(quizId)
 if(quizId==10){
  quizId=1;
 }
quizId++;

}

    if (currentCounter == 5) {
      console.log("<<<<<<<10")
      try {
       
        io.emit("question", {
          period: `${GLOBAL_RANDOM_CODE}${currentTotalCount}`,
          question: quizModel.getNextQuestion(),
        });
      } catch (_) {
 console.log(`catch called`)
      }
      return;
    }

    io.emit("countdown", {
      counter: `${currentCounter}`,
      period: `${GLOBAL_RANDOM_CODE}${currentTotalCount}`,
    });

    if (currentCounter <= 0) {
      currentCounter = 12;
    }

    if(quizInitTimer==180){
      quizInitTimer=0;
    }
  }, 1000);
};
async function questionInit(quizId){

   const quiz = await quizService.getQuizById(quizId);
  const qmodel= new QuizDataModel(quiz)
   return qmodel
}