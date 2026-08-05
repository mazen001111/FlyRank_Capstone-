import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

export default function ProfilePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="User profile"
          title="Profile placeholder"
          description="Reserved for student preferences, learning goals, and account settings later on."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-semibold text-primary">
              A
            </div>
            <p className="mt-4 text-lg font-semibold text-foreground">Anonymous Student</p>
            <p className="mt-1 text-sm text-muted-foreground">Profile details will be connected later.</p>
          </Card>
          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Settings placeholder</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Use this route for display preferences, goals, and future personalization controls.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
