var app = getApp();
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    employee_name: '',
    check: 4,
    display: '',
    display2: 'none',
    items: [],
  },
  //选择选项卡
  selectDispaly: function(e) {
    var that = this;
    that.setData({
      check: e.currentTarget.dataset.id
    });
    util.ajax({
      url: app.globalData.path + 'ApiRoom/getRecord',
      method: 'POST',
      data: {
        employee_id: wx.getStorageSync('employeeInfo').id,
        check: that.data.check,
      },
      success: function(res) {
        if (res.data.status === '100') {
          that.setData({
            display: 'none',
            display2: '',
          })
        }
        if (res.data.status === '200') {
          that.setData({
            display: '',
            display2: 'none',
            items: res.data.options,
            employee_name: res.data.employee_name
          })
        }
      }
    });
  },
  //取消
  cancel: function(e) {
      var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要取消吗？',
      success: function(res) {
        if (res.confirm) {
            //确定取消
          var id=e.target.dataset.id;
          if(id===''){
              wx.showToast({
                  title: '取消失败',
                  icon: 'none',
                  duration: 2000//持续的时间
              });
          }
          if(id!==''){
              util.ajax({
                  url: app.globalData.path + 'ApiRoom/canRecord',
                  method: 'POST',
                  data: {id:id},
                  success: function (res) {
                      if(res.data.status==='200'){
                          wx.showToast({
                              title: res.data.msg,
                              icon: 'success',
                              duration: 2000//持续的时间
                          });
                          setTimeout(function () {
                              wx.navigateTo ({
                                  url: '/pages/conferenceRoom/conferenceRoom'
                              })
                          }, 2000);
                      }else{
                          wx.showToast({
                              title: res.data.msg,
                              icon: 'none',
                              duration: 2000//持续的时间
                          });
                      }
                  }
              })
          }

        } else if (res.cancel) {
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取记录
    util.ajax({
      url: app.globalData.path + 'ApiRoom/getRecord',
      method: 'POST',
      data: {
        employee_id: wx.getStorageSync('employeeInfo').id,
        check: that.data.check,
      },
      success: function(res) {
        console.log(res.data);
        if (res.data.status === '100') {
          that.setData({
            display: 'none',
            display2: '',
          })
        }
        if (res.data.status === '201') {
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 2000 //持续的时间
          });
          setTimeout(function() {
            wx.redirectTo({
              url: '/pages/roomLogin/roomLogin'
            })
          }, 3000)
        }
        if (res.data.status === '200') {
          that.setData({
            display: '',
            display2: 'none',
            items: res.data.options,
            employee_name: res.data.employee_name
          })
        }
      }
    });
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