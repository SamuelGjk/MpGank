// component/ganks/ganks.js

var Api = require('../../network/api.js')
var dateFormat = require('../../utils/dateformat.js')

Component({
  page: 1,

  /**
   * 组件的属性列表
   */
  properties: {
    gankType: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    ganks: [],
    loadingHidden: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fetchData: function (clear) {
      this.page = clear ? 1 : ++this.page
      Api.fetchData(this.data.gankType, this.page, {
        success: res => {
          res.data.results = res.data.results.map(result => {
            result.publishedAt = dateFormat(new Date(result.publishedAt), "yyyy-mm-dd HH:MM")
            return result
          })
          var items = clear ? res.data.results : this.data.ganks.concat(res.data.results)
          this.setData({
            ganks: items,
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
    },

    onItemClick: function (event) {
      var dataset = event.currentTarget.dataset
      wx.navigateTo({
        url: '../details/details?title=' + dataset.title + '&url=' + event.currentTarget.dataset.url
      })
    }
  }
})
