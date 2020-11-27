import { useCallback, useState } from 'react';
import useFramerate from '../hooks/useFramerate';
import useToggle from '../hooks/useToggle';
import { create, from, randomize } from '../life/conway';

const initial = randomize(create(100, 100));

export default function App() {
  const [current, setCurrent] = useState(initial);
  const [playing, togglePlaying] = useToggle(false);

  const step = useCallback(() => {
    setCurrent(from);
  }, []);

  useFramerate(playing, 2, step);

  return (
    <div>
      <button
        onClick={togglePlaying}
      >
        {playing ? 'Stop' : 'Play'}
      </button>
      <code>{current}</code>
    </div>
  );
}
