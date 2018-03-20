// pages/search/search.js

var Api = require('../../network/api.js')
var dateFormat = require('../../utils/dateformat.js')

Page({

  keyword: "",
  page: 1,

  data: {
    results: [],
    loadingHidden: true
  },

  onPullDownRefresh: function () {
    this.doSearch(true)
  },

  onReachBottom: function () {
    this.doSearch(false)
  },

  onItemClick: function (event) {
    var dataset = event.currentTarget.dataset
    wx.navigateTo({
      url: '../details/details?title=' + dataset.title + '&url=' + event.currentTarget.dataset.url
    })
  },

  onSearch: function (event) {
    this.keyword = event.detail.value
    if (this.keyword != "") {
      wx.showLoading({
        title: "搜索中",
        mask: true
      })
    }
    this.doSearch(true)
  },

  doSearch: function (clear) {
    if (this.keyword == "") {
      if (this.data.results.length > 0) {
        this.setData({
          results: [],
          loadingHidden: true
        })
      }
      wx.showToast({
        title: "关键词不能为空",
        icon: "none"
      })
      wx.stopPullDownRefresh()
      return
    }

    this.page = clear ? 1 : ++this.page
    Api.search(this.keyword, this.page, {
      success: res => {
        res.data.results = res.data.results.map(result => {
          result.publishedAt = dateFormat(new Date(result.publishedAt), "yyyy-mm-dd HH:MM")
          return result
        })
        var items = clear ? res.data.results : this.data.results.concat(res.data.results)
        if (items.length == 0) {
          wx.showToast({
            title: "啥都没有",
            icon: "none"
          })
        }
        this.setData({
          results: items,
          loadingHidden: items.length < Api.PAGE_SIZE
        })
      },
      complete: () => {
        if (clear) {
          setTimeout(() => {
            wx.hideLoading()
            wx.stopPullDownRefresh()
          }, 1000)
        }
      }
    })
  }
})