"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[6px] border border-[#d1d1d1] bg-white shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)] transition-colors outline-none hover:border-[#b1b1b1] focus-visible:border-[#b1b1b1] focus-visible:ring-2 focus-visible:ring-[#d1d1d1]/50 data-[state=checked]:border-[#d1d1d1] data-[state=checked]:bg-white disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center transition-none"
      >
        <CheckIcon className="size-3 stroke-[#0a0d14] stroke-2" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
