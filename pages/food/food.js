// pages/order/order.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: -1,
    storeName: {},
    allFoodsName: {},
    foods: [],
    len: null,
    openof: 1,
    page: 1
  },
  //选择门店
  selectStore: function(e) {
    let _this = this;
    let id = e.currentTarget.dataset.id
    this.setData({
      check: id
    });
    this.rest();
    this.onloadMethod()
  },
  rest: function() {
    this.setData({
      foods: [],
      len: null,
      openof: 1,
      page: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    util.ajax({
      url: app.globalData.path + 'ApiFoods/storename',
      method: 'POST',
      data: {},
      success: function(res) {
        if (res.data.status == 'success') {
          that.setData({
            storeName: res.data.list
          })
        }
      }
    });
    this.onloadMethod()

  },
  onReachBottom: function() {


    this.onloadMethod();
  },
  //商户列表
  onloadMethod: function() {
    var that = this;
    if (that.data.len == 0) return false;
    if (that.data.openof != that.data.page) return false;
    that.data.openof++;
    this.setData({
      openof: that.data.openof
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    util.ajax({
      url: app.globalData.path + 'ApiFoods/storeFoods',
      method: 'GET',
      data: {
        id: that.data.check, //学校ID
        pageSize: 10, //每页展示的商户数据条数
        page: that.data.page //当前页码（从1开始）
      },
      success: function(data) {
        if (data.data.status == 'success') {
          data.data.list.forEach(function(item) {
            that.data.foods.push(item)
          })
          that.data.page++;
          that.setData({
            len: data.data.list.length,
            foods: that.data.foods,
            page: that.data.page,
            openof: that.data.page
          });
          // console.log(that.data.len)
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
        }
      },
      complete: function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 查看详情
  details: function(e) {
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id
    })
  },
  // 已打烊
  close: function(e) {
    wx.showToast({
      title: '该店铺已打烊',
      icon: 'none',
      duration: 1000,
    });
  }
})