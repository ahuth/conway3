import { useEffect, useState } from 'react';
import useToggle from '../hooks/useToggle';
import { create, from, randomize } from '../life/conway';

const initial = randomize(create(100, 100));

export default function App() {
  const [current, setCurrent] = useState(initial);
  const [playing, togglePlaying] = useToggle(false);

  useEffect(() => {
    if (!playing) {
      return;
    }

    let id = window.requestAnimationFrame(step);

    function step() {
      setCurrent(from);
      id = window.requestAnimationFrame(step);
    }

    return () => {
      window.cancelAnimationFrame(id);
    };
  }, [playing, setCurrent, togglePlaying]);

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
