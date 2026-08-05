export const siteName = "AI Study Assistant";

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/notes", label: "Notes" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/tutor", label: "Tutor" },
  { href: "/profile", label: "Profile" },
] as const;

export type NavigationLink = (typeof navigationLinks)[number];
