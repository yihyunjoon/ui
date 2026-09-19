import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/registry/base-nova/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/registry/base-nova/ui/form";
import { Input } from "@/registry/base-nova/ui/input";

export default function Example() {
  const form = useForm({ mode: "onBlur", defaultValues: { name: "" } });
  const [saved, setSaved] = useState(false);
  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-sm gap-4"
        onSubmit={form.handleSubmit(() => setSaved(true))}
      >
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: "Please enter your name.",
            minLength: { value: 3, message: "Use at least three characters." },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl render={<Input {...field} />} />
              <FormDescription>This is shown to your teammates.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
        {saved && (
          <p role="status" className="text-sm">
            Profile saved for this preview.
          </p>
        )}
      </form>
    </Form>
  );
}
