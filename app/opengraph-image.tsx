import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 45%, #e0f2fe 100%)",
          color: "#0f172a",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#334155" }}>
          AI Study Assistant
        </div>
        <div style={{ marginTop: 24, fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Summaries, quizzes, and tutoring in one place
        </div>
      </div>
    ),
    size,
  );
}
