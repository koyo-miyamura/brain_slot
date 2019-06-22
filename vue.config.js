module.exports = {
  // なんかwebsocketでエラー出るので回避
  // https://github.com/webpack/webpack-dev-server/issues/416
  publicPath: "",
  devServer: {
    host: "localhost"
  }
};
