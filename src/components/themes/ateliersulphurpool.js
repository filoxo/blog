const ateliersulphurpool = {
  plain: {
    color: '#5e6687',
    backgroundColor: '#f5f7ff',
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: 'rgb(137,142,164)',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(137,142,164)',
      },
    },
    {
      types: ['builtin', 'changed', 'keyword', 'attr-value'],
      style: {
        color: '#ac9739',
      },
    },
    {
      types: ['number', 'inserted', 'attr-name', 'operator'],
      style: {
        color: '#c76b29',
      },
    },
    {
      types: ['deleted', 'string'],
      style: {
        color: '#22a2c9',
      },
    },
    {
      types: ['selector'],
      style: {
        color: '#6679cc',
      },
    },
    {
      // Fix tag color
      types: ['variable', 'tag'],
      style: {
        color: '#3d8fd1',
      },
    },
    {
      // Fix tag color for HTML
      types: ['tag'],
      languages: ['markup'],
      style: {
        color: '#3d8fd1',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#5e6687',
      },
    },
    {
      // Fix punctuation color for HTML
      types: ['punctuation'],
      languages: ['markup'],
      style: {
        color: '#5e6687',
      },
    },
  ],
}

export default ateliersulphurpool
