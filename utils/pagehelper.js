var pageInitializer = {
  onReady: function () {
    this.ganks = this.selectComponent("#ganks")
    this.ganks.fetchData(true)
  },

  onPullDownRefresh: function () {
    this.ganks.fetchData(true)
  },

  onReachBottom: function () {
    this.ganks.fetchData(false)
  },

  onTabItemTap: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
}

module.exports = {
  pageInitializer: pageInitializer
}