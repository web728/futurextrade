"use client";

import { useSyncExternalStore } from "react";

function subscribe(breakpoint: number, callback: () => void) {
  const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot(breakpoint: number) {
  return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
}

function getServerSnapshot() {
  return false;
}

export function useIsMobile(breakpoint = 768): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(breakpoint, callback),
    () => getSnapshot(breakpoint),
    getServerSnapshot,
  );
}
