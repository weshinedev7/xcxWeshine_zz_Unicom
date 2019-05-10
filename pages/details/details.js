// pages/vehicleDetails/vehicleDetails.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// 轮播图
		imgUrls: [
			{
				link: '/pages/user/user',
				url: '/images/tds.jpg'
			}
		],
		number:1,
		check:0,
    food_id: '',
    food: {},
    price: 0,
    total: 0
	},

	numberSub() {
	    let num = this.data.number;
	    if (num <= 1) {
	      return true;
	    }
	    num--;
    let foodPrice = this.data.price * num
	    this.setData({
	      number:num,
        total: foodPrice + '.00'
	    });
    },
  numberAdd() {
    let num = this.data.number;
    num++;
    let foodPrice = this.data.price * num
    this.setData({
      number:num,
      total: foodPrice + '.00'
    });
  },
  numberBlur(e) {
    let num = e.detail.value;
    num = parseInt(num, 10);
    (isNaN(num) || num <= 0) && (num = 1);
    this.setData({
      number:num
    });
  },

  selectDispaly:function(e){
    let _this=this;
    _this.setData({
      check: e.currentTarget.dataset.id
    });
    console.log(_this.data.check);
  },

  toOrder:function(e){
  	wx.switchTab({
      url: '/pages/vehicleLogin/vehicleLogin'
	})
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    var that = this;
    this.setData({
      food_id: options.id
    })
    util.ajax({
      url: app.globalData.path + 'ApiFoods/fooddetail',
      method: 'POST',
      data: {
        id: that.data.food_id
      },
      success: function (res) {
        that.setData({
          food: res.data[0],
          price: res.data[0].price,
          total: res.data[0].price
        })
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