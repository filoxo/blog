import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { FaGithubAlt, FaLinkedin, FaTwitter } from 'react-icons/fa'

import SrText from './sr-text'
import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <div className={styles.headerContainer}>
    <div className={styles.headerContent}>
      <h1 className={styles.headerTitle}>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <ul className={styles.menuIcons}>
        <li>
          <a
            href="https://twitter.com/cfiloteo12"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaTwitter size={20} />
            <SrText>Follow me as @cfiloteo12 on Twitter</SrText>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/filoxo"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaGithubAlt size={20} />
            <SrText>Checkout my Github profile (@filoxo)</SrText>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/carlosfiloteo/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedin size={20} />
            <SrText>Let's connect on LinkedIn</SrText>
          </a>
        </li>
      </ul>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
