// pages/vehicleDetails/vehicleDetails.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remarks: "",
    info: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;

    //读取购物车中的信息
    var userId = wx.getStorageSync('employeeInfo').id,
      orderInfo = wx.getStorageSync('orderInfo'),
      totalPic = wx.getStorageSync('totalPic'),
      totalPrice = wx.getStorageSync('totalPrice');
    if (userId == '') {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000//持续的时间
      });
      setTimeout(function () {
        wx.redirectTo({
          url: '/pages/roomLogin/roomLogin'
        })
      }, 3000)
    }
    if (orderInfo == '' || options.store_id == '') {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
    _this.setData({
      orderInfo: orderInfo,
      totalPic: totalPic,
      totalPrice: totalPrice
    })

    //获取店铺信息
    util.ajax({
      url: app.globalData.path + 'ApiCategory/getStore',
      data: {
        id: options.store_id
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 0) {

          _this.setData({
            store: res.data.data
          });
        }
      }
    })
  },

  //获取输入的值
  getInput: function(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    })
  },

  //付款
  pay: function(e) {
    var userId = wx.getStorageSync('employeeInfo').id,
      type = e.target.dataset.id,
      store_id = this.data.store.id,
      orderInfo = this.data.orderInfo,
      totalPic = this.data.totalPic,
      totalPrice = this.data.totalPrice;
    if(type==''){
      wx.showToast({
        title: '请选择付款方式',
        icon: 'none',
        duration: 2000//持续的时间
      });
    }
    if (userId==''){
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000//持续的时间
        });
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/roomLogin/roomLogin'
          })
        }, 3000)
      }
    if (orderInfo == '' || store_id == '') {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
    console.log(orderInfo);
  
    //订单记录表
    util.ajax({
      url: app.globalData.path + 'ApiFoods/orderinfo',
      method: "POST",
      data: {
        userId: store_id,
        type: type,
        storeId: store_id,
        orderInfo: JSON.stringify(orderInfo),
        totalPic: totalPic,
        totalPrice: totalPrice,
        remarks: this.data.remarks
      },
      success: function (res) {
        if (res.data.status == '1') {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000
          });
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/order/order',
            })
          }, 1000);
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