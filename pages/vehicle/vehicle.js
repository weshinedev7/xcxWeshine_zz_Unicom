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
        if (res.data.code === 0) {
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
				if (res.data.code === 0) {
          that.setData({
            vehicle: res.data.data
          });
        }
      }
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
					console.log(id);

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
						}
					})

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