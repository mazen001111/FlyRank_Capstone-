export default function SectionHeader({ eyebrow, title, description, align = "left" }) {
  const alignmentClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`max-w-3xl ${alignmentClass}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
