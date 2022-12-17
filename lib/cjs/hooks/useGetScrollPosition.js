"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetScrollPosition = void 0;
var react_1 = require("react");
/**
 * It returns the current scroll position of the window.
 * @returns The scroll position of the window.
 */
var useGetScrollPosition = function (initialPosition) {
    var _a = (0, react_1.useState)(initialPosition !== null && initialPosition !== void 0 ? initialPosition : 0), scrollPosition = _a[0], setScrollPosition = _a[1];
    (0, react_1.useEffect)(function () {
        var updatePosition = function () {
            setScrollPosition(window.pageYOffset);
        };
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return function () { return window.removeEventListener('scroll', updatePosition); };
    }, []);
    return scrollPosition;
};
exports.useGetScrollPosition = useGetScrollPosition;
