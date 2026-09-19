import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeAll, expect, it, vi } from "vitest";

import { ExampleViewer } from "#/components/example-viewer";
import { componentDocs, loadVariantSource } from "#/docs/catalog";
import content from "#/docs/variant-content.json";
import CheckboxExample from "#/docs/variants/checkbox";
import FormExample from "#/docs/variants/form";
import InputExample from "#/docs/variants/input";
import MessageExample from "#/docs/variants/message-scroller";
beforeAll(() => {
  window.scrollTo = () => {};
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
    }),
  });
  HTMLElement.prototype.scrollIntoView = () => {};
  HTMLElement.prototype.scrollTo = () => {};
});
afterEach(cleanup);

const variants = import.meta.glob<{ default: ComponentType }>("../src/docs/variants/*.tsx");
it("provides a portable additional example for every component", async () => {
  expect(Object.keys(content).sort()).toEqual(componentDocs.map((doc) => doc.name).sort());
  expect(Object.keys(variants).length).toBe(componentDocs.length);
  for (const doc of componentDocs) {
    const code = await loadVariantSource(doc.name);
    expect(code).toContain(`@/components/ui/${doc.name}`);
    expect(code).not.toContain("@/registry/");
  }
});
for (const doc of componentDocs)
  it(`renders ${doc.name} variant on server and client`, async () => {
    const { default: Example } = await variants[`../src/docs/variants/${doc.name}.tsx`]();
    expect(renderToString(<Example />).length).toBeGreaterThan(0);
    expect(render(<Example />).container.childElementCount).toBeGreaterThan(0);
  });
it("switches examples, simulates loading, and shows the selected source", async () => {
  const user = userEvent.setup();
  const variantCode = await loadVariantSource("button");
  render(<ExampleViewer name="button" code="Basic source" variantCode={variantCode} />);
  await user.selectOptions(screen.getByLabelText("Example"), "variant");
  await user.click(await screen.findByRole("button", { name: "Simulate save" }));
  expect((screen.getByRole("button", { name: "Saving…" }) as HTMLButtonElement).disabled).toBe(
    true,
  );
  await user.click(screen.getByRole("button", { name: "Complete preview" }));
  expect(
    (screen.getByRole("button", { name: "Simulate save" }) as HTMLButtonElement).disabled,
  ).toBe(false);
  await user.click(screen.getByRole("tab", { name: "Code" }));
  expect(screen.getByRole("tabpanel").textContent).toContain(variantCode);
});
it("updates select-all and mixed checkbox state", async () => {
  const user = userEvent.setup();
  render(<CheckboxExample />);
  expect(screen.getByRole("checkbox", { name: "Select all" }).getAttribute("aria-checked")).toBe(
    "mixed",
  );
  await user.click(screen.getByRole("checkbox", { name: "Select all" }));
  expect(screen.getByRole("status").textContent).toBe("2 teams selected");
});
it("validates controlled input and form blur", async () => {
  const user = userEvent.setup();
  const view = render(<InputExample />);
  await user.type(screen.getByRole("textbox", { name: "Username" }), "ab");
  expect(screen.getByRole("textbox", { name: "Username" }).getAttribute("aria-invalid")).toBe(
    "true",
  );
  await user.type(screen.getByRole("textbox", { name: "Username" }), "c");
  expect(screen.getByRole("textbox", { name: "Username" }).getAttribute("aria-invalid")).toBe(
    "false",
  );
  view.unmount();
  render(<FormExample />);
  await user.type(screen.getByRole("textbox", { name: "Name" }), "ab");
  await user.tab();
  expect(await screen.findByText("Use at least three characters.")).toBeTruthy();
});
it("appends messages to a growing conversation", async () => {
  const user = userEvent.setup();
  render(<MessageExample />);
  await user.click(screen.getByRole("button", { name: "Add message" }));
  expect(screen.getByText("Message 9: your latest project update.")).toBeTruthy();
});
