import { TypographyH2, TypographyP, TypographyMuted } from "@/registry/base-nova/ui/typography";

export default function Example() {
  return (
    <div className="max-w-sm">
      <TypographyH2>A clear hierarchy</TypographyH2>
      <TypographyP>Consistent typography helps readers scan, understand, and act.</TypographyP>
      <TypographyMuted>Keep supporting details quiet.</TypographyMuted>
    </div>
  );
}
