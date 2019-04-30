Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    check:0,
  },
  selectDispaly:function(e){
    let _this=this;
    _this.setData({
      check: e.currentTarget.dataset.id
    });
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var date = new Date();//获取系统当前时间
		// this.setData({
		// 	time: current_time,
		// })
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

	}
})