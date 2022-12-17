"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useEventListener(eventName, handler, element, options) {
    var saveHandler = (0, react_1.useRef)(handler);
    (0, react_1.useEffect)(function () {
        saveHandler.current = handler;
    }, [handler]);
    (0, react_1.useEffect)(function () {
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
exports.default = useEventListener;
