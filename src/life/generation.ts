import times from 'lodash/times';
import { State } from './cell';

export type Generation = State[][];

export function create(height: number, width: number): Generation {
  const newKidsOnTheBlock: Generation = [];

  times(height, () => {
    const row = (new Array<State>(width)).fill(State.inert);
    newKidsOnTheBlock.push(row);
  });

  return newKidsOnTheBlock;
}
