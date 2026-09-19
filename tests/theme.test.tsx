import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "next-themes";
import { afterEach, beforeAll, expect, it, vi } from "vitest";

import { ThemeSettings } from "../src/components/theme-settings";
beforeAll(() => {
  const entries = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => entries.set(key, value),
    removeItem: (key: string) => entries.delete(key),
    clear: () => entries.clear(),
  });
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: false,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
    })),
  );
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.className = "";
});
function show() {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system">
      <ThemeSettings />
    </ThemeProvider>,
  );
}
it("applies dark mode and customization, persists preferences, and resets", async () => {
  const user = userEvent.setup();
  const view = show();
  await user.click(screen.getByText("Theme"));
  await user.selectOptions(screen.getByLabelText("Appearance"), "dark");
  expect(document.documentElement.classList.contains("dark")).toBe(true);
  await user.selectOptions(screen.getByLabelText("Color"), "blue");
  await user.selectOptions(screen.getByLabelText("Radius"), "round");
  await user.selectOptions(screen.getByLabelText("Density"), "compact");
  expect(document.documentElement.dataset).toMatchObject({
    color: "blue",
    radius: "round",
    density: "compact",
  });
  view.unmount();
  show();
  await user.click(screen.getByText("Theme"));
  expect((screen.getByLabelText("Color") as HTMLSelectElement).value).toBe("blue");
  await user.click(screen.getByRole("button", { name: "Reset theme" }));
  expect(document.documentElement.dataset).toMatchObject({
    color: "neutral",
    radius: "default",
    density: "comfortable",
  });
  expect((screen.getByLabelText("Appearance") as HTMLSelectElement).value).toBe("system");
});
it("recovers from malformed stored preferences", async () => {
  localStorage.setItem("ui-theme-preferences", "invalid-json");
  show();
  await waitFor(() => expect(document.documentElement.dataset.color).toBe("neutral"));
});
