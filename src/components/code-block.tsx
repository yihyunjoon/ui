import { useState } from "react";

export function CodeBlock({ code }: { code: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied");
    } catch {
      setStatus("Select the code to copy it manually.");
    }
  }
  return (
    <div className="overflow-hidden rounded-xl border bg-muted/40">
      <div className="flex min-h-9 items-center justify-end gap-2 border-b px-3 text-xs">
        <span role="status" className="text-muted-foreground">
          {status}
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded px-2 py-1 hover:bg-muted focus-visible:outline-2"
        >
          Copy code
        </button>
      </div>
      <pre className="max-h-[36rem] overflow-auto p-4 text-sm leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}
