import React from 'react'
import SrText from './sr-text'

export default function SocialIcon({ href, icon, label }) {
  const Icon = icon
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="p-2 inline-flex hover:text-red-600 transition-colors duration-300 ease-in-out"
    >
      <Icon size={20} />
      <SrText>{label}</SrText>
    </a>
  )
}
