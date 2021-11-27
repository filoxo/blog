import React from 'react'
import { Base } from './Base'

export const Blockquote = (props) => (
  <Base
    as="blockquote"
    className="pl-4 italic font-bold mt-2 border-l-4 text-black dark:text-white"
    forwardedProps={props}
  />
)
