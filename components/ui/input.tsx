import * as React from "react";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | null;
  icon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, icon: Icon, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          )}
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              Icon && "pl-10",
              errorMessage && "border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {errorMessage && (
          <p className="text-xs h-4 text-red-500 mt-1">{errorMessage || ""}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
