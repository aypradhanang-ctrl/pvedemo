type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto max-w-3xl text-center"
      : "max-w-3xl";

  return (
    <div className={alignment}>
      <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-red-500">
        {eyebrow}
      </p>

      <h2 className="mt-4 font-['Arial_Narrow',_'Avenir_Next_Condensed',sans-serif] text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 text-base leading-8 text-white/65">
          {description}
        </p>
      ) : null}
    </div>
  );
}
