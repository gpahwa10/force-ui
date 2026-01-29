import React from "react";

interface HideExtraProps {
  children: React.ReactNode;
}

export default function HideExtra({ children }: HideExtraProps) {
  return (
    <div className="relative">
      {/* <div
        style={{
          background:
            "linear-gradient(90deg, var(--bg-primary) 0%, var(--bg-primary) calc(100% - 0px),  transparent 100%)",
        }}
        className="absolute top-0 left-0 z-10 h-full w-screen translate-x-[-100%]"
      ></div> */}

      {children}
      {/* <div
        style={{
          background:
            "linear-gradient(270deg, var(--bg-primary) 0%, var(--bg-primary) calc(100% - 0px), transparent 100%)",
        }}
        className="absolute top-0 right-0 z-10 h-full w-screen translate-x-[100%]"
      ></div> */}
    </div>
  );
}
