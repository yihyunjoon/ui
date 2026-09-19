export type ApiPart = {
  name: string;
  props: { name: string; type: string; required: boolean; default: string; description: string }[];
};

export function ApiReference({ parts }: { parts: ApiPart[] }) {
  return (
    <section id="api" className="scroll-mt-20 space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">API reference</h2>
      <p className="text-sm text-muted-foreground">
        Derived from the installed component types. Native DOM props are also supported where
        applicable. A dash means no explicit default is documented. Some props depend on the
        selected mode.
      </p>
      {parts.map((part, index) => (
        <details key={part.name} open={index === 0} className="rounded-lg border p-4">
          <summary className="cursor-pointer font-medium">{part.name}</summary>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">{part.name} properties</caption>
              <thead>
                <tr>
                  {["Prop", "Type", "Default", "Description"].map((title) => (
                    <th key={title} scope="col" className="border-b p-2">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {part.props.map((prop) => (
                  <tr key={prop.name} className="align-top">
                    <th scope="row" className="border-b p-2 font-normal">
                      <code>{prop.name}</code>
                      {prop.required && (
                        <span className="block text-xs text-muted-foreground">Required</span>
                      )}
                    </th>
                    <td className="max-w-64 border-b p-2">
                      <details>
                        <summary className="cursor-pointer font-mono text-xs break-all">
                          {prop.type.length > 90 ? `${prop.type.slice(0, 90)}…` : prop.type}
                        </summary>
                        <pre className="mt-2 text-xs break-all whitespace-pre-wrap">
                          {prop.type}
                        </pre>
                      </details>
                    </td>
                    <td className="max-w-40 border-b p-2 break-words">
                      <code>{prop.default}</code>
                    </td>
                    <td className="min-w-48 border-b p-2 whitespace-pre-line text-muted-foreground">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ))}
    </section>
  );
}
