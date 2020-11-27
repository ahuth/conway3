import { useState } from 'react';
import useFramerate from '../hooks/useFramerate';
import useToggle from '../hooks/useToggle';
import { create, from, randomize } from '../life/conway';

const size = 100;
const initial = randomize(create(size, size));

export default function App() {
  const [current, setCurrent] = useState(initial);
  const [framerate, setFramerate] = useState(5);
  const [playing, togglePlaying] = useToggle(false);

  useFramerate(playing, framerate, () => {
    setCurrent(from);
  });

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
      <code style={styles.grid}>{current}</code>
    </div>
  );
}

const styles = {
  grid: {
    display: 'block',
    maxWidth: `${size}ch`,
    wordBreak: 'break-word',
  },
};
