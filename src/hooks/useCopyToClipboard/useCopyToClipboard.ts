import { useCallback, useState } from "react";

interface CopyToClipboardState {
  copied: boolean;
  error: Error | null;
}
interface CopyToClipboardStateReturnType extends CopyToClipboardState {
  copy: (text: string) => Promise<void>;
}
interface CopyToClipboardOptions {
  resetTime?: number; // Time in milliseconds to reset the `copied` state
  onSuccess?: (copiedText: string) => void; // Callback for successful copy
  onError?: (error: Error) => void; // Callback for copy error
}

/**
 * A custom hook to copy text to the clipboard with optional callbacks and auto-reset functionality.
 *
 * @param options - Configuration options for the hook
 * @returns An object with the copy function and state (copied, error)
 */
export function useCopyToClipboard(
  options: CopyToClipboardOptions = {}
): CopyToClipboardStateReturnType {
  const { resetTime = 1500, onSuccess, onError } = options;
  const [state, setState] = useState<CopyToClipboardState>({
    copied: false,
    error: null,
  });
  const copy = useCallback(async (text: string) => {
    try {
      if (!navigator?.clipboard) {
        throw new Error("Clipboard API not supported");
      }
      await navigator.clipboard.writeText(text);
      setState({ copied: true, error: null });
      onSuccess?.(text);

      //Resetting copied state after 1.5s
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          copied: false,
        }));
      }, resetTime);
    } catch (error) {
      const copyError =
        error instanceof Error ? error : new Error("Failed to copy");
      setState({ copied: false, error: copyError });
      onError?.(copyError);
    }
  }, []);

  return { ...state, copy };
}
