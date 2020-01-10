var path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  entry: {
    "pwa-const": "./src/pwa-const.js",
    "ios-invitation": "./src/ios-invitation.js"
  },
  externals: [nodeExternals(), "./pwa-const"],
  output: {
    filename: "[name].js",
    path: __dirname,
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          "css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
          "postcss-loader"
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"]
          }
        }
      }
    ]
  }
};
