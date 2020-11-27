import { State } from '../life/cell';
import { create as createRule } from '../life/rule';
import { from as fromGeneration, Generation } from '../life/generation';

export { create, randomize } from '../life/generation';

/**
 * The rules of Conway's game of life.
 * @see https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules
 */
const rules = [
  createRule(State.inert, 3, State.alive),
  createRule(State.alive, 0, State.inert),
  createRule(State.alive, 1, State.inert),
  createRule(State.alive, 2, State.alive),
  createRule(State.alive, 3, State.alive),
];

/**
 * Create a cellular automata "generation" that behaves according to the rules of Conway's game of
 * life.
 * @see https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 */
export function from(
  source: Generation,
  target?: Generation,
): Generation {
  return fromGeneration(source, rules, target);
}
