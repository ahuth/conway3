import times from 'lodash/times';
import wrap from './wrap';

/**
 * A single generation of a 2-dimensional cellular automata.
 */
export type Generation<T> = T[][];

/**
 * Create a single "generation" of a 2-dimensional cellular automata.
 */
export function create<T>(height: number, width: number, initial: T): Generation<T> {
  const newKidsOnTheBlock: Generation<T> = [];

  times(height, () => {
    const row = (new Array<T>(width)).fill(initial);
    newKidsOnTheBlock.push(row);
  });

  return newKidsOnTheBlock;
}

/**
 * Return a generation that is the result of running a mapping function for every element in an
 * existing generation.
 */
export function map<T, K>(
  source: Generation<T>,
  mapper: (curent: T, generation: Generation<T>, row: number, col: number) => K,
  // @ts-ignore Each cell value in target will be overriden, so the `null` initial value is fine,
  // even though that may or may not match the type of the generation being created.
  target = create<K>(source.length, source[0]!.length, null),
): Generation<K> {
  for (let rowIndex = 0; rowIndex < target.length; rowIndex++) {
    for (let colIndex = 0; colIndex < target[rowIndex]!.length; colIndex++) {
      const current = source[rowIndex]![colIndex]!;

      // In case the dimensions of `target` don't match `source`, check that we should set the value
      // at the current indexes.
      if (target[rowIndex] && typeof target[rowIndex]![colIndex] !== 'undefined') {
        target[rowIndex]![colIndex] = mapper(current, source, rowIndex, colIndex);
      }
    }
  }
  return target;
}

type ReduceNeighbors<T> = (current: T, upLeft: T, up: T, upRight: T, toLeft: T, toRight: T, downLeft: T, down: T, downRight: T) => T;

/**
 * Convert from one generation to another according to some rules.
 */
export function from<T>(
  source: Generation<T>,
  reduceNeighbors: ReduceNeighbors<T>,
  target?: Generation<T>,
): Generation<T> {
  return map(
    source,
    (current, generation, rowIndex, colIndex) => {
      const maxRow = generation.length - 1;
      const maxCol = generation[0]!.length - 1;

      const neighborUpLeft    = generation[wrap(rowIndex - 1, maxRow)]![wrap(colIndex - 1, maxCol)]!;
      const neighborUp        = generation[wrap(rowIndex - 1, maxRow)]![colIndex]!;
      const neighborUpRight   = generation[wrap(rowIndex - 1, maxRow)]![wrap(colIndex + 1, maxCol)]!;
      const neighborToLeft    = generation[rowIndex]![wrap(colIndex - 1, maxCol)]!;
      const neighborToRight   = generation[rowIndex]![wrap(colIndex + 1, maxCol)]!;
      const neighborDownLeft  = generation[wrap(rowIndex + 1, maxRow)]![wrap(colIndex - 1, maxCol)]!;
      const neighborDown      = generation[wrap(rowIndex + 1, maxRow)]![colIndex]!;
      const neighborDownRight = generation[wrap(rowIndex + 1, maxRow)]![wrap(colIndex + 1, maxCol)]!;

      return reduceNeighbors(
        current,
        neighborUpLeft,
        neighborUp,
        neighborUpRight,
        neighborToLeft,
        neighborToRight,
        neighborDownLeft,
        neighborDown,
        neighborDownRight,
      );
    },
    target,
  );
}
