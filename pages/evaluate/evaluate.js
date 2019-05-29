// pages/order/order.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
		list: [],
    len: null,
    openof: 1,
    page: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      id: options.id
      // id: 7
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
    this.onloadMethod()

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

		this.onloadMethod();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }, //滑动加载
  onloadMethod: function() {
    let that = this

    if (that.data.len == 0) return false;
    if (that.data.openof != that.data.page) return false;
    that.data.openof++;
    this.setData({
      openof: that.data.openof
    })
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    //调接口
    util.ajax({
      url: app.globalData.path + 'ApiStore/evaluate',
      method: 'GET',
      data: {
        id: that.data.id,
        pageSize: 10, //每页展示的数据条数
        page: that.data.page //当前页码（从1开始）
      },
      success: function(res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.code == 0) {
          res.data.data.forEach(function(item) {
            that.data.list.push(item)
          })
          that.data.page++;
          that.setData({
            len: res.data.data.length,
            page: that.data.page,
						openof: that.data.page,
    				comment: that.data.list,
    				food: res.data.food,
          })
        }
      },
      complete: function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },
})