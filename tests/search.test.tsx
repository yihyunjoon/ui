import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, expect, it, vi } from "vitest";

import { DocsSearch } from "../src/components/docs-search";
import { PageToc } from "../src/components/page-toc";
import { searchComponents } from "../src/docs/search";
const { navigate } = vi.hoisted(() => ({ navigate: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));
beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => {
  cleanup();
  navigate.mockClear();
});
it("ranks titles ahead of descriptions and finds synonyms", () => {
  expect(searchComponents("button")[0].name).toBe("button");
  expect(searchComponents("notification").map((doc) => doc.name)).toContain("toast");
  expect(searchComponents("autocomplete")[0].name).toBe("combobox");
  expect(searchComponents("zzzz-no-such-component")).toEqual([]);
  expect(searchComponents(" ").length).toBe(66);
});
it("opens via shortcut, searches keywords and navigates with Enter", async () => {
  const user = userEvent.setup();
  render(<DocsSearch />);
  fireEvent.keyDown(document, { key: "k", metaKey: true });
  const input = await screen.findByRole("combobox");
  await user.type(input, "autocomplete");
  await user.keyboard("{ArrowDown}{Enter}");
  expect(navigate).toHaveBeenCalledWith({
    to: "/docs/components/$component",
    params: { component: "combobox" },
  });
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  fireEvent.keyDown(document, { key: "k", ctrlKey: true });
  expect(await screen.findByRole("combobox")).toBeTruthy();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});
it("updates the active section while scrolling", async () => {
  render(
    <>
      <section id="preview" />
      <section id="installation" />
      <section id="usage" />
      <PageToc />
    </>,
  );
  const preview = document.getElementById("preview")!;
  const installation = document.getElementById("installation")!;
  const usage = document.getElementById("usage")!;
  vi.spyOn(preview, "getBoundingClientRect").mockReturnValue({ top: -500 } as DOMRect);
  vi.spyOn(installation, "getBoundingClientRect").mockReturnValue({ top: 90 } as DOMRect);
  vi.spyOn(usage, "getBoundingClientRect").mockReturnValue({ top: 700 } as DOMRect);
  fireEvent.scroll(window);
  await waitFor(() =>
    expect(screen.getByRole("link", { name: "Installation" }).getAttribute("aria-current")).toBe(
      "location",
    ),
  );
  expect(screen.getByRole("link", { name: "Preview" }).hasAttribute("aria-current")).toBe(false);
});
