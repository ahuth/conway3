export default function wrap(num: number, max: number): number {
  if (num < 0) {
    return max + num + 1;
  }
  if (num > max) {
    return num - max - 1;
  }
  return num;
}
