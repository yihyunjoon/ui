import fs from "node:fs";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ApiReference, type ApiPart } from "../src/components/api-reference";
import registry from "../src/registry/registry.json";

function read(name: string): ApiPart[] {
  return JSON.parse(fs.readFileSync(`src/docs/api/${name}.json`, "utf8"));
}
describe("API reference", () => {
  it("covers every registry component with typed and described properties", () => {
    for (const item of registry.items.filter((item) => item.type === "registry:ui")) {
      const parts = read(item.name);
      expect(parts.length, item.name).toBeGreaterThan(0);
      for (const part of parts)
        for (const prop of part.props) {
          expect(prop.type).toBeTruthy();
          expect(prop.description).toBeTruthy();
          expect(JSON.stringify(prop)).not.toContain(process.cwd());
        }
    }
  });
  it("retains mode-specific calendar selection props and local button defaults", () => {
    const calendar = read("calendar").find((part) => part.name === "Calendar")!;
    expect(calendar.props.map((prop) => prop.name)).toEqual(
      expect.arrayContaining(["selected", "onSelect", "mode"]),
    );
    const button = read("button")[0];
    expect(button.props.find((prop) => prop.name === "variant")?.default).toBe('"default"');
    expect(button.props.find((prop) => prop.name === "onClick")?.type).toContain("MouseEvent");
  });
  it("renders an accessible property table", () => {
    render(<ApiReference parts={read("button")} />);
    expect(screen.getByRole("table", { name: "Button properties" })).toBeTruthy();
    expect(screen.getByRole("rowheader", { name: "variant" })).toBeTruthy();
  });
});
