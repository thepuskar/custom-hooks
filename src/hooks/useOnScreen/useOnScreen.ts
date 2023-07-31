import { useEffect, useMemo, useState, RefObject } from "react";

/**
 * The `useOnScreen` function is a custom React hook that detects whether an element is currently
 * visible on the screen.
 * @param ref - A RefObject that references the HTML element that you want to track if it is on the
 * screen or not.
 * @returns the value of the `isIntersecting` state variable.
 */
export function useOnScreen(ref: RefObject<HTMLElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    [ref]
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
