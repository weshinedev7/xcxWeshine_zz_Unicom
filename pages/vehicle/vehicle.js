var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
	data: {
		check: 4,
		vehicle: "",
		len: null,
		openof: 1,
		page: 1
	},
	selectDispaly: function (e) {
		let _this = this;
		_this.setData({
			check: e.currentTarget.dataset.id
		});
		// _this.setData({
		// 	vehicle: ''
		// });
		this.result();
		_this.onloadMethod(_this.data.check)

		// wx.showLoading({ title: '加载中', mask: true });
		// var that = this;
		// wx.request({
		// 	url: app.globalData.path + 'ApiBookingvehicle/index',
		// 	method: 'POST',
		// 	data: {
		// 		username: wx.getStorageSync('employeeInfo').name,
		// 		user_id: wx.getStorageSync('employeeInfo').id,
		// 		status: this.data.check
		// 	},
		// 	header: {
		// 		'content-type': 'application/x-www-form-urlencoded'
		// 	},
		// 	success: function (res) {
		// 		if (res.data.code === 0) {
		// 			that.setData({
		// 				vehicle: res.data.data
		// 			});
		// 		}
		// 		console.log(that.data.vehicle)
		// 		wx.hideLoading()
		// 		wx.hideNavigationBarLoading()
		// 	}
		// })
	},
	result: function () {
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
	onLoad: function (options) {

	},
	//滑动加载
	onloadMethod: function () {
		// 当前时间
		this.setData({
			date: util.formatTime(new Date())
		})

		let that = this
		let id = wx.getStorageSync('employeeInfo').id

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
			url: app.globalData.path + 'ApiBookingvehicle/index',
			method: 'POST',
			data: {
				user_id: id,
				status: that.data.check,
				pageSize: 5, //每页展示的数据条数
				page: that.data.page //当前页码（从1开始）
			},
			success: function (res) {
				wx.hideLoading()
				wx.hideNavigationBarLoading() //完成停止加载
				if (res.data.code == 0) {
					res.data.list.forEach(function (item) {
						that.data.list.push(item)
					})
					that.data.page++;
					that.setData({
						len: res.data.list.length,
						vehicle: that.data.list,
						page: that.data.page,
						openof: that.data.page
					})
					console.log(that.data.vehicle)
				}
			},
			complete: function () {
				wx.hideNavigationBarLoading() //完成停止加载
				wx.stopPullDownRefresh() //停止下拉刷新
			},
		})
	},
	// 取消预约
	cancel: function (e) {
		wx.showModal({
			title: '提示',
			content: '确定要取消吗？',
			success: function (sm) {
				if (sm.confirm) {
					// 用户点击了确定 可以调用删除方法了
					var id = e.currentTarget.dataset.id

					// wx.showLoading({ title: '加载中', mask: true });
					wx.request({
						url: app.globalData.path + 'ApiBookingvehicle/cancel',
						method: 'POST',
						data: {
							id: e.currentTarget.dataset.id
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: function (res) {
							if (res.data.code === 0) {
								wx.showToast({
									title: res.data.msg,
									icon: 'succes',
									duration: 1000,
									mask: true
								});
								setTimeout(function () {
									wx.navigateTo({
										url: '/pages/vehicle/vehicle'
									})
								}, 500)
							}
							// wx.hideLoading()
							// wx.hideNavigationBarLoading() //完成停止加载
						}
					})

				}
			}
		})


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
		this.result();
		this.onloadMethod()
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

		this.onloadMethod();
	}
})