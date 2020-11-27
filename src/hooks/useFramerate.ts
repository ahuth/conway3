import { useEffect, useRef } from 'react';

export default function useFramerate(on: boolean, perSecond: number, callback: () => void): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!on) {
      return;
    }

    let start: number | undefined = undefined;
    let id = window.requestAnimationFrame(step);

    function step(timestamp: number) {
      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      if (elapsed >= 1000 / perSecond) {
        callbackRef.current();
        start = timestamp + 1;
      }

      id = window.requestAnimationFrame(step);
    }

    return () => {
      window.cancelAnimationFrame(id);
    };
  }, [on, perSecond]);
}
