export default function SectionHeading({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-hyper-bright">{tag}</p>
      <h2 className="mt-3 text-3xl font-black uppercase italic leading-tight tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-neutral-400 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
