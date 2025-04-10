import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, Check } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const CodeBlock = ({
    inline,
    className,
    children,
  }: {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      if (children) {
        navigator.clipboard.writeText(children.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    if (inline || !match) {
      return (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    }

    return (
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-white border px-2 py-1 rounded flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-600" />
              Kopiert!
            </>
          ) : (
            <>
              <Copy size={14} />
              Kopier
            </>
          )}
        </button>
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{ borderRadius: "0.5rem", fontSize: "0.85rem" }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
<div className="prose prose-sm prose-p:mb-4 prose-li:mb-2 prose-headings:mt-4 prose-headings:mb-2 prose-code:font-medium">
<ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
