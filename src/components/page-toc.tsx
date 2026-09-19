import { useEffect, useState } from "react";

const sections = [
  ["preview", "Preview"],
  ["installation", "Installation"],
  ["usage", "Usage"],
  ["api", "API"],
  ["guidelines", "Usage notes"],
];
export function PageToc() {
  const [active, setActive] = useState("preview");
  useEffect(() => {
    let frame = 0;
    function update() {
      const headings = sections
        .map(([id]) => document.getElementById(id))
        .filter((element): element is HTMLElement => Boolean(element));
      const lastPassed = headings
        .filter((element) => element.getBoundingClientRect().top <= 130)
        .at(-1);
      setActive(lastPassed?.id ?? headings[0]?.id ?? "preview");
    }
    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <nav aria-label="On this page" className="sticky top-24 space-y-3 text-sm">
      <p className="font-medium">On this page</p>
      {sections.map(([id, title]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          className={
            active === id
              ? "block font-medium text-foreground"
              : "block text-muted-foreground hover:text-foreground"
          }
        >
          {title}
        </a>
      ))}
    </nav>
  );
}
