// Типографский логотип в стиле оригинала. Чтобы использовать файл логотипа,
// положите его в public/logo.png и замените содержимое на <Image src="/logo.png" ... />
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center leading-none ${className}`} aria-label="HYPER">
      <span className="font-sans text-2xl font-black italic tracking-tight text-hyper transition group-hover:text-hyper-bright sm:text-[1.7rem]">
        HYPER<sup className="ml-0.5 align-super text-[0.45em] not-italic">®</sup>
      </span>
    </a>
  );
}
