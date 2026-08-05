export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-border/70 bg-card/85 p-6 shadow-soft backdrop-blur ${className}`}>
      {children}
    </div>
  );
}
