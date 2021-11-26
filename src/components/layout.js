import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import TopNav from './TopNav'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          {
            name: 'description',
            content: 'My thoughts on development and other stuff.',
          },
          { name: 'keywords', content: 'javascript, development, blog' },
        ]}
      >
        <html lang="en" />
        <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100" />
      </Helmet>
      <TopNav title={data.site.siteMetadata.title} />
      <div className="my-0 mx-auto max-w-2xl py-2 px-6">{children}</div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
