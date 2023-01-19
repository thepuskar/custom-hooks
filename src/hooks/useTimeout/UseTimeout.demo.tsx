import React, { useState } from 'react'
import { useTimeout } from './useTimeout'

export const UseTimeoutDemo = () => {
  const [count, setCount] = useState(10)
  const { reset, clear } = useTimeout(() => setCount(0), 5000)

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={clear}>Clear Timeout</button>
      <button onClick={reset}>Reset Timeout</button>

      <p>{count ? 'Timeout visible for 5000ms' : 'Timeout expired!'}</p>
    </div>
  )
}
