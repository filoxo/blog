import React from 'react'
import { Base } from './Base'

export const H1 = (props) => (
  <Base as="h1" className="text-2xl" forwardedProps={props} />
)
export const H2 = (props) => (
  <Base as="h2" className="text-2xl" forwardedProps={props} />
)
export const H3 = (props) => (
  <Base as="h3" className="text-xl" forwardedProps={props} />
)
export const H4 = (props) => (
  <Base as="h4" className="text-xl" forwardedProps={props} />
)
export const H5 = (props) => (
  <Base as="h5" className="text-lg" forwardedProps={props} />
)
