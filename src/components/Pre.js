import React from 'react'
import { preToCodeBlock } from 'mdx-utils'

import { Code } from './code'

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
