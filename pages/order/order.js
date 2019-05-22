// pages/order/order.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: 0,
    list: [],
    len: null,
    openof: 1,
    page: 1
  },

  selectDispaly: function(e) {
    let _this = this;
    _this.setData({
      check: e.currentTarget.dataset.id
    });
    this.result();
    _this.onloadMethod(_this.data.check)
  },
  result: function() {
    this.setData({
      list: [],
      len: null,
      openof: 1,
      page: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  //滑动加载
  onloadMethod: function() {
    let that = this
    let id = wx.getStorageSync('employeeInfo').id

    // 获取当前时间(年月日时分)
    // var date = util.formatTime(new Date());
    // console.log(date)
		// console.log(mktime(13, 0, 0, date('m'), date('d'), date('Y')))
		// if (mktime(13, 0, 0, date('m'), date('d'), date('Y'))){

		// }

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
      url: app.globalData.path + 'ApiFoods/orderlist',
      method: 'GET',
      data: {
        id: id,
        type: that.data.check,
        pageSize: 5, //每页展示的数据条数
        page: that.data.page //当前页码（从1开始）
      },
      success: function(res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.status == 'success') {
          res.data.list.forEach(function(item) {
            that.data.list.push(item)
          })
          that.data.page++;
          console.log(that.data.list);
          that.setData({
            len: res.data.list.length,
            list: that.data.list,
            page: that.data.page,
            openof: that.data.page
          })
					console.log(that.data.list)
        }
      },
      complete: function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
	},
	have_meals: function (e) {
		var _this = this;
		wx.showModal({
			title: '提示',
			content: '确定已用餐吗？',
			success: function (sm) {
				if (sm.confirm) {
					// 用户点击了确定 可以调用删除方法了
					// var id = e.currentTarget.dataset.id
					util.ajax({
						url: app.globalData.path + 'ApiFoods/haveMeals',
						method: 'POST',
						data: {
							id: e.currentTarget.dataset.id,
						},
						success: function (res) {
							if (res.data.code == 0) {
								wx.showToast({
									title: res.data.msg,
									icon: 'succes',
									duration: 1000,
									mask: true
								});
								setTimeout(function () {
									wx.navigateTo({
										url: '/pages/order/order'
									})
								}, 500)
							}
						}
					})


				}
			}
		})

	},
	cancel: function (e) {
		var _this = this;
		wx.showModal({
			title: '提示',
			content: '确定取消订单吗？',
			success: function (sm) {
				if (sm.confirm) {
					util.ajax({
						url: app.globalData.path + 'ApiFoods/cancel',
						method: 'POST',
						data: {
							id: e.currentTarget.dataset.id,
						},
						success: function (res) {
							if (res.data.code == 0) {
								wx.showToast({
									title: res.data.msg,
									icon: 'succes',
									duration: 1000,
									mask: true
								});
								setTimeout(function () {
									wx.navigateTo({
										url: '/pages/order/order'
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

  }
})