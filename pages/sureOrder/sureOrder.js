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
	onLoad: function (options) {
		this.setData({
			id: options.id
		})
		if (this.data.id) {
			var _this = this;
			util.ajax({
				url: app.globalData.path + 'ApiFoods/remarks',
				method: "GET",
				data: {
					id: _this.data.id
				},
				success: function (res) {
					if (res.data.code == 0) {
						_this.setData({
							info: {
								foodName: res.data.data[0].f_name,
								img: res.data.data[0].img,
								storeName: res.data.data[0].s_name,
								number: res.data.data[0].number,
								total: res.data.data[0].price,
								remarks: res.data.data[0].remarks,
							}
						})
					}
				}
			})
		} else {
			//读取缓存数据
			let data = wx.getStorageSync("order_info")
			this.setData({
				info: {
					type: data.type,
					foodName: data.foodName,
					img: data.img,
					storeName: data.storeName,
					number: data.number,
					total: data.total
				}
			})
		}

	},
	//获取备注信息
	// remarks: function(e) {
	//   this.data.info.remarks = e.detail.value
	// },

	submit: function (e) {
		this.data.info.staff = wx.getStorageSync("employeeInfo").id
		this.data.info.storeId = wx.getStorageSync("order_info").storeId
		this.data.info.foodId = wx.getStorageSync("order_info").foodId
		// 修改备注入口
		if (this.data.id) {

			util.ajax({
				url: app.globalData.path + 'ApiFoods/remarks',
				method: "POST",
				data: {
					id: this.data.id,
					remarks: e.detail.value.remarks,
				},
				success: function (res) {
					if (res.data.code == 0) {
						wx.showToast({
							title: res.data.msg,
							icon: 'success',
							duration: 1000 //持续的时间
						});
						setTimeout(function () {
							wx.switchTab({
								url: '/pages/order/order',
							})
						}, 500);
					}
				}
			})

		} else {
			//备注数据获取
			this.data.info.remarks = e.detail.value.remarks

			//把订单信息传到后台接口
			util.ajax({
				url: app.globalData.path + 'ApiFoods/orderinfo',
				method: "POST",
				data: this.data.info,
				success: function (res) {
					if (res.data.status == 'success') {
						wx.showToast({
							title: res.data.msg,
							icon: 'success',
							duration: 1000 //持续的时间
						});
						setTimeout(function () {
							wx.switchTab({
								url: '/pages/order/order',
							})
						}, 500);
					}
				}
			})
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

	}

})