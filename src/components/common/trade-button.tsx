import React, { useRef } from "react";
import Image from "next/image";
import { animate } from "motion";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface TradeButtonProps extends Omit<HTMLMotionProps<"button">, "type"> {
  type: "long" | "short";
  className?: string;
}

export default function TradeButton({
  type,
  className,
  ...props
}: TradeButtonProps) {
  const icon =
    type === "long" ? "/icons/game/long.svg" : "/icons/game/short.svg";
  const iconRef = useRef<HTMLImageElement>(null);
  const text = type === "long" ? "LONG" : "SHORT";
  const characters = text.split("");
  const direction = type === "long" ? { y: -20 } : { y: 20 };

  const handleMouseEnter = () => {
    if (iconRef.current) {
      animate(
        iconRef.current,
        {
          ...direction,
          x: 20,
          scale: 0,
          opacity: 0,
        },
        { duration: 0.4, ease: [0, 0, 0.4, 1] },
      );
    }
  };

  const handleMouseLeave = () => {
    if (iconRef.current) {
      animate(
        iconRef.current,
        {
          x: [-20, 0],
          y: [direction.y * -1, 0],
          scale: [0, 1],
          opacity: [0, 1],
        },
        { duration: 0.4, ease: [0.4, 0, 0, 1] },
      );
    }
  };

  const containerVariants = {
    hover: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0,
      },
    },
    initial: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  const characterVariants = {
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
    initial: {
      opacity: 0,
      y: 5,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
      animate="initial"
      className={cn(
        "bg-elevation-button relative flex h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-lg hover:cursor-pointer",
        className,
      )}
      {...props}
    >
      <Image ref={iconRef} src={icon} alt={type} width={9} height={9} />
      <motion.p
        className={cn(
          "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0 text-[8px] font-extrabold tracking-[-0.02em]",
          type === "long" ? "text-[#25AB7A]" : "text-[#FC3970]",
        )}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={characterVariants}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </motion.button>
  );
}
