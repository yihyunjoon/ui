import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it } from "vitest";

import { CodeBlock } from "../src/components/code-block";
import { ExampleViewer } from "../src/components/example-viewer";
import { InstallCommand } from "../src/components/install-command";

afterEach(cleanup);
it("highlights code without interpreting markup and copies the original text", async () => {
  const user = userEvent.setup();
  const code = 'const html = "<img src=x onerror=alert(1)>";';
  const { container } = render(<CodeBlock code={code} />);
  await waitFor(() =>
    expect(container.querySelectorAll(".syntax-token").length).toBeGreaterThan(1),
  );
  expect(container.querySelector("code")?.textContent).toBe(code);
  expect(container.querySelector("img")).toBeNull();
  await user.click(screen.getByRole("button", { name: "Copy code" }));
  expect(await navigator.clipboard.readText()).toBe(code);
});
it("switches package manager commands without changing the registry URL", async () => {
  const user = userEvent.setup();
  render(<InstallCommand command="add https://ui.hyunjoon.net/r/button.json" />);
  for (const [name, runner] of Object.entries({
    pnpm: "pnpm dlx",
    npm: "npx",
    yarn: "yarn dlx",
    bun: "bunx",
  })) {
    await user.click(screen.getByRole("tab", { name }));
    expect(screen.getByRole("tabpanel").textContent).toContain(
      `${runner} shadcn@latest add https://ui.hyunjoon.net/r/button.json`,
    );
  }
});
it("switches from live preview to its exact source using keyboard tabs", async () => {
  const user = userEvent.setup();
  render(<ExampleViewer name="button" code="export const demo = true;" />);
  const preview = screen.getByRole("tab", { name: "Preview" });
  preview.focus();
  await user.keyboard("{ArrowRight}{Enter}");
  expect(screen.getByRole("tab", { name: "Code" }).getAttribute("aria-selected")).toBe("true");
  expect(screen.getByRole("tabpanel").textContent).toContain("export const demo = true;");
});
