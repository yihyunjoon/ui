import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import shell from "shiki/langs/shellscript.mjs";
import tsx from "shiki/langs/tsx.mjs";
import dark from "shiki/themes/github-dark.mjs";
import light from "shiki/themes/github-light.mjs";

const highlighter = createHighlighterCore({
  themes: [light, dark],
  langs: [tsx, shell],
  engine: createJavaScriptRegexEngine(),
});
export async function highlight(code: string, language: "tsx" | "shellscript") {
  return (await highlighter).codeToTokensWithThemes(code, {
    lang: language,
    themes: { light: "github-light", dark: "github-dark" },
  });
}
