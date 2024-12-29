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
          <NavLink href="/" className="flex items-center gap-2 font-semibold">
            <Bird className="size-7" />
            <span className="sr-only md:not-sr-only">Twitter</span>
          </NavLink>
          <div className="flex items-center gap-4">
            <NavLink href="/logout">Logout</NavLink>
            <NavLink href={`/@${user.username}`}>@{user.username}</NavLink>
          </div>
        </div>
      </nav>
      <main className="container my-6">{children}</main>
    </>
  );
}

function NavLink({
  children,
  className,
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn(className, "py-2 px-2")} {...props}>
      {children}
    </Link>
  );
}
