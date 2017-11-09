import React, { PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import PagesList from "../../components/PagesList"

import styles from "./index.css"

const defaultNumberOfPosts = 6

const LatestPosts = (props, { collection }) => {
  const timeThreshold = new Date().getTime() - 5184000000 // 60 days (60 * 24 * 60 * 60 * 1000)
  const latestPosts = enhanceCollection(collection, {
    filter: { layout: "Post" },
    sort: "date",
    reverse: true,
  })
  .slice(0, props.numberOfPosts || defaultNumberOfPosts)
  .filter(({date}) => Date.parse(date) > timeThreshold)

  return (
    <div>
      <h2 className={ styles.latestPosts }>
        { "Latest Posts" }
      </h2>
      <PagesList pages={ latestPosts } />
    </div>
  )
}

LatestPosts.propTypes = {
  numberOfPosts: PropTypes.number,
}

LatestPosts.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default LatestPosts
