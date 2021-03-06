// pages/vehicleDetails/vehicleDetails.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    imgUrls: [{
      link: '/pages/user/user',
      url: '/images/ct-1.jpg'
    }],
    number: 1,
    food_id: '',
    food: {},
    price: 0,
    total: 0,
    imglist: [],
    list: [],
    len: null,
    openof: 1,
    page: 1,
    showModal: false,
  },

  numberSub() {
    let num = this.data.number;
    if (num <= 1) {
      return true;
    }
    num--;
    let foodPrice = this.data.price * num
    this.setData({
      number: num,
      total: foodPrice + '.00'
    });
  },
  numberAdd() {
    let num = this.data.number;
    num++;
    let foodPrice = this.data.price * num
    this.setData({
      number: num,
      total: foodPrice + '.00'
    });
  },
  numberBlur(e) {
    let num = e.detail.value;
    num = parseInt(num, 10);
    (isNaN(num) || num <= 0) && (num = 1);
    this.setData({
      number: num
    });
  },

  selectDispaly: function(e) {
    let _this = this;
    _this.setData({
      check: e.currentTarget.dataset.id
    });
  },

  toOrder: function(e) {
    let that = this

    if (that.data.food.type == 2) {
      wx.showToast({
        title: '商品已下架',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else {
      var data = {
        type: e.currentTarget.dataset.id,
        total: that.data.total,
        foodName: that.data.food.name,
        img: that.data.food.img,
        number: that.data.number,
        storeName: that.data.food.store_name,
        storeId: that.data.food.store_id,
        foodId: that.data.food_id
      }

      //把数据存到缓存中，相当于页面传参了
      wx.setStorageSync('order_info', data)
      wx.navigateTo({
        url: '/pages/sureOrder/sureOrder',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

		var that = this;
		that.setData({
			food_id: options.id
		})
  },
	//滑动加载
	onloadMethod: function () {
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
			url: app.globalData.path + 'ApiFoods/FoodScore',
			method: 'GET',
			data: {
				foodId: that.data.food_id,
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
					console.log(that.data.list);
					that.setData({
						len: res.data.list.length,
						list: that.data.list,
						page: that.data.page,
						openof: that.data.page
					})
				}
				console.log(that.data.list)
			},
			complete: function () {
				wx.hideNavigationBarLoading() //完成停止加载
				wx.stopPullDownRefresh() //停止下拉刷新
			},
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
		let that = this;
		// 商品
		util.ajax({
			url: app.globalData.path + 'ApiFoods/foodDetail',
			method: 'POST',
			data: {
				id: that.data.food_id
			},
			success: function (res) {
				that.setData({
					food: res.data.food,
					price: res.data.food.price,
					total: res.data.food.price,
					imglist: res.data.imglist
				})
			}
		})

		that.onloadMethod();
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

  },
})