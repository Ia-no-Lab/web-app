// components/ui/code-block.tsx
import { useState } from "react"
import { Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface CodeBlockProps {
  language: string
  value: string
}

export function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-sm bg-background border rounded px-2 py-1"
      >
        {copied ? "Copiado!" : <Copy size={16} />}
      </button>

      <SyntaxHighlighter language={language} style={oneDark} PreTag="div" className="rounded-md">
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
