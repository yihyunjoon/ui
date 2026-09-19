import {
  TypographyH2,
  TypographyP,
  TypographyMuted,
  TypographyList,
  TypographyBlockquote,
} from "@/registry/base-nova/ui/typography";

export default function Example() {
  return (
    <div className="max-w-sm">
      <TypographyH2>A clear hierarchy</TypographyH2>
      <TypographyP>Consistent typography helps readers scan, understand, and act.</TypographyP>
      <TypographyList>
        <li>Start with a clear title.</li>
        <li>Use short paragraphs.</li>
      </TypographyList>
      <TypographyBlockquote>Clarity helps everyone.</TypographyBlockquote>
      <TypographyMuted>Keep supporting details quiet.</TypographyMuted>
    </div>
  );
}
