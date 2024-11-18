import React from "react";
import { useClickOutside } from "./useClickOutside";

export const UseClickOutsideDemo = () => {
  const handleInsideClick = () => {
    console.log("Clicked inside!!!");
  };
  const handleOutsideClick = () => {
    console.log("Clicked outside");
  };
  const ref = useClickOutside<HTMLDivElement>(() => {
    handleOutsideClick();
  }, ["mousedown", "touchstart"]);
  return (
    <div>
      <div ref={ref}>
        <button onClick={handleInsideClick}>Click Inside</button>
      </div>
    </div>
  );
};
