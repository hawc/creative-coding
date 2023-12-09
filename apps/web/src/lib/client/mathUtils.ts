export function sine(height: number, amplitude: number) {
  let x = 0;
  let y = 0;

  return (frequency: number) => {
    y = height / 2 + amplitude * Math.sin(x / frequency);
    x = x + 1;

    return y;
  };
};
