import React from 'react'
import { Link } from './Link'

export const JumpToTop = () => (
  /* "Scroll to top" is a valid use for an empty href */
  /* eslint-disable-next-line */
  <Link to="#">Jump to top&nbsp;&uarr;</Link>
)
