var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
	data: {
		service: [],
		remarks: '',
		content: '',
		id: '',
		food_id: '',
		zp: 0
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var that = this;
		console.log(options.foodId)
		that.setData({
			foodId: options.foodId
		})

		util.ajax({
			url: app.globalData.path + 'ApiOrder/scoreoption',
			method: "GET",
			data: {},
			success: function (res) {
				console.log('res', res);
				if (res.data.status == 'success') {
					res.data.list.forEach(function (item) {
						item.options = [];
						item.option.forEach(function (val) {
							var obj = {
								name: val,
								active: false
							}
							item.options.push(obj);
						});
					});
					that.setData({
						list: res.data.list
					});
				}
			}
		})
	},
	chioseTap: function (e) {
		var index = e.currentTarget.dataset.index;
		var parent = e.currentTarget.dataset.parent;
		this.data.list[parent].options.forEach(function (item) {
			item.active = false;
		});
		this.data.list[parent].options[index].active = true;
		this.setData({
			list: this.data.list
		})
	},
	submit: function () {
		var _this = this;
		var arr = [];
		var types = false;
		_this.data.list.forEach(function (item) {
			item.options.forEach(function (val) {
				if (val.active) {
					var obj = {
						id: item.id,
						question: item.question,
						option: val.name
					}
					types = true;
					arr.push(obj);
				}
			});
		});
		if (arr.length < 3 || _this.data.zp == 0) {
			wx.showToast({
				title: '请选择评分项目',
				icon: 'none'
			});
			return false;
		}
		util.ajax({
			url: app.globalData.path + 'ApiFoods/ScoreDetail',
			data: {
				foodId: _this.data.foodId,
				staff_id: wx.getStorageSync('employeeInfo').id,
				options: arr.length > 0 ? JSON.stringify(arr) : '',
				content: _this.data.content ? _this.data.content : '',
				zp: _this.data.zp
			},
			method: "POST",
			success: function (res) {
				console.log(res)
				if (res.data.code == 0) {
					wx.showToast({
						title: res.data.msg,
						icon: 'succes',
						duration: 1000,
						mask: true
					});
					setTimeout(function () {
						wx.navigateBack({
							delta: 1
						})
					}, 500)
				} else {
					wx.showToast({
						title: '评分失败',
						icon: 'none'
					})
				}
			}
		})
	},
	getContent: function (e) {
		this.setData({
			content: e.detail.value
		})
	},

	cancel: function () {
		wx.navigateBack({
			data: 1
		})
	},
	selectIndexNum(e) {
		let i = e.currentTarget.dataset.index;
		if (i == this.data.score) {
			this.setData({
				score: -1
			})
		} else {
			this.setData({
				score: e.currentTarget.dataset.index - 0
			})
		}
		this.setData({
			zp: this.data.score + 1
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