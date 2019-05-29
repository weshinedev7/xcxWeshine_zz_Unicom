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
    page: 1,
    showModal: false,
  },

  selectDispaly: function(e) {
    var _this = this;
    _this.setData({
      check: e.currentTarget.dataset.id,
      list: [],
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
			url: app.globalData.path + 'ApiStore/storeOrder',
      method: 'GET',
      data: {
        id: wx.getStorageSync('storeInfo').store_id,
				status: that.data.check,
        pageSize: 10, //每页展示的数据条数
        page: that.data.page //当前页码（从1开始）
      },
      success: function(res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.code == 0) {
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
					// console.log(that.data.len)
        }
      },
      complete: function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
		this.onloadMethod()
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
    this.onloadMethod();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 弹窗
   */
  showDialogBtn: function(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      showModal: true,
      id: e.currentTarget.dataset.id
    })
  },
  getInput: function(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    });
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  // preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function(e) {
    var _this = this;

    if (e.detail.value.store_remarks == '') {
      wx.showToast({
        title: '请输入取消原因',
        icon: 'none',
        duration: 1500 //持续的时间
      });
      return false;
    }

		this.hideModal();
    util.ajax({
      url: app.globalData.path + 'ApiStore/store_cancel',
      method: 'POST',
      data: {
        store_remarks: e.detail.value.store_remarks,
        id: _this.data.id,
      },
      success: function(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          // 下架商品
          wx.showModal({
            title: '提示',
            content: '是否将该商品下架',
            success: function(res) {
              if (res.confirm) {
                util.ajax({
                  url: app.globalData.path + 'ApiStore/status',
                  method: 'POST',
                  data: {
                    id: _this.data.food_id
                  },
                  success: function(res) {
                    if (res.data.code === 0) {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'success',
                        duration: 1000,
                        mask: true
                      });
                      setTimeout(function() {
                        wx.redirectTo({
                          url: '/pages/storeOrder/storeOrder'
                        })
                      }, 500)
                    }
                  }
                })
              }

            }
          })
        }
      }
    })
  }
})