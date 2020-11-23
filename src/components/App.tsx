import { create as createGeneration, from, randomize } from '../life/generation';

const generation = randomize(createGeneration(3, 3));
const nextGeneration = from(generation, []);

export default function App() {
  console.log(generation, nextGeneration);
  return <h1>hello world</h1>;
}
