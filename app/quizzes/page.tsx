import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import ToolLoadingFallback from "@/components/ToolLoadingFallback";

const QuizGenerator = dynamic(() => import("@/components/quiz-generator"), {
  loading: () => <ToolLoadingFallback />,
});

export const metadata: Metadata = {
  title: "Quiz Generator",
  description: "Turn a topic or notes into AI-generated practice questions with answers and explanations.",
  alternates: { canonical: "/quizzes" },
};

export default function QuizzesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="AI quiz generator"
          title="Create practice questions from your material"
          description="Turn a topic or a block of notes into quiz questions with answers and explanations."
          as="h1"
        />
        <div className="mt-10">
          <QuizGenerator />
        </div>
      </Container>
    </section>
  );
}
