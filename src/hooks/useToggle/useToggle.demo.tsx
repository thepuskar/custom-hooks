import React from 'react'
import { useToggle } from './useToggle'

export const UseToggleDemo = () => {
  const [value, toggle] = useToggle(false)

  return (
    <div>
      <p>Current Value: {value?.toString()}</p>
      <button onClick={() => toggle()} type='button'>
        Toggle
      </button>
    </div>
  )
}
