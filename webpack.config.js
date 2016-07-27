var webpack = require('webpack');


module.exports = {
  entry: "./app/app.js",
  output: {
    path: "./",
    filename: "bundle.js"
  }
};


module.exports = {
    entry: "./app/app.js",
    output: {
        filename: "public/js/bundle.js",
        sourceMapFilename: "public/js/bundle.map"
    },
    devtool: '#source-map',
    module: {
      loaders: [
        {
          test: [/\.jsx?$/, /\.js?$/],
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    },
    resolve: {
      extensions: ["", ".js", ".jsx"]
    }
}
