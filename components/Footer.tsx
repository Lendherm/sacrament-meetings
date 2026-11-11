export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-200 bg-slate-900 text-slate-100 print:hidden">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm">
        <p>
          Copyright &copy; {year} | Sunrise Ward Sacrament Meeting Planner | All
          rights reserved
        </p>
      </div>
    </footer>
  );
}
