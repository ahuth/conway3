import { useCallback, useState } from 'react';

export default function useToggle(initial: boolean): [boolean, () => void] {
  const [state, setState] = useState(initial);

  const toggle = useCallback(() => {
    setState((current) => !current);
  }, [setState]);

  return [state, toggle];
}
