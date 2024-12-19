import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center items-center h-screen">
      <nav className="fixed top-3 left-3">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ChevronLeft />
          </Link>
        </Button>
      </nav>
      {children}
    </main>
  );
}
