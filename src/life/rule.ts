import { State } from './cell';

export type Rule = {
  current: State;
  neighbors: number;
  next: State;
}

export function create(current: State, neighbors: number, next: State): Rule {
  return { current, neighbors, next };
}

export function apply(rules: Rule[], current: State, neighbors: number): State {
  const rule = rules.find((rule) => rule.current === current && rule.neighbors === neighbors);
  return rule ? rule.next : State.inert;
}
