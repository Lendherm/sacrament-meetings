"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-4"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-brand hover:bg-blue-100"
        >
          Previous
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-slate-400">Previous</span>
      )}

      <span className="text-sm text-slate-600">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-brand hover:bg-blue-100"
        >
          Next
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-slate-400">Next</span>
      )}
    </nav>
  );
}
