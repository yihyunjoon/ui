import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { searchComponents } from "#/docs/search";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "#/registry/base-nova/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "#/registry/base-nova/ui/dialog";

export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ml-auto rounded-md border px-2 py-1 text-sm text-muted-foreground"
        aria-keyshortcuts="Meta+K Control+K"
      >
        Search <kbd className="hidden sm:inline">⌘K</kbd>
      </button>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setQuery("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search documentation</DialogTitle>
            <DialogDescription>Find components by name, description, or keyword.</DialogDescription>
          </DialogHeader>
          <Command shouldFilter={false}>
            <CommandInput
              aria-label="Search documentation"
              placeholder="Search components…"
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No components found.</CommandEmpty>
              {searchComponents(query).map((doc) => (
                <CommandItem
                  key={doc.name}
                  value={doc.name}
                  onSelect={() => {
                    setOpen(false);
                    setQuery("");
                    void navigate({
                      to: "/docs/components/$component",
                      params: { component: doc.name },
                    });
                  }}
                >
                  <span className="flex flex-col gap-1">
                    <span>{doc.title}</span>
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {doc.description}
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
