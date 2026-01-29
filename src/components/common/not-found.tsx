"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export default function NotFound({
  title = "404",
  message = "Page not found",
  showHomeButton = true,
}: NotFoundProps) {
  return (
    <div className="bg-page-background flex min-h-screen flex-col items-center justify-center px-4 pt-[117px]">
      <h1 className="text-text-primary mb-4 text-4xl font-bold">{title}</h1>
      <p className="text-text-secondary mb-8">{message}</p>
      {showHomeButton && (
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      )}
    </div>
  );
}

