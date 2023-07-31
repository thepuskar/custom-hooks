import React, { useRef } from "react";
import { useOnScreen } from "./useOnScreen";

export const UseOnScreenDemo = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isElementOnScreen = useOnScreen(elementRef);

  return (
    <div>
      <div style={{ height: "100vh" }}>Scroll down to see the effect</div>
      <div
        ref={elementRef}
        style={{
          height: "100px",
          background: isElementOnScreen ? "green" : "red",
        }}
      >
        This element turns green when it's on the screen.
      </div>
    </div>
  );
};
