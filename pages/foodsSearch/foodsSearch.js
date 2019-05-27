// pages/search/search.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    show: '2',
  },

  searchInput: function(e) {
    this.setData({
      search: e.detail.value
    })
  },

  search: function(e) {
    var search = this.data.search;
    var _this = this;


    if (search === '') {
      // this.setData({
      //   show: '0'
      // })
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 1000 //持续的时间
      });
    } else {
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      util.ajax({
        url: app.globalData.path + 'ApiStore/searchFoods',
        method: 'GET',
        data: {
          search: _this.data.search,
          store_id: wx.getStorageSync('storeInfo').store_id
        },
        success: function(res) {
          //成功
          if (res.data.code == 0) {
            _this.setData({
              foods: res.data.data,
            });
            _this.setData({
              show: '1'
            })
          } else {
            _this.setData({
              show: '0'
            })
          }
          wx.hideLoading()
          wx.hideNavigationBarLoading()
        }

      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		
    var _this = this;
    if (options.search != ' ') {
      _this.setData({
        search: options.search
      })
      util.ajax({
        url: app.globalData.path + 'ApiStore/searchFoods',
        method: 'GET',
        data: {
          search: _this.data.search,
          store_id: wx.getStorageSync('storeInfo').store_id
        },
        success: function(res) {
          //成功
          if (res.data.code == 0) {
            _this.setData({
              foods: res.data.data,
            });
            _this.setData({
              show: '1'
            })
          } else {
            _this.setData({
              show: '0'
            })
          }
          wx.hideLoading()
          wx.hideNavigationBarLoading()
        }

      });
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 修改状态
  status: function(e) {
    var _this = this;
    var id = e.currentTarget.dataset.id
    var status = e.currentTarget.dataset.status

    var current_state = status == 1 ? "下架" : "上架"

    wx.showModal({
      title: '提示',
      content: '是否确认' + current_state,
      success: function(res) {
        if (res.confirm) {
          util.ajax({
            url: app.globalData.path + 'ApiStore/status',
            method: 'POST',
            data: {
              id: id
            },
            success: function(res) {
              if (res.data.code === 0) {

                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration: 1000,
                  mask: true
                });
                setTimeout(function() {
									wx.redirectTo({
                    url: '/pages/foodsSearch/foodsSearch?search=' + _this.data.search
                  })
                }, 500)
              }
            }
          })
        }

      }
    })
  },
})