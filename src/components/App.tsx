import { create, from, randomize } from '../life/conway';

const generation = randomize(create(10, 10));
const nextGeneration = from(generation);

export default function App() {
  console.log(generation, nextGeneration);
  return <h1>hello world</h1>;
}
