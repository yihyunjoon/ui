import {
  Attachment,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
} from "@/registry/base-nova/ui/attachment";

export default function Example() {
  return (
    <Attachment>
      <AttachmentContent>
        <AttachmentTitle>project-notes.pdf</AttachmentTitle>
        <AttachmentDescription>PDF document · 128 KB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  );
}
