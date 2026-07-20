import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { ZoomableImage } from "./ZoomableImage";
import "./styles/markdown-renderer.css";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("shell", bash);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("dockerfile", docker);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("markup", markup);
SyntaxHighlighter.registerLanguage("html", markup);
SyntaxHighlighter.registerLanguage("xml", markup);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("yml", yaml);

const isExternalHref = (href: string) =>
  /^([a-z][a-z0-9+.-]*:)/i.test(href) && !href.startsWith("#");

/**
 * Resolves a local image reference to its build asset URL regardless of how
 * it was written in the Markdown ("./images/x.png", "images/x.png", or a bare
 * "x.png"), and regardless of URL-encoding (authors often write "%20" for a
 * space, while the actual map key is the literal, decoded filename).
 */
const resolveLocalImageSrc = (src: string, images: Record<string, string>): string => {
  const fileName = src.split("/").pop() ?? src;

  let decodedFileName = fileName;
  try {
    decodedFileName = decodeURIComponent(fileName);
  } catch {
    // Malformed escape sequence — fall back to the raw filename.
  }

  return images[decodedFileName] ?? images[fileName] ?? src;
};

interface MarkdownRendererProps {
  content: string;
  /** Maps local image references (as written in the Markdown) to resolved asset URLs. */
  images?: Record<string, string>;
}

export const MarkdownRenderer = ({ content, images = {} }: MarkdownRendererProps) => {
  const components: Components = {
    h1: ({ children, ...props }) => (
      <h2 {...props} className="markdown-heading">
        {children}
      </h2>
    ),
    a: ({ href = "", children, ...props }) => {
      if (isExternalHref(href)) {
        return (
          <a href={href} {...props}>
            {children}
          </a>
        );
      }
      return (
        <Link to={href} {...props}>
          {children}
        </Link>
      );
    },
    img: ({ src = "", alt }) => {
      const isExternal = isExternalHref(src);
      const resolvedSrc = isExternal ? src : resolveLocalImageSrc(src, images);
      return <ZoomableImage src={resolvedSrc} alt={alt} />;
    },
    code(props) {
      const { children, className, ...rest } = props;
      const match = /language-(\w+)/.exec(className || "");

      if (match) {
        return (
          <SyntaxHighlighter
            language={match[1]}
            style={vscDarkPlus}
            PreTag="div"
            customStyle={{
              margin: "20px 0",
              borderRadius: "16px",
              padding: "24px",
              background: "#151515",
              fontSize: "14px",
              lineHeight: "1.6em",
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
      }

      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    },
    table: ({ children, ...props }) => (
      <div className="markdown-table-wrapper">
        <table {...props}>{children}</table>
      </div>
    ),
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
