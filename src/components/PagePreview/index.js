import React, { PropTypes } from "react"
import { Link } from "phenomic"

import ButtonLink from "../../components/ButtonLink"

import styles from "./index.css"

const PagePreview = ({ __url, title, date, description }) => {
  const pageDate = date ? new Date(date) : null

  return (
    <article className={ styles.wrapper }>
      <Link to={ __url } className={ styles.title }>
        { title }
      </Link>
      <div className={ styles.meta }>
        {
          pageDate &&
            <time key={ pageDate.toISOString() }>
              { pageDate.toDateString() }
            </time>
        }
      </div>
      <p className={ styles.description }>
        { description }
        { " " }
      </p>
      <div>
        <ButtonLink to={ __url } className={ styles.readMore } text={ "Read More →" }/>
      </div>      
    </article>
  )
}

PagePreview.propTypes = {
  __url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  description: PropTypes.string,
}

export default PagePreview
