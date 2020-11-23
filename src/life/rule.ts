import { State } from './cell';

type Rule = {
  current: State;
  neighbors: number;
  next: State;
}

export function create(current: State, neighbors: number, next: State): Rule {
  return { current, neighbors, next };
}
