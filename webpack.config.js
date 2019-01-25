const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts'],
    modules: ['./node_modules', './src'],
  },
  output: {
    filename: 'webgl.js',
    path: path.resolve(__dirname, 'public'),
  },
};
