import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";

import { RecoverablePreview } from "#/docs/preview";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("keeps documentation visible and reloads a failed preview on retry", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const load = vi
    .fn()
    .mockRejectedValueOnce(new Error("Network unavailable"))
    .mockResolvedValue({ default: () => <p>Preview recovered</p> });
  const user = userEvent.setup();
  render(
    <>
      <h1>Component documentation</h1>
      <RecoverablePreview load={load} />
      <pre>Usage remains available</pre>
    </>,
  );
  expect(await screen.findByRole("alert")).toBeTruthy();
  expect(screen.getByText("Usage remains available")).toBeTruthy();
  await user.click(screen.getByRole("button", { name: "Retry preview" }));
  expect(await screen.findByText("Preview recovered")).toBeTruthy();
  expect(load).toHaveBeenCalledTimes(2);
});

it("contains errors thrown by an example during rendering", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const load = async () => ({
    default: () => {
      throw new Error("Broken example");
    },
  });
  render(
    <>
      <h1>Still readable</h1>
      <RecoverablePreview load={load} />
    </>,
  );
  expect(await screen.findByRole("alert")).toBeTruthy();
  expect(screen.getByRole("heading", { name: "Still readable" })).toBeTruthy();
});
