import type { ReactNode } from 'react';

const CODE_LINE = /^`([^`]+)`$/;

export function ProjectDescription({ text, className }: { text: string; className?: string }) {
  const lines = text.split('\n');
  return (
    <p className={className}>
      {lines.map((line, i) => {
        const m = line.match(CODE_LINE);
        const node: ReactNode = m ? <code className="project-desc-code">{m[1]}</code> : line;
        return (
          <span key={i}>
            {i > 0 ? <br /> : null}
            {node}
          </span>
        );
      })}
    </p>
  );
}
