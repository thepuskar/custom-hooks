import React, { useState, useEffect } from "react";
import { useArray } from "./useArray";

export const UseArrayDemo = () => {
  const [array, setArray] = useState([
    "apple",
    "banana",
    "cherry",
    "cheese",
    "cookie",
  ]);
  const { push, filter, move, remove, clear, shuffle } = useArray();

  const handlePush = () => {
    const pushedData = push(array, "lemon");
    console.log("pushedData", pushedData);
    setArray([...pushedData]);
  };

  const handleFilter = () => {
    setArray(filter(array, (item) => item.startsWith("b")));
  };

  const handleMove = () => {
    setArray([...move(array, 0, 2)]);
  };

  const handleRemove = () => {
    setArray(remove(array as any[], "cherry"));
  };

  const handleClear = () => {
    clear(array);
    setArray([]);
  };

  const handleShuffle = () => {
    setArray([...shuffle(array)]);
  };

  useEffect(() => {
    setArray(array);
  }, [array]);

  return (
    <div>
      <p>Array: {JSON.stringify(array)}</p>
      <button onClick={handlePush}>Push 'date'</button>
      <button onClick={handleFilter}>Filter starts with 'b'</button>
      <button onClick={handleMove}>Move first item to index 2</button>
      <button onClick={handleRemove}>Remove 'cherry'</button>
      <button onClick={handleClear}>Clear array</button>
      <button onClick={handleShuffle}>Shuffle array</button>
    </div>
  );
};
