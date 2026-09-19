import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@/registry/base-nova/ui/combobox";

export default function Example() {
  const languages = ["TypeScript", "JavaScript", "Python", "Swift"];
  return (
    <Combobox items={languages}>
      <ComboboxInput placeholder="Choose a language" aria-label="Language" />
      <ComboboxContent>
        <ComboboxEmpty>No matches.</ComboboxEmpty>
        <ComboboxList>
          {(language: string) => (
            <ComboboxItem key={language} value={language}>
              {language}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
