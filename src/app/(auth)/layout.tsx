import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen items-center justify-center">
      <nav className="fixed left-5 top-5">
        <Button variant="outline" asChild>
          <Link href="/">
            <ChevronLeft /> Back
          </Link>
        </Button>
      </nav>
      {children}
    </main>
  );
}
