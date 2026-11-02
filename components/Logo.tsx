// Типографский логотип в стиле оригинала. Чтобы использовать файл логотипа,
// положите его в public/logo.png и замените содержимое на <Image src="/logo.png" ... />
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group flex flex-col leading-none ${className}`} aria-label="HYPER — hyper.tech.hub">
      <span className="font-sans text-2xl font-black italic tracking-tight text-hyper transition group-hover:text-hyper-bright sm:text-[1.7rem]">
        HYPER<sup className="ml-0.5 align-super text-[0.45em] not-italic">®</sup>
      </span>
      <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-400">tech.hub</span>
    </a>
  );
}
