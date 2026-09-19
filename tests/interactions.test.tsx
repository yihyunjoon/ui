import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";
import { afterEach, beforeAll, expect, it, vi } from "vitest";

const examples = import.meta.glob<{ default: ComponentType }>("../src/docs/examples/*.tsx");
async function example(name: string) {
  const { default: Example } = await examples[`../src/docs/examples/${name}.tsx`]();
  render(<Example />);
  return userEvent.setup();
}
beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: (media: string) => ({
      media,
      matches: false,
      addEventListener() {},
      removeEventListener() {},
    }),
  });
  HTMLElement.prototype.scrollIntoView = () => {};
});
afterEach(cleanup);

it("moves pagination in both directions without exceeding the boundaries", async () => {
  const user = await example("pagination");
  const next = screen.getByRole("link", { name: "Go to next page" });
  const previous = screen.getByRole("link", { name: "Go to previous page" });
  expect(previous.getAttribute("aria-disabled")).toBe("true");
  await user.click(next);
  expect(screen.getByRole("link", { name: "2" }).getAttribute("aria-current")).toBe("page");
  await user.click(next);
  await user.click(next);
  expect(screen.getByRole("link", { name: "3" }).getAttribute("aria-current")).toBe("page");
  expect(next.getAttribute("aria-disabled")).toBe("true");
  await user.click(previous);
  expect(screen.getByRole("link", { name: "2" }).getAttribute("aria-current")).toBe("page");
  await user.click(previous);
  await user.click(previous);
  expect(screen.getByRole("link", { name: "1" }).getAttribute("aria-current")).toBe("page");
});

for (const [name, trigger, text] of [
  ["accordion", "Can I customize the source?", "Yes. The installed files belong to your project."],
  ["collapsible", "Show project details", "Created today · 3 collaborators · Private workspace"],
] as const)
  it(`${name} opens and closes its content`, async () => {
    const user = await example(name);
    const button = screen.getByRole("button", { name: trigger });
    await user.click(button);
    expect(await screen.findByText(text)).toBeTruthy();
    expect(button.getAttribute("aria-expanded")).toBe("true");
    await user.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

for (const [name, trigger, title, close] of [
  ["dialog", "Edit profile", "Your profile", "Done"],
  ["drawer", "Open drawer", "Daily goal", "Done"],
  ["sheet", "Open panel", "Project details", "Done"],
  ["alert-dialog", "Review action", "Archive this project?", "Archive"],
] as const)
  it(`${name} completes its open and dismiss flow`, async () => {
    const user = await example(name);
    await user.click(screen.getByRole("button", { name: trigger }));
    expect(await screen.findByRole("heading", { name: title })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: close }));
    await waitFor(() => expect(screen.queryByRole("heading", { name: title })).toBeNull());
  });

for (const name of ["checkbox", "switch"] as const)
  it(`${name} updates checked state`, async () => {
    const user = await example(name);
    const control = screen.getByRole(name);
    expect(control.getAttribute("aria-checked")).toBe("true");
    await user.click(control);
    expect(control.getAttribute("aria-checked")).toBe("false");
  });

it("tabs changes the visible panel", async () => {
  const user = await example("tabs");
  await user.click(screen.getByRole("tab", { name: "Activity" }));
  expect(screen.getByRole("tabpanel").textContent).toContain("No new activity today.");
  await user.keyboard("{ArrowLeft}{Enter}");
  expect(screen.getByRole("tab", { name: "Overview" }).getAttribute("aria-selected")).toBe("true");
});

it("command filters the action list and exposes an empty state", async () => {
  const user = await example("command");
  await user.type(screen.getByRole("combobox"), "calendar");
  expect(screen.getByRole("option", { name: "Open calendar" })).toBeTruthy();
  expect(screen.queryByRole("option", { name: "View settings" })).toBeNull();
  await user.clear(screen.getByRole("combobox"));
  await user.type(screen.getByRole("combobox"), "no-match");
  expect(screen.getByText("No actions found.")).toBeTruthy();
});

it("select updates the selected team", async () => {
  const user = await example("select");
  await user.click(screen.getByRole("combobox", { name: "Team" }));
  await user.click(await screen.findByRole("option", { name: "Engineering" }));
  expect(screen.getByRole("combobox", { name: "Team" }).textContent).toContain("Engineering");
});

it("combobox searches and selects a value", async () => {
  const user = await example("combobox");
  const input = screen.getByRole("combobox", { name: "Language" });
  await user.type(input, "Swift");
  await user.click(await screen.findByRole("option", { name: "Swift" }));
  expect((input as HTMLInputElement).value).toBe("Swift");
});

it("radio group changes its exclusive selection", async () => {
  const user = await example("radio-group");
  await user.click(screen.getByRole("radio", { name: "Compact" }));
  expect(screen.getByRole("radio", { name: "Compact" }).getAttribute("aria-checked")).toBe("true");
  expect(screen.getByRole("radio", { name: "Comfortable" }).getAttribute("aria-checked")).toBe(
    "false",
  );
});

it("toggle exposes pressed state", async () => {
  const user = await example("toggle");
  const button = screen.getByRole("button", { name: "Toggle bold" });
  await user.click(button);
  expect(button.getAttribute("aria-pressed")).toBe("true");
  await user.click(button);
  expect(button.getAttribute("aria-pressed")).toBe("false");
});

it("questionnaire submits the selected answer", async () => {
  const user = await example("questionnaire");
  await user.click(screen.getByRole("radio", { name: /Design/ }));
  await user.click(screen.getByRole("button", { name: "Finish" }));
  expect(await screen.findByRole("status")).toHaveProperty(
    "textContent",
    "Thank you for your answer.",
  );
});

for (const [name, trigger, message] of [
  ["sonner", "Show notification", "Your changes have been saved."],
  ["toast", "Show toast", "Your preferences were updated."],
] as const)
  it(`${name} displays a notification`, async () => {
    const user = await example(name);
    await user.click(screen.getByRole("button", { name: trigger }));
    expect(await screen.findByText(message)).toBeTruthy();
  });
