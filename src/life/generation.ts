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
  for (let rowIndex = 0; rowIndex < target.length; rowIndex++) {
    for (let colIndex = 0; colIndex < target[rowIndex]!.length; colIndex++) {
      target[rowIndex]![colIndex] = random();
    }
  }
  return target;
}
