"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { createContext, useContext, useId, type ComponentProps } from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/registry/base-nova/ui/label";

const Form = FormProvider;
const FormFieldContext = createContext<{ name: string } | null>(null);
const FormItemContext = createContext<string | null>(null);

function FormField<TValues extends FieldValues, TName extends FieldPath<TValues>>(
  props: ControllerProps<TValues, TName>,
) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const field = useContext(FormFieldContext);
  const id = useContext(FormItemContext);
  const form = useFormContext();
  const state = useFormState({ name: field?.name });
  if (!field || !id || !form)
    throw new Error("Form controls must be inside Form, FormField, and FormItem.");
  return {
    name: field.name,
    formItemId: `${id}-control`,
    formDescriptionId: `${id}-description`,
    formMessageId: `${id}-message`,
    ...form.getFieldState(field.name, state),
  };
}

function FormItem({ className, ...props }: ComponentProps<"div">) {
  const id = useId();
  return (
    <FormItemContext.Provider value={id}>
      <div data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel({ className, ...props }: ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField();
  return (
    <Label
      {...props}
      htmlFor={formItemId}
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
    />
  );
}

function FormControl({ render, ...props }: useRender.ComponentProps<"input">) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return useRender({
    defaultTagName: "input",
    render,
    props: mergeProps(props, {
      id: formItemId,
      "aria-describedby": error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId,
      "aria-invalid": !!error,
    }),
  });
}

function FormDescription({ className, ...props }: ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();
  return (
    <p
      {...props}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
    />
  );
}

function FormMessage({ className, children, ...props }: ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const content = error?.message ? String(error.message) : children;
  if (!content) return null;
  return (
    <p
      {...props}
      id={formMessageId}
      role="alert"
      className={cn("text-sm text-destructive", className)}
    >
      {content}
    </p>
  );
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};
