import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from './themes/redline'
import { preToCodeBlock } from 'mdx-utils'

const HIGHLIGHT_RANGES = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta) => {
  if (!HIGHLIGHT_RANGES.test(meta)) {
    return () => false
  } else {
    const lineNumbers = HIGHLIGHT_RANGES.exec(meta)[1]
      .split(',')
      .map((v) => v.split('-').map((v) => parseInt(v, 10)))
    return (index) => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      )
      return inRange
    }
  }
}

const Code = ({ codeString, language, metastring }) => {
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} px-3 py-2 rounded-lg overflow-auto`}
          style={style}
        >
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i })
            if (shouldHighlightLine(i)) {
              lineProps.className = `${lineProps.className} bg-white bg-opacity-20`
            }
            return (
              <div {...lineProps}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}

export function Pre(props) {
  const codeBlockProps = preToCodeBlock(props)
  // if there's a codeString and some props, we passed the test
  if (codeBlockProps) {
    return <Code {...codeBlockProps} />
  } else {
    // it's possible to have a pre without a code in it
    return <pre {...props} />
  }
}
