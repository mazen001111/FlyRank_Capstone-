type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
};

export default function SectionHeader({ eyebrow, title, description, align = "left", as = "h2" }: SectionHeaderProps) {
  const alignmentClass = align === "center" ? "text-center" : "text-left";
  const Heading = as;

  return (
    <div className={`max-w-3xl ${alignmentClass}`}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p> : null}
      <Heading className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">{title}</Heading>
      {description ? <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
