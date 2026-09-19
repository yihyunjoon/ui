import {
  Attachment,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
} from "@/registry/base-nova/ui/attachment";

export default function Example() {
  return (
    <Attachment className="w-56">
      <AttachmentContent>
        <AttachmentTitle>quarterly-product-research-and-design-notes.pdf</AttachmentTitle>
        <AttachmentDescription>PDF document · 128 KB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  );
}
