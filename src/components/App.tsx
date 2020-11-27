import { useState } from 'react';
import { create, from, randomize } from '../life/conway';

const initial = randomize(create(100, 100));

export default function App() {
  const [current, setCurrent] = useState(initial);

  return (
    <div>
      <button
        onClick={() => {
          setCurrent(from(current));
        }}
      >
        Generate
      </button>
      <code>{current}</code>
    </div>
  );
}
