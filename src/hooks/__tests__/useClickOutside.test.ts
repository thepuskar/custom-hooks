import { renderHook } from "@testing-library/react-hooks";
import { useClickOutside } from "../useClickOutside/useClickOutside";

describe("useClickOutside", () => {
  let mockElement: HTMLDivElement;
  let mockOutsideElement: HTMLDivElement;
  let mockHandler: jest.Mock<void, [Event]>;

  beforeEach(() => {
    mockElement = document.createElement("div");
    mockOutsideElement = document.createElement("div");
    document.body.appendChild(mockElement);
    document.body.appendChild(mockOutsideElement);

    mockHandler = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
    document.body.removeChild(mockOutsideElement);
    jest.clearAllMocks();
  });

  it("should call handler when clicking outside the ref element", () => {
    const { result } = renderHook(() => useClickOutside(mockHandler));

    // Simulate ref assignment
    Object.defineProperty(result.current, "current", {
      value: mockElement,
      writable: true,
    });

    // Trigger mousedown on outside element
    const outsideEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    mockOutsideElement.dispatchEvent(outsideEvent);

    // Expect handler to be called
    expect(mockHandler).toHaveBeenCalledWith(outsideEvent);
  });

  it("should not call handler when clicking inside the ref element", () => {
    const { result } = renderHook(() => useClickOutside(mockHandler));

    // Simulate ref assignment
    Object.defineProperty(result.current, "current", {
      value: mockElement,
      writable: true,
    });

    // Trigger mousedown on inside element
    const insideEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    // Manually set the target property
    Object.defineProperty(insideEvent, "target", {
      value: mockElement,
      writable: false,
    });

    mockElement.dispatchEvent(insideEvent);

    // Expect handler NOT to be called
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("should support multiple event types", () => {
    const { result } = renderHook(() =>
      useClickOutside(mockHandler, ["mousedown", "touchstart"])
    );

    // Simulate ref assignment
    Object.defineProperty(result.current, "current", {
      value: mockElement,
      writable: true,
    });

    // Trigger multiple event types
    const mouseEvent = new MouseEvent("mousedown", { view: window });
    const touchEvent = new TouchEvent("touchstart", {
      touches: [{ clientX: 0, clientY: 0 } as Touch],
      view: window,
    });

    mockOutsideElement.dispatchEvent(mouseEvent);
    mockOutsideElement.dispatchEvent(touchEvent);

    // Expect handler to be called twice
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
