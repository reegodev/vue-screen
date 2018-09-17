import add from '../src/Add';

it('Should add positive numbers', () => {
  const a = 1;
  const b = 1;
  expect(add(a, b)).toBe(2);

  const c = 2;
  const d = 3;
  expect(add(c, d)).toBe(5);
});

it('Should add negative numbers', () => {
  const a = -1;
  const b = -1;
  expect(add(a, b)).toBe(-2);

  const c = -2;
  const d = 3;
  expect(add(c, d)).toBe(1);
});

it('Should have invariance property', () => {
  const a = 5;
  const b = 7;
  expect(add(a, b)).toBe(12);
  expect(add(b, a)).toBe(12);
});

it('Should have a neuter number', () => {
  const a = 4;
  const b = 0;
  expect(add(a, b)).toBe(a);

  const c = 7;
  const d = 0;
  expect(add(c, d)).toBe(c);
});
