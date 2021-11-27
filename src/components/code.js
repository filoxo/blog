import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from './themes/redline'
import { Base } from './Base'

const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta) => {
  if (!RE.test(meta)) {
    return () => false
  } else {
    const lineNumbers = RE.exec(meta)[1]
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

export const Code = ({ codeString, language, metastring }) => {
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

export const InlineCode = (props) => {
  return (
    <Base
      as="code"
      forwardedProps={props}
      className="bg-gray-200 text-black rounded-sm px-1"
    />
  )
}
