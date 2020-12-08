import times from 'lodash/times';
import WrappableArray from '../WrappableArray';

/**
 * A single generation of a 2-dimensional cellular automata.
 */
export type Generation<T> = WrappableArray<WrappableArray<T>>;

/**
 * Create a single "generation" of a 2-dimensional cellular automata.
 */
export function create<Cell>(height: number, width: number, initial: Cell): Generation<Cell> {
  const newKidsOnTheBlock: Generation<Cell> = new WrappableArray();

  times(height, () => {
    const row = (new WrappableArray<Cell>(width)).fill(initial);
    newKidsOnTheBlock.push(row);
  });

  return newKidsOnTheBlock;
}

/**
 * Return a generation that is the result of running a mapping function for every element in an
 * existing generation.
 */
export function map<InputCell, OutputCell>(
  source: Generation<InputCell>,
  mapper: (curent: InputCell, generation: Generation<InputCell>, row: number, col: number) => OutputCell,
  // @ts-ignore Each cell value in `target` will be overriden, so the `null` initial value is fine,
  // even though that may or may not match the type of the generation being created.
  target = create<OutputCell>(source.length, source[0]!.length, null),
): Generation<OutputCell> {
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

type ReduceNeighbors<Cell, Output> = (
  current: Cell,
  upLeft: Cell,
  up: Cell,
  upRight: Cell,
  toLeft: Cell,
  toRight: Cell,
  downLeft: Cell,
  down: Cell,
  downRight: Cell,
) => Output;

/**
 * Convert from one generation to another according to some rules.
 */
export function from<InputCell, OutputCell>(
  source: Generation<InputCell>,
  reduceNeighbors: ReduceNeighbors<InputCell, OutputCell>,
  target?: Generation<OutputCell>,
): Generation<OutputCell> {
  return map(
    source,
    (current, generation, rowIndex, colIndex) => {
      const neighborUpLeft    = generation.get(rowIndex - 1).get(colIndex - 1);
      const neighborUp        = generation.get(rowIndex - 1).get(colIndex);
      const neighborUpRight   = generation.get(rowIndex - 1).get(colIndex + 1);
      const neighborToLeft    = generation.get(rowIndex).get(colIndex - 1);
      const neighborToRight   = generation.get(rowIndex).get(colIndex + 1);
      const neighborDownLeft  = generation.get(rowIndex + 1).get(colIndex - 1);
      const neighborDown      = generation.get(rowIndex + 1).get(colIndex);
      const neighborDownRight = generation.get(rowIndex + 1).get(colIndex + 1);

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
