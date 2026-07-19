import type { HeadingItem } from "../lib/useHeadings";

interface TableOfContentsProps {
  headings: HeadingItem[];
  activeId: string | null;
}

export const TableOfContents = ({ headings, activeId }: TableOfContentsProps) => {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="article-toc" aria-label="Table of contents">
      <span className="article-toc-title">On this page</span>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`article-toc-item article-toc-level-${heading.level}${
              activeId === heading.id ? " active" : ""
            }`}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
