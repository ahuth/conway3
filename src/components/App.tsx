import { rules } from '../life/conway';
import { create as createGeneration, from, randomize } from '../life/generation';

const generation = randomize(createGeneration(10, 10));
const nextGeneration = from(generation, rules);

export default function App() {
  console.log(generation, nextGeneration);
  return <h1>hello world</h1>;
}
