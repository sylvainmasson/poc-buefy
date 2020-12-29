module.exports = {
  devServer: {
    proxy: 'http://localhost:3000',
    port: '8081',
    overlay: {
      warnings: true,
      errors: true
    }
  },
  assetsDir: 'static',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Poc buefy'
      return args
    })
  }
}
