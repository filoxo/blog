import { defineConfig, presetUno, presetTypography } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['src/**/*.{njk,md,html}', '_site/**/*.html'],
  },
  presets: [presetUno(), presetTypography()],
})
