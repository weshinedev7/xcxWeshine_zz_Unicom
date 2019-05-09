// pages/index/index.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
  },

  /**
  * 自动获取位置
  */
  onAuthLocation(){
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('employeeInfo')===''){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000//持续的时间
      });
      setTimeout(function () {
        wx.switchTab ({
          url: '/pages/index/index'
        })
      }, 3000)

    }

    this.onAuthLocation();
    var that = this;

    //首页轮播
    util.ajax({
      url:app.globalData.path+'ApiBanner/getBanner',
      method:'POST',
      data:{},
      success:function(res){
        //成功
        if(res.data.status='200'){
          that.setData({
            imgUrls:res.data.info,
          });
        }
      }

    });

  },
  toRoom:function(e){
    if(wx.getStorageSync('employeeInfo').role==='2'){
      wx.navigateTo ({
        url: '/pages/makeAnAppointment/makeAnAppointment'
      })
    }else{
      wx.showToast({
        title: '权限不足',
        icon: 'none',
        duration: 2000//持续的时间
      });
    }

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