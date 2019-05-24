// pages/test/test.js
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

  },
  remindMessage: function(formid) {
    var that = this
    wx.request({
      method: 'POST',
      url: 'https://www.**********************_message.php', //后台接口
      data: {
        o_id: that.data.allthing.openid,
        u_name: that.data.allthing.userInfo.nickName,
        money: that.data.money,
        formid: formid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data)
      },
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

  },
  getUserInfo: function(e) {
    console.log(e);
    var that = this;
    const t = app;
    var wxInfo = e.detail;
    var userInfo = {
      'session_key': '',
      'wxInfo': e.detail.userInfo,
      'memberInfo': '',
      'openid': '',
    };
    wx.login({
      success: function(res) {
        util.request({
          url: 'entry/wxapp/openid',
          data: {
            code: res.code,
          },
          cachetime: 0,
          success: function(loginres) {
            if (!loginres.data.errno) {
              userInfo.session_key = loginres.data.session_key;
              userInfo.openid = loginres.data.openid;
              wx.setStorageSync('userInfo', userInfo);
              var data = {
                name: wxInfo.userInfo.nickName,
                img: wxInfo.userInfo.avatarUrl,
                signature: wxInfo.signature,
                rawData: wxInfo.rawData,
                iv: wxInfo.iv,
                encryptedData: wxInfo.encryptedData,
                openid: loginres.data.openid
              }
              console.log(data.openid);
              app.util.request({
                url: 'entry/wxapp/login',
                data: data,
                method: 'POST',
                success(res) {
                  console.log('res', res);
                  if (!res.data.errno) {
                    userInfo.memberInfo = res.data.data;
                    wx.setStorageSync('userInfo', userInfo);
                    t.globalData.userInfo.memberInfo = res.data.data;
                    that.getMethod();
                  }
                }
              })
            }
          },
          complete: () => {

          }
        });
      }
    });
    this.setData({
      hasUserInfo: true
    })
  },
})