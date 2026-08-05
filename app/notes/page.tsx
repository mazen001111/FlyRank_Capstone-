import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import ToolLoadingFallback from "@/components/ToolLoadingFallback";

const SummaryForm = dynamic(() => import("@/components/summary-form"), {
  loading: () => <ToolLoadingFallback />,
});

export const metadata: Metadata = {
  title: "Notes Summarizer",
  description: "Paste class notes or reading content and generate a concise AI study summary.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="AI note summarizer"
          title="Turn notes into a clean study summary"
          description="Paste class notes or reading content, then generate a concise summary you can review or reuse in quizzes."
          as="h1"
        />
        <div className="mt-10">
          <SummaryForm />
        </div>
      </Container>
    </section>
  );
}
