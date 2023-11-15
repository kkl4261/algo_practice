function pow(x: number, n: number): number {
  if (n === 0) return 1;
  if (n < 0) {
    n = Math.abs(n);
    x = 1 / x;
  }

  if (n % 2 === 0) {
    return pow(x * x, n / 2);
  } else {
    return x * pow(x, n - 1);
  }
}
