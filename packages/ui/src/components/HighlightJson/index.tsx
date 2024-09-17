import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const HighlightJson = ({ json }: { json: string }) => {
  return (
    <SyntaxHighlighter language="json" style={prism} wrapLines wrapLongLines>
      {json}
    </SyntaxHighlighter>
  )
}

export default HighlightJson
