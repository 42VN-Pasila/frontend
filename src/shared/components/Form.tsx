import React from "react";
import { Button } from "./Button";

export interface FormRootProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  gap?: number;
  backgroundColor?: string;
}

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string | null;
}

export type FormButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Root = React.forwardRef<HTMLFormElement, FormRootProps>(
  ({ gap = 16, backgroundColor, className, style, children, ...rest }, ref) => {
    const composed = ["flex flex-col py-8 px-10 rounded-[10px]", className]
      .filter(Boolean)
      .join(" ");
    return (
      <form
        ref={ref}
        className={composed}
        style={{
          gap,
          ...(backgroundColor ? { backgroundColor } : {}),
          ...(style || {}),
        }}
        {...rest}
      >
        {children}
      </form>
    );
  }
);
Root.displayName = "Form.Root";

const Label = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, required, className, ...rest }, ref) => {
    return (
      <label
        ref={ref}
        className={["block text-sm font-medium mb-1", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
        {required && (
          <span className="text-[var(--color-primary)] ml-1">*</span>
        )}
      </label>
    );
  }
);
Label.displayName = "Form.Label";

const Input = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    { label, description, error, className, required, type = "text", ...rest },
    ref
  ) => {
    console.log(error);
    return (
      <div className="flex flex-col" data-field>
        {label && (
          <Label required={required} className="text-[var(--color-neutral-50)]">
            {label}
          </Label>
        )}
        <input
          ref={ref}
          required={required}
          type={type}
          className={[
            "px-3 py-2 rounded-md bg-black/50 border",
            error
              ? "border-red-500"
              : "border-[var(--color-neutral-300)] text-[var(--color-neutral-50)]",
            "placeholder:text-[var(--color-neutral-300)] opacity-50",
            error
              ? "focus-visible:ring-red-500"
              : "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
            "transition-colors",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />
        {error && (
         <p className="mt-1 text-xs text-red-500">
          {error}
         </p> 
        )}
        {!error && description && (
          <p className="mt-1 text-xs text-[var(--color-neutral-300)]">
            {description}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Form.Input";

const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  ({ className, children, type = "submit", ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        type={type}
        className={className}
        variant="primary"
        emphasis="high"
        {...rest}
      >
        {children}
      </Button>
    );
  }
);
FormButton.displayName = "Form.Button";

export interface FormTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  textSize?: "small" | "medium" | "large";
  textAlign?: "left" | "center" | "right";
}

const Title = React.forwardRef<HTMLHeadingElement, FormTitleProps>(
  (
    { textSize = "medium", textAlign = "left", className, children, ...rest },
    ref
  ) => {
    const sizeMap: Record<string, string> = {
      small: "text-md",
      medium: "text-2xl",
      large: "text-4xl",
    };
    const alignMap: Record<string, string> = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };
    const composed = [
      "font-semibold text-[var(--color-neutral-50)]",
      sizeMap[textSize],
      alignMap[textAlign],
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <div
        ref={ref as React.Ref<HTMLHeadingElement>}
        className={composed}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
Title.displayName = "Form.Title";

export const Form = Object.assign(Root, {
  Root,
  Input,
  Button: FormButton,
  Title,
});

export default Form;
