import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import { CodeBlock } from "@/components/ui/code-block"

const components: Components = {
  code: ({ inline, className, children, ...props }: any) => {
    if (inline) {
      return (
        <code className="bg-muted px-1 py-0.5 rounded font-mono text-sm" {...props}>
          {children}
        </code>
      )
    }

    const match = /language-(\w+)/.exec(className || "")
    return (
      <CodeBlock
        language={match?.[1] || "text"}
        value={String(children).replace(/\n$/, "")}
      />
    )
  }
}

export function MarkdownRenderer({ content }: { content: string }) {
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>
}
