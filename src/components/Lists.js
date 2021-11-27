import React from 'react'
import { Base } from './Base'

export const Ul = (props) => (
  <Base as="ul" className="ml-4 list-inside list-disc" forwardedProps={props} />
)

export const Ol = (props) => (
  <Base
    as="ol"
    className="ml-4 list-inside list-decimal"
    forwardedProps={props}
  />
)
