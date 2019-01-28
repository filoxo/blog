import React from 'react'
import { Link } from 'gatsby'

import styles from './tags.module.css'
import {link} from '../components/link.module.css'

export default function Tags({ list = [] }) {
  return (
    <ul className={styles.tagList}>
      {list.map(tag => (
        <li key={tag}>
          <Link className={link} to={`/tags/${tag}`}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}