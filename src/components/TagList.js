import React from 'react'
import { Link } from './Link'
import './TagList.css'

export const TagList = ({ list = [] }) => {
  if (!list.length) return null
  return (
    <span className="inline-flex flex-wrap">
      <ul
        aria-label="Tags:"
        className="tag-list inline-flex flex-wrap m-0 space-x-2"
      >
        {list.map((tag, index) => (
          <li key={tag}>
            <Link to={`/tags/${tag}`}>{tag}</Link>
            {index !== list.length - 1 && ', '}
          </li>
        ))}
      </ul>
    </span>
  )
}
