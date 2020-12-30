import { useState } from 'react';
import useFramerate from '../hooks/useFramerate';
import useToggle from '../hooks/useToggle';
import { create, from, randomize, State } from '../life/conway';

const size = 50;
const initial = randomize(create(size, size));

export default function App() {
  const [current, setCurrent] = useState(initial);
  const [framerate, setFramerate] = useState(5);
  const [playing, togglePlaying] = useToggle(false);

  useFramerate(playing, framerate, () => {
    setCurrent(from);
  });

  return (
    <div style={styles.app}>
      <label htmlFor="framerate-range">Framerate</label>
      <input
        id="framerate-range"
        type="range"
        min="1"
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
      <pre style={styles.grid}>
        {current.map((row) => {
          return row.map((cell) => {
            return cell === State.inert ? '·' : '■';
          });
        })}
      </pre>
    </div>
  );
}

const styles = {
  app: {
    margin: '1rem 2rem',
  },
  grid: {
    display: 'block',
    lineHeight: 0.6,
    // Add .5 to the width value. Doing so ensures that Chrome and Safari display the same number
    // of characters per line that Firefox does...
    maxWidth: `${size}.5ch`,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
};
