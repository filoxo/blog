import React, { PropTypes } from "react"
import cx from "classnames"
import { Link } from "phenomic"

import styles from "../Button/index.css"

const ButtonLink = ({to, className, text}) => (
    <Link to={to} 
        className={cx({
            [className]: className,
            [styles.button]: true
        })}>
        { text }
    </Link>
)

ButtonLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  text: PropTypes.string
}

ButtonLink.displayName = "ButtonLink"

export default ButtonLink