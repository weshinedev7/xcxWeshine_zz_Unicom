var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    number: ''
  },
  getInput: function(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    });

  },
  // 登录
  vehicleLogin: function(e) {
    // 获取数据
    var username = this.data.user;
    var number = this.data.number;

    // 判断
    if (username === '' || number === '') {
      wx.showToast({
        title: '账号、编号不能为空',
        icon: 'none',
        duration: 2000 //持续的时间
      });
    } else {
      // 请求数据
      wx.request({
        url: app.globalData.path + 'ApiVehicleLogin/index',
        method: 'POST',
        data: {
          username: username,
          number: number
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code === 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'succes',
              duration: 1000,
              mask: true
            });
						wx.setStorage({
							key: "user",
							data: res.data.user
						})
            setTimeout(function() {
              wx.navigateTo({
                url: '/pages/bookingVehicle/bookingVehicle'
              })
            }, 500)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
              mask: true
            });
          }

        }
      })

    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

		let user = wx.getStorageSync('user');
		// console.log(user)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})