// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var _this = this;
		_this.setData({
			name: wx.getStorageSync('employeeInfo').name,
			tel: wx.getStorageSync('employeeInfo').number,
			avatar: wx.getStorageSync('employeeInfo').avatar
		})
  },
	outlogin:function(e){
		wx.showModal({
			title: '提示',
			content: '确定要注销吗？',
			success: function (sm) {
				if (sm.confirm) {
					// 用户点击了确定 可以调用删除方法了
					wx.setStorageSync('employeeInfo', "");
					wx.showToast({
						title: '已注销',
						icon: 'succes',
						duration: 1000,
						mask: true
					})
					setTimeout(function () {
						wx.redirectTo({
							url: '/pages/roomLogin/roomLogin'
						})
					}, 1000)
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