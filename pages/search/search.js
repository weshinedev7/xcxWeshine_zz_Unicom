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
    foods: [],
    len: null,
    openof: 1,
    page: 1
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
      var that = this;
      if (that.data.len == 0) return false;
      if (that.data.openof != that.data.page) return false;
      that.data.openof++;
      this.setData({
        openof: that.data.openof
      })
      wx.showNavigationBarLoading() //在标题栏中显示加载
      wx.showLoading({
        title: '加载中',
        mask: true
			});
      util.ajax({
        url: app.globalData.path + 'ApiFoods/searchFoods',
        method: 'GET',
        data: {
          search: that.data.search,
          pageSize: 6, //每页展示的商户数据条数
          page: that.data.page //当前页码（从1开始）
        },
        success: function(res) {
          if (res.data.code == 0) {
						console.log(res.data.data)
            res.data.data.forEach(function(item) {
              that.data.foods.push(item)
            })
            that.data.page++;
            that.setData({
              len: res.data.data.length,
							foods: that.data.foods,
              page: that.data.page,
              openof: that.data.page
            });
            that.setData({
              show: '1'
						})
					} else if (that.data.foods == null) {
            that.setData({
              show: '0'
            })
					}
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
        },
        complete: function() {
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        },
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
    this.search();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

	},
	// 查看详情
	details: function (e) {
		wx.navigateTo({
			url: '/pages/details/details?id=' + e.currentTarget.dataset.id
		})
	},
	// 已打烊
	close: function (e) {
		wx.showToast({
			title: '该店铺已打烊',
			icon: 'none',
			duration: 1000,
		});
	}
})