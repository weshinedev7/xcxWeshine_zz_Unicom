var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    util.ajax({
      url: app.globalData.path + 'ApiStore/adminList',
      method: 'GET',
      data: {
        id: wx.getStorageSync('storeInfo').store_id,
        // id: 1,
      },
      success: function(res) {
        if (res.data.code == 0) {
          _this.setData({
            list: res.data.data
          })
        }
      }
    })
  },
  statusAdmin: function(e) {
    var _this = this;
    var msg = e.currentTarget.dataset.status == 0 ? '禁用' : '启用';
    wx.showModal({
      title: '提示',
      content: '确定要' + msg + '吗？',
      success: function(sm) {
        if (sm.confirm) {
          util.ajax({
            url: app.globalData.path + 'ApiStore/statusAdmin',
            method: 'POST',
            data: {
              id: e.currentTarget.dataset.id,
            },
            success: function(res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                });
                setTimeout(function() {
                  wx.navigateTo({
                    url: '/pages/admin/admin?=' + wx.getStorageSync('storeInfo').id
                  })
                }, 500)
              }
            }
          })
        }
      }
    })

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

  }
})