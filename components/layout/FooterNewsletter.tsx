"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-sm text-white/70">
        Thank you. You are now subscribed to Futurex updates.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel flex max-w-sm gap-1.5 rounded-full p-1.5 transition-shadow duration-300 focus-within:shadow-[0_0_0_3px_rgba(227,37,38,0.25)]"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Email address for newsletter"
        className="w-full rounded-full bg-transparent px-3.5 py-2 text-sm text-white placeholder-white/40 outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label="Subscribe"
        className="flex shrink-0 items-center justify-center rounded-full bg-cherry px-4 text-white transition-all duration-300 hover:bg-cherry-dark hover:shadow-[0_0_16px_rgba(227,37,38,0.5)] disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
      </button>
      {status === "error" && (
        <span className="sr-only">Something went wrong. Please try again.</span>
      )}
    </form>
  );
}
