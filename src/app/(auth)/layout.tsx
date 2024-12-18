export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container my-5 mx-auto">
      <nav></nav>
      {children}
    </main>
  );
}
