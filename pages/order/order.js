// pages/order/order.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: 0,
    list: [],
    len: null,
    openof: 1,
    page: 1
  },

  selectDispaly: function(e) {
    let _this = this;
    _this.setData({
      check: e.currentTarget.dataset.id
    });
    this.result();
    _this.onloadMethod(_this.data.check)
  },
  result: function() {
    this.setData({
      list: [],
      len: null,
      openof: 1,
      page: 1
    })
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
		if (this.data.page) {
			this.result();
			this.onloadMethod()
		}
  },
  //滑动加载
  onloadMethod: function() {
    let that = this
    let id = wx.getStorageSync('employeeInfo').id

    if (that.data.len == 0) return false;
    if (that.data.openof != that.data.page) return false;
    that.data.openof++;
    this.setData({
      openof: that.data.openof
    })
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    //调接口
    util.ajax({
      url: app.globalData.path + 'ApiOrder/index',
      method: 'GET',
      data: {
        id: id,
        type: that.data.check,
        pageSize: 10, //每页展示的数据条数
        page: that.data.page //当前页码（从1开始）
      },
      success: function(res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.status == 'success') {
          res.data.list.forEach(function(item) {
            that.data.list.push(item)
          })
          that.data.page++;
          that.setData({
            len: res.data.list.length,
            list: that.data.list,
            page: that.data.page,
            openof: that.data.page
          })
        }
      },
      complete: function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },
  have_meals: function(e) {
    var _this = this;
    var key = e.currentTarget.dataset.key;
    wx.showModal({
      title: '提示',
      content: '确定已用餐吗？',
      success: function(sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          util.ajax({
            url: app.globalData.path + 'ApiOrder/haveMeals',
            method: 'POST',
            data: {
              id: e.currentTarget.dataset.id,
            },
            success: function(res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                });
                // 重置数据
                if (_this.data.check == 0) {
                  _this.data.list[key].use_status = 1;
                  _this.setData({
                    list: _this.data.list
                  })
                }
              }
            }
          })


        }
      }
    })

  },
  cancel: function(e) {
    var _this = this;
    var key = e.currentTarget.dataset.key;
    wx.showModal({
      title: '提示',
      content: '确定取消订单吗？',
      success: function(sm) {
        if (sm.confirm) {
          util.ajax({
            url: app.globalData.path + 'ApiOrder/cancel',
            method: 'POST',
            data: {
              id: e.currentTarget.dataset.id,
            },
            success: function(res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                });
                // 重置数据
                if (_this.data.check == 0) {
                  _this.data.list[key].use_status = 2;
                  _this.setData({
                    list: _this.data.list
                  })
                }
              }
            }
          })


        }
      }
    })

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

    wx.showNavigationBarLoading() //在标题栏中显示加载		
    this.setData({
      page: 1
    })
    this.onloadMethod();

    //模拟加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.onloadMethod();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})