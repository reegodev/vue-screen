import multiply from '../src/Multiply';

it('Should multiply positive numbers', () => {
  const a = 3;
  const b = 2;
  expect(multiply(a, b)).toBe(6);

  const c = 6;
  const d = 4;
  expect(multiply(c, d)).toBe(24);
});

it('Should multiply negative numbers', () => {
  const a = -3;
  const b = 4;
  expect(multiply(a, b)).toBe(-12);

  const c = -2;
  const d = -3;
  expect(multiply(c, d)).toBe(6);
});

it('Should return 0 if one of the numbers is 0', () => {
  const a = 0;
  const b = 4;
  expect(multiply(a, b)).toBe(0);

  const c = 3;
  const d = 0;
  expect(multiply(c, d)).toBe(0);
});

it('Should have invariance property', () => {
  const a = 5;
  const b = 7;
  expect(multiply(b, a)).toBe(multiply(a, b));
});

it('Should have a neuter number', () => {
  const a = 4;
  const b = 1;
  expect(multiply(a, b)).toBe(a);

  const c = 7;
  const d = 1;
  expect(multiply(c, d)).toBe(c);
});
