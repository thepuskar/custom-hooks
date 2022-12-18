import { useGetLatest } from './useGetLatest'
import * as React from 'react'

export const useAttachDomClick = (callback: any) => {
  const cachedCallback = useGetLatest(callback)

  React.useEffect(() => {
    document.addEventListener('click', cachedCallback.current)
    return () => {
      document.removeEventListener('click', cachedCallback.current)
    }
  }, [])
}
