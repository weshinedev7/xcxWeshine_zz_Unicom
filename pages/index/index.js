// pages/index/index.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    stores: [],
  },

  /**
  * 自动获取位置
  */
  onAuthLocation() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //登录
    if (wx.getStorageSync('employeeInfo') === '') {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000//持续的时间
      });
      setTimeout(function () {
        wx.redirectTo({
					url: '/pages/login/login'
        })
      }, 3000)

    }
    //获取位置
    this.onAuthLocation();

    //首页轮播
    var that = this;
    util.ajax({
      url: app.globalData.path + 'ApiBanner/getBanner',
      method: 'POST',
      data: {},
      success: function (res) {
        //成功
        if (res.data.status == '200') {
          that.setData({
            imgUrls: res.data.info,
          });
        }
      }
    });

    //门店与菜品
    util.ajax({
      url: app.globalData.path + 'ApiFoods/FoodsSales',
      method: 'POST',
      data: {},
      success: function (res) {
        //成功
        if (res.data.code == 0) {
          that.setData({
            stores: res.data.data,
          });
        }
				console.log(that.data.stores);
      }
    });
  },

  //预约会议室
  toRoom: function (e) {
    if (wx.getStorageSync('employeeInfo').role === '1') {
      wx.navigateTo({
        url: '/pages/makeAnAppointment/makeAnAppointment'
      })
    } else {
      wx.showToast({
        title: '你没有预约权限',
        icon: 'none',
        duration: 2000//持续的时间
      });
    }

  },

  //预约车辆
  toCar: function (e) {
    if (wx.getStorageSync('employeeInfo').role === '1') {
      wx.navigateTo({
        url: '/pages/bookingVehicle/bookingVehicle'
      })
    } else {
      wx.showToast({
        title: '你没有预约权限',
        icon: 'none',
        duration: 2000//持续的时间
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

	// 查看详情
	storeInfo: function (e) {
		wx.navigateTo({
			url: '/pages/storeInfo/storeInfo?id=' + e.currentTarget.dataset.id
		})
	},
	// 查看详情
	details: function (e) {
		wx.navigateTo({
			url: '/pages/details/details?id=' + e.currentTarget.dataset.id
		})
	},
  // 已打烊
  // close: function (e) {
  //   wx.showToast({
  //     title: '该店铺已打烊',
  //     icon: 'none',
  //     duration: 1000,
  //   });
  // }
})