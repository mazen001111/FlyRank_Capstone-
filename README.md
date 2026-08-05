# AI Study Assistant

AI Study Assistant is a Next.js App Router capstone skeleton for the FlyRank FE-04 internship assignment. It provides a clean production-style foundation for a student-focused platform that can later support note organization, summaries, quizzes, and AI tutoring.

## Tech Stack

- Next.js 15 App Router
- JavaScript
- React 19
- Tailwind CSS
- Server Components by default

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the app at `http://localhost:3000`.

## Available Routes

- `/` - Landing page
- `/login` - Authentication placeholder
- `/dashboard` - Student dashboard placeholder
- `/notes` - Notes management placeholder
- `/ai-tutor` - AI tutor placeholder
- `/profile` - User profile placeholder
- `/health` - Health check page that fetches from a public test API

## Deployment Information

- The project builds successfully with `npm run build`.
- It is ready for Vercel deployment as a static-friendly Next.js app.
- The `/health` route currently uses JSONPlaceholder as a mock external data source.
- Before shipping a real product, replace the placeholder auth, AI, and backend integrations with your production services.

## Notes

- `node_modules` is ignored.
- Environment files are ignored through `.gitignore`, while `.env.example` remains tracked as the template.
- No sensitive values are committed in the repository.
