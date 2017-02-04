import React from "react"

import styles from "./index.css"

const Footer = () => (
  <footer className={ styles.footer }>
    <p className={ styles.phenomicReference }>
      { "Website generated with " }
      <a href={ process.env.PHENOMIC_HOMEPAGE }>
        <span className={ styles.phenomicReferenceName }>
          { `<${ process.env.PHENOMIC_NAME} />` }
        </span>
      </a>
    </p>
  </footer>
)

export default Footer
