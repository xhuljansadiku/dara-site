type Props = {
  text: string;
  /** Rresht i ri pas `\n`, pas `;`, dhe pas fjalisë (`. ` / `: `). Për tekste si shënimi i çmimit. */
  variant?: "default" | "rich";
};

/** Pas çdo rreshti në tekst, pas `;`, ose pas fjalisë (pas `.` / `:` kur ka hapësirë), vetëm me variant `rich`. */
function splitRichLines(text: string): string[] {
  const out: string[] = [];
  for (const block of text.split(/\r?\n/)) {
    const line = block.trim();
    if (!line) continue;
    if (line.includes(";")) {
      for (const part of line.split(/\s*;\s*/)) {
        const p = part.trim();
        if (p) out.push(p);
      }
    } else {
      const sentences = line
        .split(/(?<=[.:])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (sentences.length > 1) {
        out.push(...sentences);
      } else {
        out.push(line);
      }
    }
  }
  return out;
}

export default function TextWithBreaksAfterPeriods({ text, variant = "default" }: Props) {
  if (variant === "rich") {
    const lines = splitRichLines(text);
    if (lines.length <= 1) {
      return <>{text}</>;
    }
    return (
      <>
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </>
    );
  }

  const parts = text.split(/(?<=[.:])\s+/).filter((p) => p.trim().length > 0);
  if (parts.length <= 1) {
    return <>{text}</>;
  }
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part.trim()}
          {i < parts.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}
