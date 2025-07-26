const rules = require('./webpack.rules.cjs');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: [ '.jsx', '.js', '.json' ]
  },
  module: {
    rules,
  },
};
