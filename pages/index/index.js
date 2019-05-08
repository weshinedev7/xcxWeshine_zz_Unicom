// pages/index/index.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      {
        link:'/pages/user/user',
        url:'/images/img1.jpeg'
      },{
        link:'/pages/user/user',
        url:'/images/img2.png'
      },{
        link:'/pages/user/user',
        url:'/images/img3.png'
      } 
    ],
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
    this.onAuthLocation();
    var that = this;
    util.ajax({
      url: app.globalData.path + 'ApiFoods/storename',
      method: 'POST',
      data: {},
      success: function (res) {
        console.log(res)
        if(res.data.status == 'success'){
        }else{
          console.log(res.data.msg);
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