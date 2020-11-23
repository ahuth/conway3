import randomNum from 'lodash/random';

export enum State {
  inert,
  alive,
}

export function random(): State {
  return randomNum(0, 1) >= 0.5 ? State.alive : State.inert;
}
