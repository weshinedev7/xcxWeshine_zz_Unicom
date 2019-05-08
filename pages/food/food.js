// pages/order/order.js
var app=getApp();
var util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check:0
  },

  selectStore:function(e){
    let _this=this;
    _this.setData({
      check: e.currentTarget.dataset.id
    });
    console.log(_this.data.check);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    util.ajax({
      url: app.globalData.path +'ApiFoods/storename',
      method:'POST',
      data:{},
      success:function(res){
        console.log(res)
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