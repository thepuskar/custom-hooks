import { RefObject, useState } from 'react'
import { useIsomorphicEffect } from './index'

const DEFAULT_ROOT_MARGIN = '0px'
const DEFAULT_THRESHOLD = [0]

interface IIntersectionObserverProperties {
  /**
   * Ref object from `useRef`.
   */
  ref?: RefObject<Element> | null

  /**
   * Configuration options for the intersection observer
   * instance.
   */
  options?: IntersectionObserverOptions
}

interface IntersectionObserverOptions {
  /**
   * If `true`, check for intersection only once. Will
   * disconnect the IntersectionObserver instance after
   * intersection.
   */
  triggerOnce?: boolean

  /**
   * Number from 0 to 1 representing the percentage
   * of the element that needs to be visible to be
   * considered as visible. Can also be an array of
   * thresholds.
   */
  threshold?: number | number[]

  /**
   * Element that is used as the viewport for checking visibility
   * of the provided `ref` or `element`.
   */
  root?: Element | null | undefined

  /**
   * Margin around the root. Can have values similar to
   * the CSS margin property.
   */
  rootMargin?: string
}

/**
 * It returns an IntersectionObserverEntry object if the element is in the viewport, otherwise it
 * returns undefined.
 * @param {IIntersectionObserverProperties}  - IIntersectionObserverProperties
 * @returns The entry is being returned.
 */
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
