import Skeleton from "@/components/Skeleton";

export default function ToolLoadingFallback() {
  return (
    <div className="grid gap-6 lg:grid-cols-2" aria-busy="true" aria-live="polite">
      <Skeleton className="h-80 w-full rounded-3xl" />
      <Skeleton className="h-80 w-full rounded-3xl" />
    </div>
  );
}
