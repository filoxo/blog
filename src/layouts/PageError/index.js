import React, { PropTypes } from "react"

import Page from "../Page"

import styles from "./index.css"

const PageError = ({ error, errorText }) => (
  <Page
    head={{
      // hero credit: https://www.flickr.com/photos/mypubliclands/16101654539/
      hero: "https://farm8.staticflickr.com/7559/16101654539_bee5151340_k.jpg",
      title: `${error}: ${errorText}`
    }}
  >
    <div className={ styles.container }>
      <div className={ styles.oops }>{ "💩" }</div>
    </div>
  </Page>
)

PageError.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  errorText: PropTypes.string,
}

PageError.defaultProps = {
  error: 404,
  errorText: "Page Not Found",
}

export default PageError
