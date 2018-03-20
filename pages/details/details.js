// pages/details/details.js
Page({
  data: {
    url: ''
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.setData({
      url: options.url
    })
  }
})