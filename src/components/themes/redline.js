const redline = {
  plain: {
    color: '#ffffff',
    backgroundColor: '#111111',
  },
  styles: [
    {
      types: ['comment', 'punctuation'],
      style: {
        color: 'rgb(255, 173, 173)',
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
        color: 'rgb(255, 0, 51)',
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
