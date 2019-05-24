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
			list:[],
    });
		//调接口
		util.ajax({
			url: app.globalData.path + 'ApiStore/storeOrder',
			method: 'POST',
			data: {
				id: wx.getStorageSync('storeInfo').store_id,
				status: _this.data.check
			},
			success: function (res) {
				if (res.data.code == 0) {
					_this.setData({
						list: res.data.data
					})
				}
			}
		})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;

    //调接口
    util.ajax({
      url: app.globalData.path + 'ApiStore/storeOrder',
      method: 'POST',
      data: {
        id: wx.getStorageSync('storeInfo').store_id,
        status: _this.data.check,
      },
      success: function(res) {
        if (res.data.code == 0) {
          _this.setData({
						list: res.data.data,
          })
        }
      }
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
  onShow: function() {},
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
  // onReachBottom: function() {
  //   this.onloadMethod();
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 弹窗
   */
  showDialogBtn: function(e) {
    // console.log(e.currentTarget.dataset.id)
    this.setData({
      showModal: true,
      food_id: e.currentTarget.dataset.id
    })
  },
  getInput: function(e) {
    let item = e.currentTarget.dataset.model;
    // console.log(item)
    this.setData({
      [item]: e.detail.value
    });
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
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
    this.hideModal();
    var _this = this;

    if (e.detail.value.store_remarks == '') {
      wx.showToast({
        title: '请输入取消原因',
        icon: 'none',
        duration: 1500 //持续的时间
      });
      return false;
    }
    util.ajax({
      url: app.globalData.path + 'ApiStore/store_cancel',
      method: 'POST',
      data: {
        store_remarks: e.detail.value.store_remarks,
        id: _this.data.food_id,
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