import { useCallback, useState } from 'react';
import useFramerate from '../hooks/useFramerate';
import useToggle from '../hooks/useToggle';
import { create, from, randomize } from '../life/conway';

const initial = randomize(create(100, 100));

export default function App() {
  const [current, setCurrent] = useState(initial);
  const [framerate, setFramerate] = useState(5);
  const [playing, togglePlaying] = useToggle(false);

  const step = useCallback(() => {
    setCurrent(from);
  }, []);

  useFramerate(playing, framerate, step);

  return (
    <div>
      <label htmlFor="framerate-range">Framerate</label>
      <input
        id="framerate-range"
        type="range"
        min="0"
        max="60"
        step="1"
        value={framerate}
        onChange={(event) => setFramerate(Number(event.target.value))}
      />
      <span>{framerate}</span>
      <button
        onClick={togglePlaying}
      >
        {playing ? 'Stop' : 'Play'}
      </button>
      <code>{current}</code>
    </div>
  );
}
