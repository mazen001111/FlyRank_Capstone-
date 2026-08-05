import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import TutorPanel from "@/components/tutor-panel";

export default function TutorPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="AI tutor"
          title="Get explanations tailored to your study needs"
          description="Choose a subject, set the difficulty, and ask a question to get an AI-style explanation and next-step guidance."
          as="h1"
        />
        <div className="mt-10">
          <TutorPanel />
        </div>
      </Container>
    </section>
  );
}
