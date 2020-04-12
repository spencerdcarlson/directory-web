const merge = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    contentBase: "./dist",
    proxy: {
      "/api/ds": {
        target: "http://localhost:4000",
        secure: false
      },
      "/auth": {
        target: "http://localhost:4000",
        secure: false
      }
    }
  }
});