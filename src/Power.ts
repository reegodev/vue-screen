import multiply from './Multiply';

export default function power(base: number, exponent: number): number {
  const exp = Math.abs(exponent);
  if (exp === 0) {
    return 1;
  }

  if (exp === 1) {
    return base;
  }

  let result = base;
  for (let i = 1; i < exp; i++) {
    result = multiply(result, base);
  }

  return result;
}
