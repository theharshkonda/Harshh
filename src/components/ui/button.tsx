import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-neon/20 bg-neon/90 px-6 py-3 text-ink shadow-[0_15px_40px_rgba(110,231,249,0.22)] hover:-translate-y-0.5 hover:bg-neon",
        ghost:
          "border-white/10 bg-white/5 px-6 py-3 text-white hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10",
        outline:
          "border-white/15 bg-transparent px-5 py-3 text-white hover:border-neon/35 hover:bg-neon/10",
      },
      size: {
        default: "",
        sm: "px-4 py-2 text-xs",
        lg: "px-7 py-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
