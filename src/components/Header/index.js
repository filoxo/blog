import React, { PropTypes } from "react"
import { Link } from "phenomic"
import Svg from "react-svg-inline"

import twitterSvg from "../icons/iconmonstr-twitter-1.svg"
import gitHubSvg from "../icons/iconmonstr-github-1.svg"
import linkedinSvg from "../icons/iconmonstr-linkedin-1.svg"

import styles from "./index.css"

const Header = (props, { metadata: { pkg } }) => (
  <header className={ styles.header }>
    <nav className={ styles.nav }>
      <div className={ styles.navPart1 }>
        <Link
          className={ styles.link }
          to={ "/" }
        >
          { "Home" }
        </Link>
      </div>
      <div className={ styles.navPart2 }>
        {
          pkg.twitter &&
          <a
            href={ `https://twitter.com/${pkg.twitter}` }
            className={ styles.link }
          >
            <Svg svg={ twitterSvg } cleanup />
            <span className="sr-text">{ "Twitter" }</span>
          </a>
        }
        {
          pkg.github &&
          <a
            href={ pkg.github }
            className={ styles.link }
          >
            <Svg svg={ gitHubSvg } cleanup />
            <span className="sr-text">{ "GitHub" }</span>
          </a>
        }
        {
          pkg.linkedin &&
          <a
            href={ pkg.linkedin }
            className={ styles.link }
          >
            <Svg svg={ linkedinSvg } cleanup />
            <span className="sr-text">{ "LinkedIn" }</span>
          </a>
        }
      </div>
    </nav>
  </header>
)

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header
