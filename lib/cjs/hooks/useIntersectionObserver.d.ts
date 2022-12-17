import { RefObject } from 'react';
interface IIntersectionObserverProperties {
    /**
     * Ref object from `useRef`.
     */
    ref?: RefObject<Element> | null;
    /**
     * Configuration options for the intersection observer
     * instance.
     */
    options?: IntersectionObserverOptions;
}
interface IntersectionObserverOptions {
    /**
     * If `true`, check for intersection only once. Will
     * disconnect the IntersectionObserver instance after
     * intersection.
     */
    triggerOnce?: boolean;
    /**
     * Number from 0 to 1 representing the percentage
     * of the element that needs to be visible to be
     * considered as visible. Can also be an array of
     * thresholds.
     */
    threshold?: number | number[];
    /**
     * Element that is used as the viewport for checking visibility
     * of the provided `ref` or `element`.
     */
    root?: Element | null | undefined;
    /**
     * Margin around the root. Can have values similar to
     * the CSS margin property.
     */
    rootMargin?: string;
}
/**
 * It returns an IntersectionObserverEntry object if the element is in the viewport, otherwise it
 * returns undefined.
 * @param {IIntersectionObserverProperties}  - IIntersectionObserverProperties
 * @returns The entry is being returned.
 */
export declare function useIntersectionObserver({ ref, options }: IIntersectionObserverProperties): IntersectionObserverEntry | undefined;
export {};
