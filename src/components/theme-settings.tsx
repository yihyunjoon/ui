import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Preferences = {
  color: "neutral" | "blue" | "green";
  radius: "none" | "default" | "round";
  density: "comfortable" | "compact";
};
const defaults: Preferences = { color: "neutral", radius: "default", density: "comfortable" };
const storageKey = "ui-theme-preferences";
function readPreferences(): Preferences {
  try {
    const value = JSON.parse(window.localStorage.getItem(storageKey) ?? "{}");
    return {
      color: ["neutral", "blue", "green"].includes(value.color) ? value.color : defaults.color,
      radius: ["none", "default", "round"].includes(value.radius) ? value.radius : defaults.radius,
      density: ["comfortable", "compact"].includes(value.density)
        ? value.density
        : defaults.density,
    };
  } catch {
    return defaults;
  }
}
export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(defaults);
  useEffect(() => {
    setPreferences(readPreferences());
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.dataset.color = preferences.color;
    root.dataset.radius = preferences.radius;
    root.dataset.density = preferences.density;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(preferences));
    } catch {
      /* Storage may be unavailable. */
    }
  }, [preferences, ready]);
  return (
    <details className="relative">
      <summary className="cursor-pointer rounded-md border px-2 py-1 text-sm">Theme</summary>
      <div className="absolute right-0 z-40 mt-2 w-64 space-y-4 rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg">
        <p className="text-sm font-medium">Customize appearance</p>
        <label className="block space-y-1 text-sm">
          <span>Appearance</span>
          <select
            aria-label="Appearance"
            disabled={!ready}
            value={ready ? (theme ?? "system") : "system"}
            onChange={(event) => setTheme(event.target.value)}
            className="w-full rounded-md border bg-background p-2"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        {(
          [
            ["color", "Color", ["neutral", "blue", "green"]],
            ["radius", "Radius", ["none", "default", "round"]],
            ["density", "Density", ["comfortable", "compact"]],
          ] as const
        ).map(([key, label, choices]) => (
          <label key={key} className="block space-y-1 text-sm">
            <span>{label}</span>
            <select
              aria-label={label}
              disabled={!ready}
              value={preferences[key]}
              onChange={(event) =>
                setPreferences((current) => ({ ...current, [key]: event.target.value }))
              }
              className="w-full rounded-md border bg-background p-2"
            >
              {choices.map((choice) => (
                <option key={choice} value={choice}>
                  {choice[0].toUpperCase() + choice.slice(1)}
                </option>
              ))}
            </select>
          </label>
        ))}
        <button
          type="button"
          className="rounded-md border px-3 py-1 text-sm"
          onClick={() => {
            setPreferences(defaults);
            setTheme("system");
          }}
        >
          Reset theme
        </button>
      </div>
    </details>
  );
}
