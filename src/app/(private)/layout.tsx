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
    <main className="container">
      <nav className="flex justify-between border rounded-md my-5 text-xl">
        <Link href="/" className="py-4 px-8">
          Twitter
        </Link>
        <div className="flex">
          <Link href="/" className="py-4 px-8">
            {user.username}
          </Link>
          <button onClick={logout} className="py-4 px-8">
            Logout
          </button>
        </div>
      </nav>
      {children}
    </main>
  );
}
