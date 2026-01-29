// src/components/app-footer.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AtSign, MessageCircle } from "lucide-react";
import Logo from "@/image/FORCE.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
export default function AppFooter() {
  return (
    <footer className="bg-bg-secondary border-border-secondary dark:border-border fixed right-0 bottom-0 left-0 z-40 w-full border-t">
      <div className="max-w-global mx-auto h-full w-full border-x">
        <div className="px-global flex h-full flex-col items-center justify-between gap-4 py-4 sm:flex-row md:gap-5">
          <div className="flex w-full flex-wrap items-center justify-start gap-3 text-center sm:w-auto sm:justify-center sm:gap-4 md:gap-6">
            <div className="flex w-full flex-row items-center justify-between gap-2 sm:w-auto">
              <Logo className="text-text-primary w-[70px]" />
              <FooterSocials className="flex sm:hidden" />
            </div>
            <div className="flex flex-row flex-wrap items-center gap-4.5 gap-y-1">
              <a
                href="#"
                className="text-text-secondary hover:text-text-primary text-[12px] font-medium"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-text-primary text-[12px] font-medium"
              >
                Terms of Use
              </a>
              <Link
                href="/learn"
                className="text-text-secondary hover:text-text-primary text-[12px] font-medium"
              >
                Learn
              </Link>
              <a
                href="#"
                className="text-text-secondary hover:text-text-primary text-[12px] font-medium"
              >
                Careers
              </a>
            </div>
          </div>

          <FooterSocials className="hidden sm:flex" />
        </div>
      </div>
    </footer>
  );
}

function FooterSocials({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link href="mailto:info@force.xyz">
        <Button className="border-border-secondary bg-elevation-button hover:bg-primary-foreground flex h-[32px] w-[32px] items-center justify-center rounded-[7px] border hover:cursor-pointer">
          <AtSign className="text-text-primary h-[16px] w-[16px]" />
        </Button>
      </Link>
      <Link href="https://x.com/forcexyzhq" target="_blank">
        <Button className="border-border-secondary bg-elevation-button hover:bg-primary-foreground flex h-[32px] w-[32px] items-center justify-center rounded-[7px] border hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-text-primary"
          >
            <path
              d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </Link>
    </div>
  );
}
