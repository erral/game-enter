const merge = require("webpack-merge");
const common = require("./webpack.config.js");
var path = require("path");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main-[hash].js"
  }
});
