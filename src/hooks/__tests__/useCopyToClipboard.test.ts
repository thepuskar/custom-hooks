import { renderHook, act } from "@testing-library/react-hooks";
import { useCopyToClipboard } from "hooks/useCopyToClipboard";

describe("useCopyToClipboard", () => {
  beforeAll(() => {
    // Mock the Clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully copy text to the clipboard", async () => {
    const { result } = renderHook(() =>
      useCopyToClipboard({
        resetTime: 500,
        onSuccess: jest.fn(),
        onError: jest.fn(),
      })
    );

    await act(async () => {
      await result.current.copy("Test Text");
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Test Text");
    expect(result.current.copied).toBe(true);
    expect(result.current.error).toBeNull();

    // Wait for reset time to complete
    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(result.current.copied).toBe(false);
  });

  it("should handle clipboard API errors", async () => {
    const error = new Error("Clipboard API failed");
    jest.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(error);

    const onErrorMock = jest.fn();
    const { result } = renderHook(() =>
      useCopyToClipboard({
        onError: onErrorMock,
      })
    );

    await act(async () => {
      await result.current.copy("Test Text");
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toEqual(error);
    expect(onErrorMock).toHaveBeenCalledWith(error);
  });

  it("should invoke onSuccess callback when copy is successful", async () => {
    const onSuccessMock = jest.fn();

    const { result } = renderHook(() =>
      useCopyToClipboard({
        onSuccess: onSuccessMock,
      })
    );

    await act(async () => {
      await result.current.copy("Success Text");
    });

    expect(onSuccessMock).toHaveBeenCalledWith("Success Text");
    expect(result.current.copied).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("should throw error if Clipboard API is not supported", async () => {
    const originalClipboard = navigator.clipboard; // Backup the original Clipboard API
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true, // Allows modification
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy("Test Text");
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toEqual(
      new Error("Clipboard API not supported")
    );

    // Restore the Clipboard API
    Object.defineProperty(navigator, "clipboard", {
      value: originalClipboard,
      configurable: true,
    });
  });
});
