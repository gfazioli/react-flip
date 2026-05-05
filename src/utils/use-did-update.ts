import { useEffect, useRef } from "react";
import type { DependencyList } from "react";

/**
 * Run an effect only on dependency change, skipping the initial mount.
 *
 * The dependency list is provided by the caller — eslint cannot statically
 * verify completeness, but that is the entire point of this hook.
 */
/* eslint-disable react-hooks/exhaustive-deps */
export function useDidUpdate(fn: () => void, dependencies?: DependencyList) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return fn();
    }

    mounted.current = true;
    return undefined;
  }, dependencies);
}
/* eslint-enable react-hooks/exhaustive-deps */
