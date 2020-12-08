/**
 * A normal array with a `get` method added allowing negative indexes and indexes greater than the
 * length of the array.
 */
export default class WrappableArray<T> extends Array<T> {
  /**
   * Get the item at the specified index. Negative indexes will index backwards from the end of the
   * array. Indexes greater than the length of the array will wrap around and index from the start.
   *
   * @example
   *
   * const arr = new WrappableArray(1, 2, 3);
   *
   * arr.get(1);
   * // => 2
   *
   * arr.get(-1);
   * // => 3
   *
   * arr.get(4);
   * // => 1
   */
  get(index: number): T {
    const maxIndex = this.length - 1;

    if (index < 0) {
      return this[maxIndex + index + 1]!;
    }

    if (index > maxIndex) {
      return this[index - maxIndex - 1]!;
    }

    return this[index]!;
  }
}
