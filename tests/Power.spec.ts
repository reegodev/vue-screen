import power from '../src/Power';

it('Should return 1 if exponent is 0', () => {
  expect(power(7, 0)).toBe(1);
});

it('Should return base if exponent is 1', () => {
  expect(power(6, 1)).toBe(6);
});

it('Should calculate power on positive exponents', () => {
  expect(power(5, 3)).toBe(125);
});
