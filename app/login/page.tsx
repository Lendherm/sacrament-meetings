import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Bishopric Sign In",
  description:
    "Sign in to manage sacrament meeting agendas for Sunrise Ward bishopric leaders.",
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Bishopric sign in</h1>
      <p className="mb-6 text-slate-700">
        Sign in to create, edit, and delete sacrament meeting agendas.
      </p>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <LoginForm />
      </div>
      <p className="mt-4 text-sm text-slate-600">
        <Link href="/meetings" className="font-medium text-brand hover:underline">
          Back to meetings
        </Link>
      </p>
    </main>
  );
}
