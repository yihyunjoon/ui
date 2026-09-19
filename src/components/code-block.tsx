import { useEffect, useState, type CSSProperties } from "react";

type Tokens = Awaited<ReturnType<typeof import("#/lib/highlight").highlight>>;
export function CodeBlock({
  code,
  language = "tsx",
}: {
  code: string;
  language?: "tsx" | "shellscript";
}) {
  const [highlighted, setHighlighted] = useState<{ code: string; tokens: Tokens } | null>(null);
  useEffect(() => {
    let active = true;
    import("#/lib/highlight")
      .then((module) => module.highlight(code, language))
      .then((tokens) => {
        if (active) setHighlighted({ code, tokens });
      })
      .catch(() => {
        /* Keep the selectable plain-text fallback. */
      });
    return () => {
      active = false;
    };
  }, [code, language]);
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
        <code>
          {highlighted?.code === code
            ? highlighted.tokens.map((line, index) => (
                <span key={index}>
                  {line.map((token, tokenIndex) => (
                    <span
                      key={tokenIndex}
                      className="syntax-token"
                      style={
                        {
                          color: token.variants.light.color,
                          "--syntax-dark": token.variants.dark.color,
                        } as CSSProperties
                      }
                    >
                      {token.content}
                    </span>
                  ))}
                  {index < highlighted.tokens.length - 1 ? "\n" : ""}
                </span>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
}
