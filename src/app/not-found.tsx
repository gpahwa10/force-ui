import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-page-background flex min-h-screen flex-col items-center justify-center px-4 pt-[117px]">
      <h1 className="text-text-primary mb-4 text-4xl font-bold">404</h1>
      <p className="text-text-secondary mb-8">Page not found</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
