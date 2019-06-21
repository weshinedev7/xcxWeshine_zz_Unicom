var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    this.setData({
      id: options.id
    })
    if (_this.data.id != '') {
      util.ajax({
        url: app.globalData.path + 'ApiStore/addAdmin',
        method: 'GET',
        data: {
          id: _this.data.id,
        },
        success: function(res) {
          if (res.data.code == 0) {
            _this.setData({
              list: res.data.data
            })
          }
        }
      })
    }
  },
  formsubmit: function(e) {

		var _this = this;
		if (e.detail.value.name == '') {
			wx.showToast({
				title: '姓名不能为空',
				icon: 'none',
				duration: 1500 //持续的时间
			});
			return false;
		}
		if (e.detail.value.tel == '') {
			wx.showToast({
				title: '电话不能为空',
				icon: 'none',
				duration: 1500 //持续的时间
			});
			return false;
		}
		if (e.detail.value.pwd == '' && _this.data.id == undefined) {
			wx.showToast({
				title: '密码不能为空',
				icon: 'none',
				duration: 1500 //持续的时间
			});
			return false;
		}

		if (_this.data.id != undefined) {
      util.ajax({
        url: app.globalData.path + 'ApiStore/addAdmin',
        method: 'POST',
        data: {
          id: _this.data.id,
          name: e.detail.value.name,
					tel: e.detail.value.tel,
					pwd: e.detail.value.pwd,
					sex: e.detail.value.sex,
        },
        success: function(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'succes',
              duration: 1000,
              mask: true
            });
            setTimeout(function() {
              wx.navigateTo({
                url: '/pages/admin/admin?='+wx.getStorageSync('storeInfo').store_id
              })
            }, 500)
          }
        }
      })
		} else {
      util.ajax({
        url: app.globalData.path + 'ApiStore/addAdmin',
        method: 'POST',
        data: {
          name: e.detail.value.name,
          tel: e.detail.value.tel,
          pwd: e.detail.value.pwd,
          sex: e.detail.value.sex,
					store_id: wx.getStorageSync('storeInfo').store_id
        },
        success: function(res) {
          if (res.data.code == 0) {
						wx.showToast({
							title: res.data.msg,
							icon: 'succes',
							duration: 1000,
							mask: true
						});
						setTimeout(function () {
							wx.redirectTo({
								url: '/pages/admin/admin?=' + wx.getStorageSync('storeInfo').id
							})
						}, 500)
          }
        }
      })
    }
  },
	cancel:function(){
		wx.navigateBack({
			delta: 1
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})