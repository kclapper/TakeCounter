module.exports = {
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', {runtime: 'automatic'}],
    ],
    plugins: [
        [
            'babel-plugin-transform-scss',
            {
                'include': [
                    'node_modules',
                    '../node_modules'
                ] 
            } 
        ]
    ]
  };