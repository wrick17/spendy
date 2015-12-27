module.exports = {
  entry: "./app/index.jsx",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: './node_modules',
      },
      {
        test: /\.js?$/,
        loader: "uglify"
      }
    ]
  }
};

// ,
//       {
//         test: /\.js?$/,
//         loader: "uglify"
//       }