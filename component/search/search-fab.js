// component/search/search-fab.js
Component({

  properties: {
    
  },

  data: {

  },

  methods: {
    onClick: function (event) {
      wx.navigateTo({
        url: '../../pages/search/search',
      })
    }
  }
})
