import { useRef, useEffect } from 'react';
function useEventListener(eventName, handler, element, options) {
    var saveHandler = useRef(handler);
    useEffect(function () {
        saveHandler.current = handler;
    }, [handler]);
    useEffect(function () {
        var isSupported = element && element.addEventListener;
        if (!isSupported)
            return;
        var eventListener = function (event) { return saveHandler.current(event); };
        element.addEventListener(eventName, eventListener, options);
        return function () {
            element.removeEventListener(eventName, eventListener, options);
        };
    }, [eventName, element, options]);
}
export default useEventListener;
