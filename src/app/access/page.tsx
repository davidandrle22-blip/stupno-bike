"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function AccessForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from") || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(from);
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0f0d] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="text-primary">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Stupno Bike</h1>
          <p className="text-slate-500 text-sm mt-1">Zadejte přístupové heslo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Heslo"
            autoFocus
            required
            className={`w-full bg-white/[0.06] border rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-primary/50 transition-colors ${
              error ? "border-red-500/50" : "border-white/[0.1]"
            }`}
          />
          {error && (
            <p className="text-red-400 text-sm text-center">Nesprávné heslo</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 rounded-xl uppercase tracking-wide transition-all hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Ověřování..." : "Vstoupit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AccessPage() {
  return (
    <Suspense>
      <AccessForm />
    </Suspense>
  );
}
