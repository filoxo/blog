import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { FaGithubAlt, FaLinkedin, FaTwitter } from 'react-icons/fa'
import SocialIcon from './SocialIcon'
import ThemeToggle from './theme-toggle'

const TopNav = ({ title }) => (
  <div className="mb-8">
    <div className="my-0 mx-auto max-w-2xl py-2 px-6 flex justify-between items-center flex-wrap">
      <h1 className="text-2xl font-semibold tracking-wide">
        <Link
          className="uppercase hover:text-red-700 transition-colors duration-300 ease-in-out"
          to="/"
        >
          {title}
        </Link>
      </h1>
      <ul className="flex items-center m-0">
        <li>
          <SocialIcon
            href="https://twitter.com/cfiloteo12"
            icon={FaTwitter}
            label="Follow me as @cfiloteo12 on Twitter"
          />
        </li>
        <li className="m-0">
          <SocialIcon
            href="https://github.com/filoxo"
            icon={FaGithubAlt}
            label="Checkout my Github profile (@filoxo)"
          />
        </li>
        <li>
          <SocialIcon
            href="https://www.linkedin.com/in/carlosfiloteo/"
            icon={FaLinkedin}
            label="Let's connect on LinkedIn"
          />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </div>
  </div>
)
TopNav.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default TopNav
