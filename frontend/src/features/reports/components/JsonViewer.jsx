import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

/**
 * Component for rendering JSON content with expand/collapse functionality
 * Handles parse errors gracefully with raw content fallback
 */
function JsonViewer({ content }) {
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    return (
      <div className="text-red-400">
        <p className="mb-2">Invalid JSON:</p>
        <pre className="text-sm text-gray-400 whitespace-pre-wrap">{content}</pre>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm">
      <JsonNode data={parsed} name="root" isRoot />
    </div>
  );
}

/**
 * Recursive component for rendering JSON nodes
 */
function JsonNode({ data, name, isRoot = false }) {
  const [expanded, setExpanded] = useState(isRoot || name === 'root');

  if (data === null) {
    return <span className="text-gray-500">null</span>;
  }

  if (typeof data === 'boolean') {
    return <span className="text-yellow-400">{data.toString()}</span>;
  }

  if (typeof data === 'number') {
    return <span className="text-green-400">{data}</span>;
  }

  if (typeof data === 'string') {
    return <span className="text-amber-300">"{data}"</span>;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <span className="text-gray-500">[]</span>;
    }

    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-gray-400 hover:text-white"
        >
          {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          <span className="text-gray-500">[{data.length}]</span>
        </button>
        {expanded && (
          <div className="ml-4 border-l border-dark-border pl-3">
            {data.map((item, index) => (
              <div key={index} className="py-0.5">
                <span className="text-gray-500">{index}: </span>
                <JsonNode data={item} name={index.toString()} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      return <span className="text-gray-500">{'{}'}</span>;
    }

    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-gray-400 hover:text-white"
        >
          {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          <span className="text-gray-500">{'{...}'}</span>
        </button>
        {expanded && (
          <div className="ml-4 border-l border-dark-border pl-3">
            {keys.map((key) => (
              <div key={key} className="py-0.5">
                <span className="text-blue-400">"{key}"</span>
                <span className="text-gray-500">: </span>
                <JsonNode data={data[key]} name={key} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <span className="text-gray-500">{String(data)}</span>;
}

export default JsonViewer;
