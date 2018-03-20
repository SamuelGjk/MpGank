// pages/meizhi/meizhi.js

var Api = require('../../network/api.js')

Page({
  page: 1,

  data: {
    meizis: [],
    loadingHidden: false,
    singleImage: "",
    singleImageHidden: true,
    opacity: 0,
    opacityAnimation: {}
  },

  onLoad: function (options) {
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    }).opacity(1)

    this.fetchData(true)
  },

  onPullDownRefresh: function () {
    this.fetchData(true)
  },

  onReachBottom: function () {
    this.fetchData(false)
  },

  onItemClick: function (event) {
    this.setData({
      singleImage: event.currentTarget.dataset.src,
      singleImageHidden: false
    })
  },

  onImageLoad: function (event) {
    this.setData({
      opacityAnimation: this.animation.step().export()
    })
  },

  onTouchMove: function (event) {
    // Empty
    // 用于屏蔽底层页面滚动
  },

  onSingleImageClick: function (event) {
    this.setData({
      singleImage: "",
      opacity: 0,
      singleImageHidden: true
    })
  },

  saveImage: function (event) {
    wx.showLoading({
      title: "正在下载图片",
      mask: true
    })
    wx.downloadFile({
      url: this.data.singleImage,
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.showToast({
              title: "图片已保存到相册",
              icon: "none"
            })
          },
          fail: () => {
            wx.showToast({
              title: "图片保存失败",
              icon: "none"
            })
          }
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  onTabItemTap: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  fetchData: function (clear) {
    this.page = clear ? 1 : ++this.page
    Api.fetchData("福利", this.page, {
      success: res => {
        var items = clear ? res.data.results : this.data.meizis.concat(res.data.results)
        this.setData({
          meizis: items,
          loadingHidden: items.length < Api.PAGE_SIZE
        })
      },
      complete: () => {
        if (clear) {
          setTimeout(() => {
            wx.stopPullDownRefresh()
          }, 1000)
        }
      }
    })
  }
})