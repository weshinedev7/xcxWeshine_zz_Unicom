
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
		page: 1,
		ellipsis: true,
	},
	selectDispaly: function (e) {
		let _this = this;
		_this.setData({
			check: e.currentTarget.dataset.id,
			order_id: wx.getStorageSync('storeInfo').id,
			list:[]
		});
		//调接口
		util.ajax({
			url: app.globalData.path + 'ApiFoods/allRemarks',
			method: 'GET',
			data: {
				food_id: _this.data.food_id,
				status: _this.data.check
			},
			success: function (res) {
				if (res.data.code == 0) {
					_this.setData({
						list: res.data.data
					})
				}
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var _this = this;
		this.setData({
			food_id: options.id,
			food_id: 5,
			order_id: wx.getStorageSync('storeInfo').id
		})
		
		//调接口
		util.ajax({
			url: app.globalData.path + 'ApiFoods/allRemarks',
			method: 'GET',
			data: {
				food_id: _this.data.food_id,
				// order_id: _this.data.order_id,
				status: _this.data.check,
			},
			success: function (res) {
				console.log(res.data)
				if(res.data.data){
					_this.setData({
						list:res.data.data
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