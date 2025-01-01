import { Bird } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getUser } from "@/lib/user";
import { cn } from "@/lib/utils";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <>
      <nav className="bg-card border-b-2 border-secondary text-lg font-medium">
        <div className="container flex justify-between items-center py-2">
          <Link href="/" className="flex items-center gap-2 font-semibold p-2">
            <Bird className="size-7" />
            <span className="sr-only md:not-sr-only">Twitter</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/logout" className="p-2">
              Logout
            </Link>
            <Link href={`/@${user.username}`} className="p-2">
              @{user.username}
            </Link>
          </div>
        </div>
      </nav>
      <main className="container my-6">{children}</main>
    </>
  );
}
