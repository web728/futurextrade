import { Skeleton } from "@/components/ui/skeleton";

/**
 * Generic form-shaped placeholder for pages whose primary content is a
 * LeadFlowForm, used inside route-level loading.tsx files.
 */
export function FormSkeleton() {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-premium sm:p-8">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="mt-6 h-10 w-40 rounded-full" />
    </div>
  );
}
