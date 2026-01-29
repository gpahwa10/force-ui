"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface SliderProps extends React.ComponentProps<
  typeof SliderPrimitive.Root
> {
  showLabels?: boolean;
  labels?: string[];
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  showLabels = false,
  labels = [],
  onValueChange,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState<number[]>(
    value || defaultValue || [min],
  );

  // Update internal value when controlled value changes
  React.useEffect(() => {
    if (value) {
      setInternalValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  const currentValue = internalValue[0] || min;

  // Generate labels if showLabels is true and labels array is provided
  const labelElements = React.useMemo(() => {
    if (!showLabels || labels.length === 0) return null;

    return labels.map((label, index) => {
      // Calculate position: 0% for first, 100% for last, evenly distributed in between
      const position = (index / (labels.length - 0.3)) * 100;

      // Calculate which label corresponds to the current slider value
      // Map slider value (min to max) to label index (0 to labels.length - 1)
      const valueRange = max - min;
      const labelIndex = Math.round(
        ((currentValue - min) / valueRange) * (labels.length - 1),
      );

      const isActive = index === labelIndex;

      return (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${position}%`,
            top: "16px",
            transform: "translateX(-50%)",
          }}
        >
          <span
            className={cn(
              "ml-5 text-[10px] font-medium whitespace-nowrap transition-colors duration-200",
              isActive ? "text-text-primary" : "text-text-secondary",
            )}
          >
            {label}
          </span>
        </div>
      );
    });
  }, [showLabels, labels, currentValue, min, max]);

  return (
    <div className="relative w-full pb-8">
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        onValueChange={handleValueChange}
        className={cn(
          "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "bg-elevation-bg relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "bg-text-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: internalValue.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="bg-elevation-container block size-5 shrink-0 cursor-pointer rounded-full border-4 border-white transition-[color,box-shadow] focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            style={{
              boxShadow: "0px 3.52941px 3.52941px rgba(0, 0, 0, 0.35)",
            }}
          />
        ))}
      </SliderPrimitive.Root>
      {showLabels && labelElements}
    </div>
  );
}

export { Slider };
