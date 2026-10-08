type Props = {
  source: string;
  className?: string;
};

/** Minimal markdown: paragraphs, **bold**, and "- " lists. */
export function MarkdownLite({ source, className }: Props) {
  const blocks = source.trim().split(/\n\n+/);

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const isList = lines.every((line) => /^[-*]\s+/.test(line.trim()) || !line.trim());
        if (isList && lines.some((line) => line.trim())) {
          return (
            <ul key={i}>
              {lines
                .filter((line) => line.trim())
                .map((line, j) => (
                  <li key={j}>{renderInline(line.replace(/^[-*]\s+/, ""))}</li>
                ))}
            </ul>
          );
        }

        const isNumbered =
          lines.every((line) => /^\d+\.\s+/.test(line.trim()) || !line.trim()) &&
          lines.some((line) => line.trim());
        if (isNumbered) {
          return (
            <ol key={i}>
              {lines
                .filter((line) => line.trim())
                .map((line, j) => (
                  <li key={j}>{renderInline(line.replace(/^\d+\.\s+/, ""))}</li>
                ))}
            </ol>
          );
        }

        return <p key={i}>{renderInline(lines.join(" "))}</p>;
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}
