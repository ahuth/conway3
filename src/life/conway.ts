import { State } from '../life/cell';
import { create as createRule } from '../life/rule';
import { from as fromGeneration, Generation } from '../life/generation';

export { create, randomize } from '../life/generation';

const rules = [
  createRule(State.inert, 3, State.alive),
  createRule(State.alive, 0, State.inert),
  createRule(State.alive, 1, State.inert),
  createRule(State.alive, 2, State.alive),
  createRule(State.alive, 3, State.alive),
];

export function from(
  source: Generation,
  target?: Generation,
): Generation {
  return fromGeneration(source, rules, target);
}
