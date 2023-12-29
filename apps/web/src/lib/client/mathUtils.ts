
export const CIRCLE_DEGREES = 360;

export function sine(height: number, amplitude: number) {
  let x = 0;
  let y = 0;

  return (frequency: number) => {
    y = height / 2 + amplitude * Math.sin(x / frequency);
    x = x + 1;

    return y;
  };
};

export function roundDecimals(number: number) {
  return Math.floor(number * 100) / 100;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
