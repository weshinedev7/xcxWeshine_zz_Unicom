// pages/vehicleDetails/vehicleDetails.js
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
			}, {
				link: '/pages/user/user',
				url: '/images/tds1.jpg'
			}, {
				link: '/pages/user/user',
				url: '/images/tds3.jpeg'
			}
		],
		number:1,
		check:0
	},

	numberSub() {
	    let num = this.data.number;
	    if (num <= 1) {
	      return true;
	    }
	    num--;
	    this.setData({
	      number:num
	    });
    },
  numberAdd() {
    let num = this.data.number;
    num++;
    this.setData({
      number:num
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
  		url: '/pages/order/order'
	})
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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