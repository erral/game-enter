const merge = require("webpack-merge");
const common = require("./webpack.config.js");
var path = require("path");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "main-[hash].js",
    publicPath: "/game-enter/"
  }
});
