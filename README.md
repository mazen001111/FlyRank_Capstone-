# AI Study Assistant

Capstone portfolio project for the FlyRank FE-04 internship track.

---

## Project Brief

Students often struggle to turn long lecture notes into something they can review quickly, practice with, and understand deeply under time pressure. **AI Study Assistant** is a web app that helps students summarize notes, generate practice quizzes, and ask an AI tutor for structured explanations—without turning study into a free-form chatbot session. The target users are secondary and university students who already take notes digitally and want a faster study loop: capture → compress → practice → clarify. This idea was chosen because it maps cleanly to a real learning workflow, showcases modern frontend architecture (Next.js App Router, Server Components, accessibility, testing, and performance), and uses AI where it creates measurable study value rather than novelty for its own sake.

---

## Features

- **Landing page** with a clear product story and CTAs into the study tools
- **Student dashboard** with activity, saved summaries, and quiz progress placeholders
- **AI note summarizer** — paste notes and receive a summary, key points, and important concepts
- **AI quiz generator** — turn a topic or notes into multiple-choice questions with answers and explanations
- **AI tutor** — ask a subject-specific question at a chosen difficulty and get a structured explanation
- **Loading, error, retry, and empty states** for every AI tool
- **Accessible forms** with labels, live regions, alerts, and keyboard-friendly controls
- **Responsive layout** across mobile and desktop
- **Component tests** with Vitest and React Testing Library
- **Production-oriented optimizations** for Lighthouse (performance, accessibility, SEO)

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS |
| Fonts | `next/font` (Manrope + Fraunces) |
| AI | Google Gemini via `@google/genai` (`gemini-flash-latest` by default, free-tier friendly) |
| Testing | Vitest, React Testing Library, Testing Library User Event, V8 coverage |
| Tooling | ESLint (Next), PostCSS, Autoprefixer |

---

## Architecture Overview

```text
Browser (RSC pages + small client islands)
        │
        ├─► /api/summary  ──┐
        ├─► /api/quizzes  ──┼─► lib/ai-service.ts ──► Google Gemini API
        └─► /api/tutor    ──┘
```

### Pages

| Route | Purpose |
| --- | --- |
| `/` | Marketing home |
| `/dashboard` | Study overview placeholders and tool shortcuts |
| `/notes` | AI summarizer |
| `/quizzes` | AI quiz generator |
| `/tutor` | AI tutor |
| `/profile` | Profile/settings placeholder |
| `/login` | Auth placeholder (keeps navigation free of 404s) |

Static marketing/dashboard shells stay **Server Components**. Interactive AI tools are **client islands**, dynamically imported so their JavaScript is route-scoped.

### Components

- **Layout / chrome:** `Navbar` (server) + `NavLinks` (client), `Footer`, `Container`, `SectionHeader`, `ButtonLink`, `Card`, `Skeleton`
- **AI tools:** `summary-form`, `quiz-generator`, `tutor-panel`
- **Shared UX:** `ToolLoadingFallback` for code-split loading states

Reusable presentation components remain server-friendly. Only components that need browser APIs or local state are marked `"use client"`.

### AI service layer

- `lib/ai-client.ts` — browser-safe fetch helpers with light retry/validation for `/api/*`
- `lib/ai-service.ts` — **server-only** Google Gemini integration (`import "server-only"` + `@google/genai`)
- `lib/ai-types.ts` — shared TypeScript contracts and type guards

The API key never ships to the client. The browser talks only to Next.js route handlers.

### API routes

| Endpoint | Method | Responsibility |
| --- | --- | --- |
| `/api/summary` | `POST` | Validate notes → `generateSummaryFromNotes` |
| `/api/quizzes` | `POST` | Validate topic/notes → `generateQuizFromTopic` |
| `/api/tutor` | `POST` | Validate subject/difficulty/question → `generateTutorExplanation` |

Each route validates input, calls the service layer, and returns structured JSON or a clear error payload.

---

## AI Integration

### Which LLM is used

