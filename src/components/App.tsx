import { State } from '../life/cell';
import { create as createGeneration, from, randomize } from '../life/generation';
import { create as createRule } from '../life/rule';

const rules = [
  createRule(State.inert, 3, State.alive),
  createRule(State.alive, 0, State.inert),
  createRule(State.alive, 1, State.inert),
  createRule(State.alive, 2, State.alive),
  createRule(State.alive, 3, State.alive),
];

const generation = randomize(createGeneration(10, 10));
const nextGeneration = from(generation, rules);

export default function App() {
  console.log(generation, nextGeneration);
  return <h1>hello world</h1>;
}
