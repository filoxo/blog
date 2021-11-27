import React from 'react'
import { Base } from './Base'

export const InlineCode = (props) => (
  <Base
    as="code"
    forwardedProps={props}
    className="bg-gray-200 text-black rounded-sm px-1"
  />
)
