type Options = Pick<AddEventListenerOptions, 'capture' | 'passive' | 'once'>;
/**
 * It adds an event listener to an element and returns a cleanup function that removes the event
 * listener when the component unmounts
 * @param {K} eventName - The name of the event you want to listen to.
 * @param handler - The event handler function.
 * @param {HTMLElement | Document | Window | null} [element] - The element to listen to events on.
 * @param {Options} [options] - An optional parameter that is an object that specifies characteristics
 * about the event listener.
 */
declare function useEventListener<K extends keyof HTMLElementEventMap>(eventName: K, handler: HTMLElementEventMap[K], element: HTMLElement | null, options?: Options): void;
declare function useEventListener<K extends keyof DocumentEventMap>(eventName: K, handler: DocumentEventMap[K], element: Document, options?: Options): void;
declare function useEventListener<K extends keyof WindowEventMap>(eventName: K, handler: WindowEventMap[K], element: undefined, options?: Options): void;
declare function useEventListener(eventName: string, handler: EventListenerOrEventListenerObject, element?: HTMLElement | Window | Document | null, options?: Options): void;
export default useEventListener;
