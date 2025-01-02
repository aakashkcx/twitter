import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-10 text-center">
        <h1 className="text-5xl font-light">Twitter</h1>
        <div className="flex justify-center gap-3">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
