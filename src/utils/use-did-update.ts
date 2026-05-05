import { useEffect, useRef } from "react";
import type { DependencyList } from "react";

/**
 * Run an effect only on dependency change, skipping the initial mount.
 *
 * The cleanup-on-unmount resets the mounted ref so the hook behaves correctly
 * under React 18+ StrictMode in dev: the framework deliberately runs each
 * effect twice (mount → cleanup → re-mount) on the initial render, and a
 * `useRef` value persists across that cycle. Without the reset the second
 * "mount" would see `mounted.current === true` and treat itself as a real
 * dependency change — firing the effect spuriously on first render.
 *
 * The dependency list is intentionally provided by the caller — that is the
 * whole point of this hook — so eslint's exhaustive-deps cannot statically
 * verify completeness.
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

  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );
}
/* eslint-enable react-hooks/exhaustive-deps */
