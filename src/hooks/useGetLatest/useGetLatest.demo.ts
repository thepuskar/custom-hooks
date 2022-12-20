import { useGetLatest } from './useGetLatest'
import { useIsomorphicEffect } from '../index'

export const useAttachDomClick = (callback: any) => {
  const cachedCallback = useGetLatest(callback)

  useIsomorphicEffect(() => {
    document.addEventListener('click', cachedCallback.current)
    return () => {
      document.removeEventListener('click', cachedCallback.current)
    }
  }, [])
}
