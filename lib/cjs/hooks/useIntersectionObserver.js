"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIntersectionObserver = void 0;
var react_1 = require("react");
var DEFAULT_ROOT_MARGIN = '0px';
var DEFAULT_THRESHOLD = [0];
/**
 * It returns an IntersectionObserverEntry object if the element is in the viewport, otherwise it
 * returns undefined.
 * @param {IIntersectionObserverProperties}  - IIntersectionObserverProperties
 * @returns The entry is being returned.
 */
function useIntersectionObserver(_a) {
    var ref = _a.ref, _b = _a.options, options = _b === void 0 ? {
        threshold: DEFAULT_THRESHOLD,
        root: null,
        rootMargin: DEFAULT_ROOT_MARGIN,
        triggerOnce: false
    } : _b;
    var threshold = options.threshold, root = options.root, rootMargin = options.rootMargin, triggerOnce = options.triggerOnce;
    var _c = (0, react_1.useState)(), entry = _c[0], setEntry = _c[1];
    var frozen = (entry === null || entry === void 0 ? void 0 : entry.isIntersecting) && triggerOnce;
    var updateEntry = function (_a) {
        var entry = _a[0];
        setEntry(entry);
    };
    (0, react_1.useEffect)(function () {
        var node = ref === null || ref === void 0 ? void 0 : ref.current;
        var hasIOSupport = !!window.IntersectionObserver;
        if (!hasIOSupport || frozen || !node)
            return;
        var observerParams = { threshold: threshold, root: root, rootMargin: rootMargin };
        var observer = new IntersectionObserver(updateEntry, observerParams);
        observer.observe(node);
        return function () { return observer.disconnect(); };
    }, [ref === null || ref === void 0 ? void 0 : ref.current, JSON.stringify(threshold), root, rootMargin, frozen]);
    return entry;
}
exports.useIntersectionObserver = useIntersectionObserver;
