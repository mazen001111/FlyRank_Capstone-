import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 0;

async function getHealthData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      ok: true,
      source: "JSONPlaceholder",
      endpoint: "https://jsonplaceholder.typicode.com/todos/1",
      data,
    };
  } catch (error) {
    return {
      ok: false,
      source: "JSONPlaceholder",
      endpoint: "https://jsonplaceholder.typicode.com/todos/1",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default async function HealthPage() {
  const health = await getHealthData();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="System check"
          title="Health check page"
          description="This page fetches data from a public test API so the route has a real server-side request without needing backend infrastructure."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Status</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{health.ok ? "Healthy" : "Needs attention"}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Source: {health.source}
            </p>
            <p className="mt-1 break-all text-sm text-muted-foreground">Endpoint: {health.endpoint}</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Fetched data</p>
            {health.ok ? (
              <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Title:</span> {health.data.title}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Completed:</span> {String(health.data.completed)}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Todo ID:</span> {health.data.id}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-red-600">{health.error}</p>
            )}
          </Card>
        </div>
      </Container>
    </section>
  );
}
