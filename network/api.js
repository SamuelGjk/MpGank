const PAGE_SIZE = 20;

function fetchData(gankType, page, callback) {
  wx.request({
    url: 'http://gank.io/api/data/' + gankType + '/' + PAGE_SIZE + '/' + page,
    success: res => {
      callback.success(res)
    },
    complete: () => {
      callback.complete()
    }
  })
}

function search(keyword, page, callback) {
  wx.request({
    url: 'http://gank.io/api/search/query/' + keyword + '/category/all/count/' + PAGE_SIZE + '/page/' + page,
    success: res => {
      callback.success(res)
    },
    complete: () => {
      callback.complete()
    }
  })
}

module.exports = {
  PAGE_SIZE: PAGE_SIZE,
  fetchData: fetchData,
  search: search
}