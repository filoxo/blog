import { Pre } from './Pre'
import { H1, H2, H3, H4, H5 } from './Headings'
import { Ol, Ul } from './Lists'
// These shortcodes are what end up being available to the mdx renderer
// so custom components and default element overrides should be added here
export const components = {
  pre: Pre,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  ol: Ol,
  ul: Ul,
}
