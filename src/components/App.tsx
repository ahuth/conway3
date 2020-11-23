import { create as createGeneration, randomize } from '../life/generation';

const generation = randomize(createGeneration(3, 3));

export default function App() {
  console.log(generation);
  return <h1>hello world</h1>;
}
