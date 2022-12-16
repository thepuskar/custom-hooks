import { useRef, RefObject, useEffect } from 'react'

type Options = Pick<AddEventListenerOptions, 'capture' | 'passive' | 'once'>

/**
 * It adds an event listener to an element and returns a cleanup function that removes the event
 * listener when the component unmounts
 * @param {K} eventName - The name of the event you want to listen to.
 * @param handler - The event handler function.
 * @param {HTMLElement | Document | Window | null} [element] - The element to listen to events on.
 * @param {Options} [options] - An optional parameter that is an object that specifies characteristics
 * about the event listener.
 */
function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: HTMLElementEventMap[K],
  //allow null to support usage with `useRef<HTMLElement | null>`(null)
  element: RefObject<HTMLElement | null>,
  options?: Options
): void

function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: DocumentEventMap[K],
  element: RefObject<Document>,
  options?: Options
): void

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: WindowEventMap[K],
  element: undefined,
  options?: Options
): void

function useEventListener(
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  element?: HTMLElement | Window | Document | null,
  options?: Options
): void

function useEventListener<
  K extends keyof (HTMLElementEventMap & DocumentEventMap & WindowEventMap)
>(
  eventName: K,
  handler: (
    event: (HTMLElementEventMap & DocumentEventMap & WindowEventMap)[K]
  ) => void,
  element?: HTMLElement | Document | Window | null,
  options?: Options
) {
  const saveHandler = useRef(handler)

  useEffect(() => {
    saveHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener: typeof handler = (event) => saveHandler.current(event)

    element.addEventListener(eventName, eventListener, options)
    return () => {
      element.removeEventListener(eventName, eventListener, options)
    }
  }, [eventName, element, options])
}

export default useEventListener
