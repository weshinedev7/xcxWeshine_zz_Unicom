// pages/search/search.js

var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    show: '2',
  },

  searchInput: function(e) {
    this.setData({
      search: e.detail.value
    })
  },

  search: function(e) {

    var _this = this;

    if (_this.data.search == '') {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 1000 //持续的时间
      });
    } else {
			wx.showLoading({
				title: '加载中',
				mask: true
			});
      util.ajax({
        url: app.globalData.path + 'ApiFoods/searchFoods',
        method: 'GET',
        data: {
					search: _this.data.search
          // search: '红烧'
        },
        success: function(res) {
          //成功
          if (res.data.code == 0) {
            _this.setData({
              foods: res.data.data,
            });
            _this.setData({
              show: '1'
            })
          } else {
            _this.setData({
              show: '0'
            })
					}
					wx.hideLoading()
					wx.hideNavigationBarLoading()
        }

      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
})