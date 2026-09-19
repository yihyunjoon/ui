import { createColumnHelper } from "@tanstack/react-table";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DataTable, dataTableFeatures } from "@/registry/base-nova/ui/data-table";
import { DatePicker } from "@/registry/base-nova/ui/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/base-nova/ui/form";
import { Input } from "@/registry/base-nova/ui/input";

afterEach(cleanup);

describe("custom registry compositions", () => {
  it("renders data and an empty state using TanStack Table v9", () => {
    const helper = createColumnHelper<typeof dataTableFeatures, { name: string }>();
    const columns = helper.columns([helper.accessor("name", { header: "Name" })]);
    const { rerender } = render(<DataTable columns={columns} data={[{ name: "Ada" }]} />);
    expect(screen.getByRole("cell", { name: "Ada" })).toBeTruthy();
    rerender(<DataTable columns={columns} data={[]} />);
    expect(screen.getByRole("cell", { name: "No results." })).toBeTruthy();
  });

  it("selects a date through the Base UI popover and calendar", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<DatePicker value={new Date(2026, 5, 15)} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: /June 15/ }));
    await user.click(await screen.findByText("16", { selector: "button" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0][0].getDate()).toBe(16);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("associates field labels, validation messages, and submitted values", async () => {
    const submit = vi.fn();
    function Example() {
      const form = useForm({ defaultValues: { name: "" } });
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl render={<Input {...field} />} />
                  <FormDescription>Your display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit">Save</button>
          </form>
        </Form>
      );
    }
    const user = userEvent.setup();
    render(<Example />);
    const input = screen.getByRole("textbox", { name: "Name" });
    await user.click(screen.getByRole("button", { name: "Save" }));
    const message = await screen.findByRole("alert");
    expect(message.textContent).toBe("Name is required");
    expect(input.getAttribute("aria-describedby")).toContain(message.id);
    expect(input.getAttribute("aria-invalid")).toBe("true");
    await user.type(input, "Ada");
    await user.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(submit).toHaveBeenCalled());
    expect(submit.mock.calls[0][0]).toEqual({ name: "Ada" });
  });
});

it("loads every distributable component without unresolved imports", async () => {
  const modules = import.meta.glob("../src/registry/base-nova/ui/*.tsx");
  expect(Object.keys(modules)).toHaveLength(66);
  for (const load of Object.values(modules)) expect(await load()).toBeTruthy();
});
