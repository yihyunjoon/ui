import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { componentDocs, loadExampleSource } from "#/docs/catalog";
import registry from "#/registry/registry.json";
import { routeTree } from "#/routeTree.gen";

vi.mock("../src/routes/__root", async () => {
  const { createRootRoute } = await import("@tanstack/react-router");
  return { Route: createRootRoute() };
});

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

const examples = import.meta.glob<{ default: ComponentType }>("../src/docs/examples/*.tsx");
it("documents every UI component with a portable, executable example", async () => {
  const names = registry.items
    .filter((item) => item.type === "registry:ui")
    .map((item) => item.name)
    .sort();
  expect(componentDocs.map((item) => item.name).sort()).toEqual(names);
  expect(
    Object.keys(examples)
      .map((path) => path.split("/").pop()!.replace(".tsx", ""))
      .sort(),
  ).toEqual(names);
  for (const doc of componentDocs) {
    expect(doc.description.length).toBeGreaterThan(35);
    expect(doc.guidance.length).toBeGreaterThan(70);
    const code = await loadExampleSource(doc.name);
    expect(code).toContain(`@/components/ui/${doc.name}`);
    expect(code).not.toContain("@/registry/");
  }
});

describe("all component previews", () => {
  for (const doc of componentDocs) {
    it(`renders ${doc.name} on the server and client`, async () => {
      const { default: Example } = await examples[`../src/docs/examples/${doc.name}.tsx`]();
      expect(renderToString(<Example />).length).toBeGreaterThan(0);
      const view = render(<Example />);
      expect(view.container.childElementCount).toBeGreaterThan(0);
    });
  }
});

async function openDocs(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
    defaultPendingMinMs: 0,
  });
  await router.load();
  render(<RouterProvider router={router} />);
  return router;
}

it("navigates from the sidebar, updates the URL, and supports browser history", async () => {
  const user = userEvent.setup();
  const router = await openDocs("/docs/components/button");
  await screen.findByRole("heading", { name: "Button", level: 1 });
  const navigation = screen.getByRole("navigation", { name: "Documentation navigation" });
  await user.click(within(navigation).getByRole("link", { name: "Accordion" }));
  await screen.findByRole("heading", { name: "Accordion", level: 1 });
  expect(router.state.location.pathname).toBe("/docs/components/accordion");
  expect(navigation.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  expect(
    within(navigation).getByRole("link", { name: "Accordion" }).getAttribute("aria-current"),
  ).toBe("page");
  router.history.back();
  await screen.findByRole("heading", { name: "Button", level: 1 });
});

it("filters sidebar entries without hiding the current document", async () => {
  const user = userEvent.setup();
  await openDocs("/docs/components/button");
  await user.type(await screen.findByRole("textbox", { name: "Search components" }), "calendar");
  const navigation = screen.getByRole("navigation", { name: "Documentation navigation" });
  expect(within(navigation).getByRole("link", { name: "Calendar" })).toBeTruthy();
  expect(within(navigation).queryByRole("link", { name: "Button" })).toBeNull();
  expect(screen.getByRole("heading", { name: "Button", level: 1 })).toBeTruthy();
});

it("renders a not-found page for an unknown component", async () => {
  await openDocs("/docs/components/not-a-component");
  await waitFor(() =>
    expect(screen.getByRole("heading", { name: "Component not found" })).toBeTruthy(),
  );
});
