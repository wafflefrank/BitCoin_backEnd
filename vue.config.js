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

};
