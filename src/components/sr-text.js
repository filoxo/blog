import React from 'react'

import styles from './sr-text.module.css'

export default function SrText({ children }) {
  return <span className={styles.srText}>{children}</span>
}
