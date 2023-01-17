import { RefObject, useState } from 'react'
import { useIsomorphicEffect } from '../index'

const DEFAULT_ROOT_MARGIN = '0px'
const DEFAULT_THRESHOLD = [0]

interface IIntersectionObserverProperties {
  ref?: RefObject<Element> | null
  options?: IntersectionObserverOptions
}

interface IntersectionObserverOptions {
  triggerOnce?: boolean
  threshold?: number | number[]
  root?: Element | null | undefined
  rootMargin?: string
}

export function useIntersectionObserver({
  ref,
  options = {
    threshold: DEFAULT_THRESHOLD,
    root: null,
    rootMargin: DEFAULT_ROOT_MARGIN,
    triggerOnce: false
  }
}: IIntersectionObserverProperties): IntersectionObserverEntry | undefined {
  const { threshold, root, rootMargin, triggerOnce } = options

  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const frozen = entry?.isIntersecting && triggerOnce

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useIsomorphicEffect(() => {
    const node = ref?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)
    observer.observe(node)

    return () => observer.disconnect()
  }, [ref?.current, JSON.stringify(threshold), root, rootMargin, frozen])
  return entry
}
