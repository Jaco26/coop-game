module.exports = {
  lintOnSave: false,
  configureWebpack: {
    entry: "./src/client/main.ts",
  },
  outputDir: "dist/static",
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:3300",
      },
    },
  },
};
