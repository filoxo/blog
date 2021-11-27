// Source https://github.com/cammarb/redline-theme/blob/master/themes/RedLine-theme-color-theme.json
// Generated with https://github.com/FormidableLabs/prism-react-renderer/blob/master/tools/themeFromVsCode/README.md
const redline = {
  plain: {
    color: '#ffffff',
    // Tailwind gray-800
    backgroundColor: '#1F2937',
  },
  styles: [
    {
      types: ['comment', 'punctuation'],
      style: {
        // Tailwind red-300
        color: '#FCA5A5',
        fontStyle: 'italic',
      },
    },
    {
      types: [
        'variable',
        'constant',
        'tag',
        'deleted',
        'string',
        'symbol',
        'inserted',
        'attr-name',
      ],
      style: {
        // Tailwind red-600
        color: '#DC2626',
      },
    },
    {
      types: ['keyword', 'function', 'builtin', 'number', 'char', 'changed'],
      style: {
        color: 'rgb(255, 255, 255)',
      },
    },
  ],
}

export default redline
