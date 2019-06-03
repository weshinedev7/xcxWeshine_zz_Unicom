// pages/vehicleDetails/vehicleDetails.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    // 获取购物车数据表的数据
    util.ajax({
      url: app.globalData.path + 'ApiFoods/shoppingCart',
      method: "POST",
      data: {
        userId: 33,
        storeId: 1,
      },
      success: function(res) {
        if (res.data.code == 0) {
          _this.setData({
            foods: res.data.foods,
            store: res.data.store,
            sum: res.data.sum,
          })
          console.log(_this.data.foods)
        }
      }
    })
  },

  submit: function(e) {
    //把订单信息传到后台接口
    util.ajax({
      url: app.globalData.path + 'ApiFoods/orderinfo',
      method: "POST",
			data: {
				userId: 33,
				storeId: 1,
				remarks: e.detail.value.remarks
			},
      success: function(res) {
        if (res.data.status == 'success') {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000 //持续的时间
          });
          setTimeout(function() {
            wx.switchTab({
              url: '/pages/order/order',
            })
          }, 500);
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