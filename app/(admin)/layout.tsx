export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Admin
      </p>
      {children}
    </section>
  );
}
