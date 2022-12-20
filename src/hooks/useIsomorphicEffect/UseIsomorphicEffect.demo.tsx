import React from 'react'
import { useIsomorphicEffect } from './index'

export const UseIsomorphicEffectDemo = () => {
  useIsomorphicEffect(() => {
    console.log(
      "In browser, I'm using useLayoutEffect, but in SSR, I'm using useEffect."
    )
  })
  return <p>Hello React dev</p>
}
