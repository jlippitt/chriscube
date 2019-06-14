const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: ['./node_modules', './src'],
  },
  output: {
    filename: 'webgl.js',
    path: path.resolve(__dirname, 'public'),
  },
};
