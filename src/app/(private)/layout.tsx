import { Bird } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { logout } from "@/app/(private)/actions";
import { getUser } from "@/lib/user";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <>
      <nav className="border-b-2 border-secondary bg-card text-lg font-medium">
        <div className="container flex items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-2 p-2 font-semibold">
            <Bird className="size-7" />
            <span className="sr-only md:not-sr-only">Twitter</span>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={logout} className="p-2">
              Logout
            </button>
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
