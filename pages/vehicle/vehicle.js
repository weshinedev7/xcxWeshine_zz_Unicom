var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: 0,
    vehicle: "",
  },
  selectDispaly: function(e) {
		let _this = this;
		_this.setData({
			check: e.currentTarget.dataset.id
		});
		_this.setData({
			vehicle: 0
		});
		// console.log(_this.data.check)
    var that = this;
    wx.request({
      url: app.globalData.path + 'ApiBookingvehicle/index',
      method: 'POST',
      data: {
        username: wx.getStorageSync('employeeInfo').name,
        user_id: wx.getStorageSync('employeeInfo').id,
        status: this.data.check
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code === 1) {
          that.setData({
            vehicle: res.data.data
          });
          // console.log(this.res.data.vehicle)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    wx.request({
      url: app.globalData.path + 'ApiBookingvehicle/index',
      method: 'POST',
      data: {
        username: wx.getStorageSync('employeeInfo').name,
        user_id: wx.getStorageSync('employeeInfo').id,
        status: 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
				if (res.data.code === 1) {
          that.setData({
            vehicle: res.data.data
          });
        }
      }
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

  }
})