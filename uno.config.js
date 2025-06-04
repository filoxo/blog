import { defineConfig, presetWind3, presetTypography } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['src/**/*.{njk,md,html}', '_site/**/*.html'],
  },
  presets: [presetWind3(), presetTypography()],
})
