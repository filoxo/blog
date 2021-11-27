import React from 'react'
import Layout from '../components/layout'
import SrText from '../components/sr-text'
import { Link } from '../components/Link'
const NotFoundPage = () => (
  <Layout>
    <p className="text-4xl text-center">
      {/* eslint-disable-next-line */}
      <span aria-hidden="true">4💩4</span>
      <SrText>Page not found</SrText>
    </p>
    <p className="text-center">
      Go back to the <Link to="/">home page</Link>?
    </p>
  </Layout>
)

export default NotFoundPage
