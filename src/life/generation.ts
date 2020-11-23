import times from 'lodash/times';
import { random, State } from './cell';

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
