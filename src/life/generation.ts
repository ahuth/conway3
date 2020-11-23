import times from 'lodash/times';
import { random, State } from './cell';
import { apply as applyRule, Rule } from './rule';
import wrap from './wrap';

export type Generation = State[][];

export function create(height: number, width: number): Generation {
  const newKidsOnTheBlock: Generation = [];

  times(height, () => {
    const row = (new Array<State>(width)).fill(State.inert);
    newKidsOnTheBlock.push(row);
  });

  return newKidsOnTheBlock;
}

export function randomize(target: Generation): Generation {
  return map(target, random, target);
}

export function map(
  source: Generation,
  mapper: (curent: State, generation: Generation, row: number, col: number) => State,
  target = create(source.length, source[0]!.length),
): Generation {
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

export function from(
  source: Generation,
  rules: Rule[],
  target?: Generation,
): Generation {
  return map(
    source,
    (current, generation, rowIndex, colIndex) => {
      const numNeighbors = countNeighbors(generation, rowIndex, colIndex);
      return applyRule(rules, current, numNeighbors);
    },
    target,
  );
}

function countNeighbors(generation: Generation, rowIndex: number, colIndex: number): number {
  const maxRow = generation.length - 1;
  const maxCol = generation[0]!.length - 1;

  // Up and to the left
  const neighbor1 = generation[wrap(rowIndex - 1, maxRow)]![wrap(colIndex - 1, maxCol)]!;
  // Straight up
  const neighbor2 = generation[wrap(rowIndex - 1, maxRow)]![colIndex]!;
  // Up and to the right
  const neighbor3 = generation[wrap(rowIndex - 1, maxRow)]![wrap(colIndex + 1, maxCol)]!;
  // Straight left
  const neighbor4 = generation[rowIndex]![wrap(colIndex - 1, maxCol)]!;
  // Straight right
  const neighbor5 = generation[rowIndex]![wrap(colIndex + 1, maxCol)]!;
  // Down and to the left
  const neighbor6 = generation[wrap(rowIndex + 1, maxRow)]![wrap(colIndex - 1, maxCol)]!;
  // Straight down
  const neighbor7 = generation[wrap(rowIndex + 1, maxRow)]![colIndex]!;
  // Down and to the right
  const neighbor8 = generation[wrap(rowIndex + 1, maxRow)]![wrap(colIndex + 1, maxCol)]!;

  return neighbor1 + neighbor2 + neighbor3 + neighbor4 + neighbor5 + neighbor6 + neighbor7 + neighbor8;
}
