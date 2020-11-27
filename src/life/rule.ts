import { State } from './cell';

export type Rule = {
  current: State;
  neighbors: number;
  next: State;
}

/**
 * Create a new rule operating on a 2-dimensional cellular automata.
 */
export function create(current: State, neighbors: number, next: State): Rule {
  return { current, neighbors, next };
}

/**
 * Apply a rule (if found) based on the current state and number of neighbors. Returns the "inert"
 * state if no matching rule is found.
 */
export function apply(rules: Rule[], current: State, neighbors: number): State {
  const rule = rules.find((rule) => rule.current === current && rule.neighbors === neighbors);
  return rule ? rule.next : State.inert;
}
