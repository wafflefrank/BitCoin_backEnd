module.exports = {
  // transpileDependencies: true,
  lintOnSave: false,
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/Final-Admin/' // test20200915 為 repo 名稱
      : '/',
  devServer: {
    proxy: 'http://167.179.74.47:4000',
  },
  // 網頁icon
  pwa: {
    iconPaths: {
      favicon32: 'rocket.png',
      favicon16: 'rocket.png',
      appleTouchIcon: 'rocket.png',
      maskIcon: 'rocket.png',
      msTileImage: 'rocket.png',
    },
  },

};
