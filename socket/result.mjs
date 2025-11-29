// controllers/resultController.mjs

export const getRandomResult = async () => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // generate random result (0–9 example)
 // const randomValue = Math.floor(Math.random() * 10);
const randomValue=3;
  return randomValue;
};
