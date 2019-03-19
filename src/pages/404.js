import React from 'react'
import Layout from '../components/layout'

const NotFoundPage = () => (
  <Layout>
    <h1
      style={{
        textAlign: 'center',
      }}
    >
      NOT FOUND
    </h1>
    <p
      style={{
        fontSize: '4rem',
        lineHeight: '4rem',
        textAlign: 'center',
      }}
      title="404 error"
    >
      {/* eslint-disable-next-line */}
      <span aria-hidden="true">4💩4</span>
    </p>
  </Layout>
)

export default NotFoundPage
