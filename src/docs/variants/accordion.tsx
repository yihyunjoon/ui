import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/base-nova/ui/accordion";

export default function Example() {
  return (
    <Accordion multiple defaultValue={["source"]} className="w-full max-w-sm">
      <AccordionItem value="source">
        <AccordionTrigger>Can I customize the source?</AccordionTrigger>
        <AccordionContent>Yes. The installed files belong to your project.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="theme">
        <AccordionTrigger>Does it support theming?</AccordionTrigger>
        <AccordionContent>Use your shared Tailwind and CSS variable tokens.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
