import add from './Add';

export default function multiply(target: number, times: number): number {
  if (times === 0 || target === 0) {
    return 0;
  }

  const realTimes = Math.abs(Math.floor(times));
  let result = target;
  for (let i = 1; i <= realTimes -1; i++) {
    result = add(result, target);
  }

  return result * (times < 0 ? -1 : 1);
}
