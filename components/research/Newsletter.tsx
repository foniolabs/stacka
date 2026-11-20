"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    try {
      const fd = new FormData(e.currentTarget);
      fd.append("access_key", "1403a1ee-9636-48fa-b7f8-af582678c03b");
      fd.append("subject", "New Stacka Research subscriber");
      fd.append("from_name", "Stacka Research");
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) { setState("done"); setEmail(""); } else setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="flex items-center gap-2 rounded-full border border-[var(--r-line)] bg-white/60 p-1.5 pl-5">
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={state === "done"}
          aria-describedby="nl-msg"
          className="min-h-[44px] w-full bg-transparent text-base text-[var(--r-ink)] placeholder:text-[var(--r-ink-3)] focus:outline-none"
        />
        <button type="submit" disabled={state === "loading" || state === "done"} className="r-btn r-btn-primary shrink-0 disabled:opacity-60">
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {state === "done" ? "Subscribed" : "Stay updated"}
        </button>
      </div>
      <p id="nl-msg" role="status" className="mt-3 min-h-[1.25rem] pl-5 text-sm text-[var(--r-ink-3)]">
        {state === "done" && "Thank you. We will email you when new work is published."}
        {state === "error" && <span className="text-red-700">Something went wrong. Please try again.</span>}
      </p>
    </form>
  );
}
