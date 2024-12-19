import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-10 text-center">
        <h1 className="text-5xl font-light">Twitter</h1>
        <div className="flex gap-3 justify-center">
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
