const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./app/index.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "app/index.html" })
  ],
  output: {
    filename: "index_bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: "babel-loader"
    },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }]
  }
};