var app = getApp();
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    pwd: '',
		userInfo:'',
  },

  getInput: function(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    });
  },

  userLogin: function(e) {
    var user = this.data.user;
    var pwd = this.data.pwd;
    if (user === '' || pwd === '') {
      wx.showToast({
        title: '账号、密码不能为空',
        icon: 'none',
        duration: 2000 //持续的时间
      });
    } else {

      //登录
      util.ajax({
        url: app.globalData.path + 'ApiUser/login',
        method: 'POST',
        data: {
          user: user,
          pwd: pwd,
					avatar: wx.getStorageSync('userInfo').avatarUrl
        },
        success: function(res) {
          // 成功
          if (res.data.status == '200') {

            // 判断用户角色
            if (res.data.res) {
              if (res.data.res.status == 1) {
                wx.showToast({
                  title: '账号已被禁用',
                  icon: 'none',
                  duration: 1000,
                });
              } else {
                // 商家用户登录区间
                wx.setStorageSync('storeInfo', res.data.res);
                wx.showToast({
                  title: res.data.msg,
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                });
                setTimeout(function() {
                  wx.redirectTo({
										url: '/pages/storeIndex/storeIndex'
                  })
                }, 500)
              }

            } else {

              // 用户登录区间
							wx.setStorageSync('employeeInfo', res.data.info);
              var a = wx.getStorageSync('employeeInfo')
              wx.showToast({
                title: res.data.msg,
                icon: 'succes',
                duration: 1000,
                mask: true
              });
              setTimeout(function() {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }, 500)

            }

          } else {
            // 登录失败
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000 //持续的时间
            });
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

		this.setData({
			userInfo: wx.getStorageSync('userInfo')
		})
		
    // 判断用户是否登录
    if (wx.getStorageSync('employeeInfo') !== '') {
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      // 判断商家是否登陆
      if (wx.getStorageSync('storeInfo') !== '') {
        wx.redirectTo({
					url: '/pages/storeIndex/storeIndex'
        })
      } else {
        // 未登录提醒
        wx.showToast({
          title: '您好请登录',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    }

  },
  bindGetUserInfo: function(e) {

		var that = this;

		//获取用户信息
		wx.getUserInfo({
			success: function (res) {
				that.data.userInfo = res.userInfo;

				that.setData({
					userInfo: that.data.userInfo
				})

				wx.setStorageSync('userInfo', res.userInfo);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})