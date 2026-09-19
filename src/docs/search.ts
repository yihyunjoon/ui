import { componentDocs } from "./catalog";

const aliases: Record<string, string> = {
  dialog: "modal popup overlay",
  "alert-dialog": "confirmation confirm destructive modal",
  sonner: "notification feedback snackbar",
  toast: "notification feedback snackbar",
  combobox: "autocomplete searchable select picker",
  command: "palette search keyboard shortcut",
  "date-picker": "date calendar picker",
  input: "text field textbox",
  textarea: "multiline text field",
  switch: "boolean toggle settings",
  "radio-group": "single choice selection",
  checkbox: "multiple choice selection",
  "data-table": "grid records rows columns",
  sheet: "side panel overlay drawer",
  skeleton: "loading placeholder",
};
export function searchComponents(query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return componentDocs;
  return componentDocs
    .map((doc) => {
      const title = `${doc.title} ${doc.name}`.toLowerCase();
      const keywords = aliases[doc.name] ?? "";
      const text = `${title} ${keywords} ${doc.description} ${doc.guidance}`.toLowerCase();
      const score = words.every((word) => text.includes(word))
        ? words.reduce(
            (sum, word) => sum + (title.includes(word) ? 10 : keywords.includes(word) ? 5 : 1),
            0,
          )
        : 0;
      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.doc);
}
