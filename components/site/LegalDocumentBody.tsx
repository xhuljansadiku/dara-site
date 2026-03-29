import type { LegalSection } from "@/lib/legal-pages-content";
import { LEGAL_CONTACT_EMAIL } from "@/lib/legal-pages-content";

function Paragraph({ text }: { text: string }) {
  const parts = text.split(LEGAL_CONTACT_EMAIL);
  if (parts.length === 1) {
    return <p className="mt-0 first:mt-0">{text}</p>;
  }
  return (
    <p className="mt-0">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}`}
              className="font-medium text-neutral-950 underline decoration-[#B89D5E]/60 underline-offset-2 transition hover:decoration-[#B89D5E]"
            >
              {LEGAL_CONTACT_EMAIL}
            </a>
          )}
        </span>
      ))}
    </p>
  );
}

export default function LegalDocumentBody({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="space-y-6 md:space-y-8">
      {sections.map((section, i) => (
        <div
          key={i}
          className="rounded-3xl border border-stone-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-black/[0.03] md:p-8"
        >
          <h2 className="text-lg font-semibold tracking-tight text-neutral-950 md:text-xl">
            {section.title}
          </h2>
          {"paragraphs" in section && (
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-neutral-600">
              {section.paragraphs.map((p, j) => (
                <Paragraph key={j} text={p} />
              ))}
            </div>
          )}
          {"list" in section && (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-neutral-600">
              {section.list.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
