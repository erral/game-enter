const merge = require("webpack-merge");
const common = require("./webpack.prod.js");

module.exports = merge.smart(common, {
  mode: "production",
  output: {
    filename: "main-[hash].js",
    publicPath: "/game-enter/"
  }
});
