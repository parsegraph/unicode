const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/unicode.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "unicode.js",
    globalObject: "this",
    library: "unicode",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader!ts-loader'
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["ts-shader-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".glsl"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  mode: "development",
  devtool: "eval-source-map",
};
