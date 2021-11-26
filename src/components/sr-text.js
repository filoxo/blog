import React from 'react'

import { srText } from './sr-text.module.css'

export default function SrText({ children }) {
  return <span className={srText}>{children}</span>
}
