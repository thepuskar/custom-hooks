import { useState, useEffect } from 'react';
/**
 * It returns the current scroll position of the window.
 * @returns The scroll position of the window.
 */
export var useGetScrollPosition = function (initialPosition) {
    var _a = useState(initialPosition !== null && initialPosition !== void 0 ? initialPosition : 0), scrollPosition = _a[0], setScrollPosition = _a[1];
    useEffect(function () {
        var updatePosition = function () {
            setScrollPosition(window.pageYOffset);
        };
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return function () { return window.removeEventListener('scroll', updatePosition); };
    }, []);
    return scrollPosition;
};
