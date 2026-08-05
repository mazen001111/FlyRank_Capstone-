import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

export default function LoginPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="Authentication"
          title="Login placeholder"
          description="Authentication is intentionally not implemented in this skeleton phase."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Coming later</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              This route exists so sign-in, role handling, and session work can be added later without changing the routing structure.
            </p>
          </Card>
          <Card>
            <form className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-foreground">
                Email
                <input
                  type="email"
                  placeholder="student@example.com"
                  className="rounded-2xl border border-border bg-background px-4 py-3 outline-none transition placeholder:text-muted-foreground focus:border-primary"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-foreground">
                Password
                <input
                  type="password"
                  placeholder="••••••••"
                  className="rounded-2xl border border-border bg-background px-4 py-3 outline-none transition placeholder:text-muted-foreground focus:border-primary"
                />
              </label>
              <button
                type="button"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Placeholder sign in
              </button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}
