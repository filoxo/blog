import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import '../css/main.css'

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func
  }

  render() {
    const { location } = this.props

    const isRoot = location.pathname === '/'

    return (
      <div>
        <Helmet
          title="Filoblog"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        />
        <div
          style={{
            background: `#333`,
            marginBottom: `1.45rem`
          }}
        >
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `1rem 0.75rem`
            }}
          >
            <h1 style={{ margin: 0, fontSize: `2rem` }}>
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none'
                }}
              >
                Filoblog
              </Link>
            </h1>
          </div>
        </div>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0
          }}
        >
          {this.props.children()}
        </div>
      </div>
    )
  }
}
