import { create as createGeneration } from '../life/generation';

const generation = createGeneration(3, 3);

export default function App() {
  console.log(generation);
  return <h1>hello world</h1>;
}
