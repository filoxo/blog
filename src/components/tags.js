import React from 'react'
import { Link } from './Link'

export default function Tags({ list = [] }) {
  if (!list.length) return null
  return (
    <>
      <h3 className="inline-flex">Tags:&nbsp;</h3>
      <ul className="inline-flex m-0 space-x-4">
        {list.map((tag, index) => (
          <li key={tag}>
            <Link to={`/tags/${tag}`}>{tag}</Link>
            {index !== list.length - 1 && ', '}
          </li>
        ))}
      </ul>
    </>
  )
}
