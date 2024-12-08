export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold text-center">Autenticação</h1>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}
