import randomNum from 'lodash/random';
import { create as createGeneration, from as fromGeneration, map, Generation } from '../life/generation';

export enum State {
  inert = 0,
  alive = 1,
}

export type Conway = Generation<State>;

/**
 * Create a single "generation" of a Conway's game of life.
 */
export function create(height: number, width: number): Conway {
  return createGeneration(height, width, State.inert);
}

/**
 * Create a Conway's game of life "generation" that from a previous generation.
 * @see https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 */
export function from(
  source: Conway,
  target?: Conway,
): Conway {
  return fromGeneration(source, reduceNeighbors, target);
}

/**
 * Randomize the values of a generation.
 */
export function randomize(target: Conway) {
  return map(
    target,
    () => randomNum(0, 1) >= 0.5 ? State.alive : State.inert,
    target,
  );
}

function reduceNeighbors(
  current: State,
  upLeft: State,
  up: State,
  upRight: State,
  toLeft: State,
  toRight: State,
  downLeft: State,
  down: State,
  downRight: State,
): State {
  const numNeighbors = upLeft + up + upRight + toLeft + toRight + downLeft + down + downRight;

  switch (numNeighbors) {
    case 0:
    case 1:
      return State.inert;
    case 2:
      return current;
    case 3:
      return State.alive;
    default:
      return State.inert;
  }
}
