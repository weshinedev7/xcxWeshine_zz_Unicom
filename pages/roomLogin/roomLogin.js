var app = getApp();
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    pwd: ''
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
          pwd: pwd
        },
        success: function(res) {
          //失败
          if (res.data.status = '100') {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000 //持续的时间
            });
          }

          if (res.data.status = '200') {
            //存用户信息到本地存储
            wx.setStorageSync('employeeInfo', res.data.info);

            wx.showToast({
              title: '登录成功',
              icon: 'succes',
              duration: 2000,
              mask: true
            });
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }, 500)
            //员工与预约人登录成功
            if(res.data.info.role==='2'){
							//存用户信息到本地存储
							wx.setStorageSync('employeeInfo', res.data.info);
              wx.showToast({
                title: '登录成功',
                icon: 'succes',
                duration: 2000,
                mask: true
              });
              setTimeout(function () {
                wx.switchTab ({
                  url: '/pages/index/index'
                })
              }, 3000)
            }

            //店家登录成功
            if(res.data.info.role==='1'){
              //存用户信息到本地存储
              wx.setStorageSync('storeInfo', res.data.info);
              wx.showToast({
                title: '登录成功',
                icon: 'succes',
                duration: 2000,
                mask: true
              });
              setTimeout(function () {
                wx.redirectTo ({
                  url: '/pages/varietyOfDishes/varietyOfDishes'
                })
              }, 3000)
            }
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync('employeeInfo') !== '') {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }else{
			wx.showToast({
				title: '您好请登录',
				icon: 'none',
				duration: 1000,
				mask: true
			})
		}
    if(wx.getStorageSync('storeInfo')!==''){
      wx.redirectTo ({
        url: '/pages/varietyOfDishes/varietyOfDishes'
      })
    }
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