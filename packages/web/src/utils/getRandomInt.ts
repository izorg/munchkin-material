export const getRandomInt = (min: number, max: number) => {
  const randomBuffer = new Uint32Array(1);

  globalThis.crypto.getRandomValues(randomBuffer);

  const randomNumber = randomBuffer[0] / (0xff_ff_ff_ff + 1);

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(randomNumber * (max - min + 1)) + min;
};
