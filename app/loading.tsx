import Container from "@/components/Container";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <section className="py-16 sm:py-20" aria-busy="true" aria-live="polite">
      <Container>
        <div className="grid max-w-3xl gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-5 w-3/5" />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-72 w-full rounded-3xl" />
          <Skeleton className="h-72 w-full rounded-3xl" />
        </div>
      </Container>
    </section>
  );
}
