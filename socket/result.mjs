// controllers/resultController.mjs

export const getRandomResult = async () => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
 const randomValue = Math.floor(Math.random() * 10);
  return randomValue;
};
