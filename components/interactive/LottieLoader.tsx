"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <Loader2 className="size-8 animate-spin text-cherry" aria-hidden />,
});

type Kind = "loader" | "success" | "empty";

const SOURCES: Record<Kind, string> = {
  loader: "/lottie/loader.json",
  success: "/lottie/success.json",
  empty: "/lottie/empty.json",
};

export function LottieLoader({
  kind = "loader",
  size = 80,
  loop = true,
  className,
}: {
  kind?: Kind;
  size?: number;
  loop?: boolean;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    fetch(SOURCES[kind])
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => setData(null));
    return () => {
      cancelled = true;
    };
  }, [kind, reducedMotion]);

  if (reducedMotion || !data) {
    return (
      <div
        className={className}
        style={{ width: size, height: size }}
        aria-hidden
      >
        <Loader2 className="size-full animate-spin text-cherry" />
      </div>
    );
  }

  return (
    <div className={className} style={{ width: size, height: size }}>
      <Lottie animationData={data} loop={loop} />
    </div>
  );
}
