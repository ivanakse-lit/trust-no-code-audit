import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Enhanced Markdown viewer with excellent formatting for security reports
 * Supports emojis, tables, code blocks, and visual hierarchy
 */
function MarkdownViewer({ content }) {
  // Helper to detect severity-related content for coloring
  const getSeverityColor = (text) => {
    const str = String(text).toLowerCase();
    if (str.includes('critical')) return 'text-red-400';
    if (str.includes('high')) return 'text-orange-400';
    if (str.includes('medium')) return 'text-yellow-400';
    if (str.includes('low')) return 'text-green-400';
    if (str.includes('info')) return 'text-blue-400';
    return '';
  };

  return (
    <div className="report-viewer text-base leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Main title - large and prominent
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-white mt-8 mb-6 first:mt-0 pb-3 border-b-2 border-blue-500/30">
              <span className="flex items-center gap-3">{children}</span>
            </h1>
          ),
          
          // Section headers - clear visual breaks
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-white mt-10 mb-5 pt-6 border-t border-dark-border first:border-t-0 first:pt-0">
              <span className="flex items-center gap-2">{children}</span>
            </h2>
          ),
          
          // Subsection headers
          h3: ({ children }) => (
            <h3 className="text-xl font-medium text-blue-300 mt-8 mb-4">
              <span className="flex items-center gap-2">{children}</span>
            </h3>
          ),
          
          // Minor headers
          h4: ({ children }) => (
            <h4 className="text-lg font-medium text-gray-200 mt-6 mb-3">
              {children}
            </h4>
          ),
          
          // Paragraphs with good spacing
          p: ({ children }) => (
            <p className="text-gray-300 mb-4 leading-7 text-[15px]">
              {children}
            </p>
          ),
          
          // Unordered lists with better spacing
          ul: ({ children }) => (
            <ul className="mb-5 ml-1 space-y-2">
              {children}
            </ul>
          ),
          
          // Ordered lists
          ol: ({ children }) => (
            <ol className="mb-5 ml-1 space-y-2 list-decimal list-inside">
              {children}
            </ol>
          ),
          
          // List items with bullet styling
          li: ({ children }) => (
            <li className="text-gray-300 leading-7 flex items-start gap-2">
              <span className="text-blue-400 mt-2 flex-shrink-0">•</span>
              <span className="flex-1">{children}</span>
            </li>
          ),
          
          // Inline code
          code: ({ inline, className, children }) => {
            if (inline) {
              return (
                <code className="px-2 py-1 bg-dark-hover text-pink-400 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            // Code blocks handled by pre
            return (
              <code className="text-sm font-mono text-gray-300">
                {children}
              </code>
            );
          },
          
          // Code blocks with syntax highlighting appearance
          pre: ({ children }) => (
            <pre className="bg-[#1a1a2e] border border-dark-border rounded-xl p-5 mb-5 overflow-x-auto text-sm leading-6">
              {children}
            </pre>
          ),
          
          // Blockquotes for important notes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-yellow-500 bg-yellow-500/5 pl-5 pr-4 py-3 my-5 rounded-r-lg">
              <div className="text-yellow-200/90 italic">
                {children}
              </div>
            </blockquote>
          ),
          
          // Tables with nice styling
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6 rounded-lg border border-dark-border">
              <table className="min-w-full divide-y divide-dark-border">
                {children}
              </table>
            </div>
          ),
          
          thead: ({ children }) => (
            <thead className="bg-dark-hover">
              {children}
            </thead>
          ),
          
          tbody: ({ children }) => (
            <tbody className="divide-y divide-dark-border bg-dark-card/50">
              {children}
            </tbody>
          ),
          
          tr: ({ children }) => (
            <tr className="hover:bg-dark-hover/50 transition-colors">
              {children}
            </tr>
          ),
          
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-200 whitespace-nowrap">
              {children}
            </th>
          ),
          
          td: ({ children }) => {
            const severityColor = getSeverityColor(children);
            return (
              <td className={`px-4 py-3 text-sm ${severityColor || 'text-gray-300'}`}>
                {children}
              </td>
            );
          },
          
          // Links
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 decoration-blue-400/30 hover:decoration-blue-300" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          
          // Bold text
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          
          // Italic/emphasis
          em: ({ children }) => (
            <em className="italic text-gray-200">{children}</em>
          ),
          
          // Horizontal rules - clear section breaks
          hr: () => (
            <hr className="my-8 border-t-2 border-dark-border" />
          ),
          
          // Images
          img: ({ src, alt }) => (
            <img 
              src={src} 
              alt={alt} 
              className="max-w-full h-auto rounded-lg my-4 border border-dark-border"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownViewer;
