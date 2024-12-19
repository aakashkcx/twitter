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
      <nav className="fixed top-5 left-5">
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