The app uses the official **Google Gen AI SDK** (`@google/genai`) with the **Gemini API**.  
Default model: **`gemini-flash-latest`** (free-tier friendly). Override with optional `GEMINI_MODEL` if needed.

### How to get a Gemini API key

1. Open [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with a Google account
3. Create an API key
4. Copy the key into `.env.local` as `GEMINI_API_KEY` (never commit this file)

The free Gemini tier is enough for local development and demo usage of the summarizer, quiz generator, and tutor.

### How prompts are designed

Prompts are **task-scoped**, not open-ended chat:

1. A **system instruction** per feature (summary / quiz / tutor) that:
   - defines the study assistant role
   - forbids general chatbot behavior
2. A **user message** with the student’s notes, topic, or question (plus subject/difficulty for the tutor)
3. Gemini structured output via `responseMimeType: "application/json"` + `responseSchema`
4. Low temperature (`0.2`) for more stable study content
5. **Server-side TypeScript validation** before results reach the UI
6. Fallback messaging when Gemini is unavailable (quota/network/config errors)

Example shapes:

- Summaries: `{ summary, keyPoints, importantConcepts }`
- Quizzes: `{ questions: [{ question, options, correctAnswer, explanation }] }`
- Tutor: `{ explanation, examples, keyTakeaways }`

### Why AI is useful here

AI is applied to high-friction study tasks: compressing notes, generating practice items, and scaffolding explanations. Structured outputs make results reviewable and UI-friendly, while keeping the product focused on learning outcomes instead of free-form conversation.

---

## Setup Instructions

### Prerequisites

- Node.js 18+ (recommended: current LTS)
- npm
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Install

```bash
npm install
```

### Configure environment

```bash
cp .env.example .env.local
```

Fill in the values described in [Environment Variables](#environment-variables).

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build (recommended for Lighthouse)

```bash
npm run build
npm run start
```

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes (for AI features) | Google Gemini API key from AI Studio |
| `GEMINI_MODEL` | No | Model ID (default: `gemini-flash-latest`) |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL for metadata/OG (default: `http://localhost:3000`) |

`.env.example` contains:

```env
GEMINI_API_KEY=your_api_key_here
```

Never commit `.env.local` or real secrets.

---

## Testing

### Testing tools

- **Vitest** — test runner
- **React Testing Library** — component and user-flow tests
- **@testing-library/user-event** — realistic interactions
- **@vitest/coverage-v8** — coverage reports

### What is covered

- Reusable UI components (`Card`, `ButtonLink`, `SectionHeader`, `Skeleton`, `Container`, `Navbar`, `Footer`, `ToolLoadingFallback`)
- AI summarizer user flow: enter text → loading → success / error + retry
- AI quiz generator flow: generate questions → loading → success / error
- AI tutor flow: ask question → loading → structured explanation / error

### Commands

```bash
npm test
npm run test:watch
npm run test:coverage
npm run lint
```

### Coverage information

Latest component coverage report (V8, all `components/` sources):

| Metric | Result |
| --- | --- |
| Statements | **91.48%** |
| Lines | **92.47%** |
| Functions | **90.32%** |
| Branches | **80.64%** |

Target for the assignment: **≥ 50%** (met). HTML report: `coverage/index.html` (from `npm run test:coverage`).

---

## Accessibility

### Audit results

Lighthouse accessibility audit on the production home page (`npm run build && npm run start`):

| Category | Score |
| --- | --- |
| Accessibility | **100** |

Manual / code-level checks also confirmed:

- Document language (`lang="en"`)
- Skip link to `#main-content`
- Labeled form controls and described help text
- `aria-live` / `aria-busy` for AI result panels
- `role="alert"` for error messages
- Visible `:focus-visible` outlines
- Decorative skeletons marked `aria-hidden`

### Improvements made

- Semantic landmarks (`header`, `main`, `nav`, `footer`) with named navigation regions
- Consistent keyboard focus styles across links, buttons, and inputs
- Loading and error feedback announced to assistive tech
- `prefers-reduced-motion` support to limit non-essential animation
- Avoided icon-only controls without accessible names
- Fixed broken `/login` destination so primary nav does not lead to a dead end

---

## Performance

### Lighthouse results

Audited against a **production** build on the home page (desktop/headless Chrome):

| Category | Score |
| --- | --- |
| Performance | **98** |
| Accessibility | **100** |
| Best Practices | **96** |
| SEO | **100** |

Selected metrics:

| Metric | Value |
| --- | --- |
| First Contentful Paint | ~1.4 s |
| Largest Contentful Paint | ~2.1 s |
| Speed Index | ~1.4 s |
| Total Blocking Time | ~80 ms |
| Cumulative Layout Shift | 0 |
| Time to Interactive | ~2.3 s |

### What drove these scores

- Server Components by default; tiny client islands for pathname highlighting and AI tools
- Dynamic imports for summarizer / quiz / tutor bundles
- `next/font` with `display: "swap"` and weight subsetting
- Uncontrolled form inputs to avoid keystroke re-renders of result panes
- Reduced expensive paint effects (lighter cards, conditional header blur)
- Route-level `loading.tsx` / `error.tsx` / `not-found.tsx`
- Metadata, canonical URLs, generated icon + Open Graph image
- Compression, security headers, and long-lived static asset caching

Shared First Load JS after optimization: **~103 kB**.

---

## Deployment

### Deployment platform

Primary target: **[Vercel](https://vercel.com)** (native Next.js App Router support).

Suggested flow:

1. Push the repository to GitHub
2. Import the project in Vercel
3. Set environment variables (`GEMINI_API_KEY`, optional `GEMINI_MODEL`, `NEXT_PUBLIC_SITE_URL`)
4. Deploy the production branch (`main`)

Local production verification before deploy:

```bash
npm run build
npm run start
```

### Rollback approach

1. **Instant rollback** in the Vercel dashboard to the previous successful deployment
2. Or **git revert** the bad commit on `main` and redeploy
3. Keep secrets in the host’s env UI (not in git) so rollbacks do not risk leaking keys
4. Prefer preview deployments for PRs before promoting to production

---

## Limitations

- No real authentication, accounts, or persisted study history yet
- Dashboard metrics and saved summaries are placeholder content
- AI quality depends on provider availability, rate limits, and prompt/input quality
- No offline mode; AI features require a network call
- No rate limiting / abuse protection on public API routes beyond basic validation
- Quiz/tutor panels now have automated success/error coverage; remaining gaps are edge cases (empty quiz arrays, validation-only paths)
- Image-heavy marketing assets are intentionally avoided; the hero is CSS-based

---

## Future Improvements

- Persist notes, quizzes, and tutor sessions to a database (per-user history)
- Add authentication (e.g. Auth.js / Clerk) and protected routes
- Expand automated tests for quiz and tutor flows, plus API route tests
- Add streaming responses for longer tutor explanations
- Introduce rate limiting, request quotas, and safer content policies
- Allow export (PDF/Markdown) of summaries and quizzes
- Add teacher/classroom modes and shared study sets
- Progressive Web App support for lightweight mobile study sessions

---

## Reflection

### What was hardest?

Balancing a polished AI product experience with production frontend discipline—especially keeping Server/Client boundaries honest, returning reliable structured AI JSON, and making loading/error/retry states feel trustworthy instead of “chatbot-like.” Getting accessibility and performance right without bloating the interactive tool pages took careful iteration.

### What would you do differently?

I would introduce persistence and auth earlier so the dashboard could show real study history instead of placeholders, and I would add API-level tests alongside UI tests from day one. I would also design the three AI tools against a shared “async tool shell” pattern sooner to reduce duplicated loading/error UI.

### What surprised you?

How much of the product quality came from frontend architecture rather than the model itself: prompt + JSON schema validation, small client islands, and clear empty/loading/error states made the AI features feel like study tools instead of demos. The Lighthouse gains from shrinking the global client boundary (Navbar split) and code-splitting the AI panels were larger than expected for a relatively small app.

---

## License

Private capstone / portfolio project for the FlyRank internship program.
