import { State } from '../life/cell';
import { create as createRule } from '../life/rule';

export const rules = [
  createRule(State.inert, 3, State.alive),
  createRule(State.alive, 0, State.inert),
  createRule(State.alive, 1, State.inert),
  createRule(State.alive, 2, State.alive),
  createRule(State.alive, 3, State.alive),
];
