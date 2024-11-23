import React from "react";
import { useCopyToClipboard } from "./useCopyToClipboard";

export function CopyToClipboardDemo() {
  const { copied, error, copy } = useCopyToClipboard({
    resetTime: 3000,
    onSuccess: (text) => alert(`Successfully copied: ${text}`),
    onError: (error) => alert(`Error copying: ${error.message}`),
  });

  async function handleCopy() {
    await copy("Sample text for clipboard!");
  }

  return (
    <div>
      <button onClick={handleCopy}>
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
}
