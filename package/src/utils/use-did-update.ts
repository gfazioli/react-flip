import { useEffect, useRef } from 'react';

/**
 * Hook that runs an effect only when dependencies change, not on initial mount
 */
export function useDidUpdate(fn: () => void, dependencies?: React.DependencyList) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return fn();
    }

    mounted.current = true;
    return undefined;
  }, dependencies);
}
