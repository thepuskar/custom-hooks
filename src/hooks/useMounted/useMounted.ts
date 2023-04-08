import { useRef, useEffect } from "react";

/**
 * This function returns a boolean value indicating whether a component is currently mounted or not.
 * @returns A boolean value indicating whether the component is currently mounted or not.
 */
export function useMounted(): boolean {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
}
