// pages/vehicleDetails/vehicleDetails.js
var app = getApp();
var dateTimePicker = require('../../utils/dateTimePicker.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remarks: "",
    info: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉

    obj1.dateTimeArray.pop();
    obj1.dateTime.pop();

    obj.dateTimeArray.pop();
    obj.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

    var _this = this;

    //获取店铺信息
    util.ajax({
      url: app.globalData.path + 'ApiCategory/getStore',
      data: {
        id: options.store_id
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 0) {

          _this.setData({
            store: res.data.data
          });
        }
      }
    })

    //读取购物车中的信息
    var userId = wx.getStorageSync('employeeInfo').id,
      orderInfo = wx.getStorageSync('orderInfo'),
      totalPic = wx.getStorageSync('totalPic'),
      totalPrice = wx.getStorageSync('totalPrice');
    if (userId == '') {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000 //持续的时间
      });
      setTimeout(function() {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }, 2000)
    }
    if (orderInfo == '' || options.store_id == '') {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
    _this.setData({
      orderInfo: orderInfo,
      totalPic: totalPic,
      totalPrice: totalPrice,
      payType: options.type
    })
  },

  //获取输入的值
  getInput: function(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]: e.detail.value
    })
  },

  //付款
  pay: function(e) {
    var userId = wx.getStorageSync('employeeInfo').id,
      type = e.target.dataset.id,
      store_id = this.data.store.id,
      orderInfo = this.data.orderInfo,
      totalPic = this.data.totalPic,
      totalPrice = this.data.totalPrice;
    if (type == '') {
      wx.showToast({
        title: '请选择付款方式',
        icon: 'none',
        duration: 2000 //持续的时间
      });
    }
    if (userId == '') {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000 //持续的时间
      });
      setTimeout(function() {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }, 3000)
    }
    if (orderInfo == '' || store_id == '') {
      wx.switchTab({
        url: '/pages/order/order',
      })
    }

    // 预约提价数据
    if (this.data.payType == 2) {

      // 判断是否是预约订餐
      var time = this.data.dateTimeArray[0][this.data.dateTime[0]] + "-" + this.data.dateTimeArray[1][this.data.dateTime[1]] + "-" + this.data.dateTimeArray[2][this.data.dateTime[2]] + " " + this.data.dateTimeArray[3][this.data.dateTime[3]] + ":" + this.data.dateTimeArray[4][this.data.dateTime[4]] + ":00";

      var date = util.formatTime(new Date());
      if (time < date) {
        wx.showToast({
          title: '预约时间不能小于当前时间',
          icon: 'none',
          duration: 2000 //持续的时间
        });
				return false;
      }
      // 下单
      util.ajax({
				url: app.globalData.path + 'ApiFoods/appointmentOrder',
        method: "POST",
        data: {
          userId: userId,
          type: type,
          storeId: store_id,
          orderInfo: JSON.stringify(orderInfo),
          totalPic: totalPic,
          totalPrice: totalPrice,
          appointment: time,
          remarks: this.data.remarks
        },
        success: function(res) {
          if (res.data.status == '1') {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1000
            });
            setTimeout(function() {
							wx.redirectTo({
								url: '/pages/appointmentFoods/appointmentFoods?page=1',
              })
            }, 1000);
          }else if(res.data.status == '3'){
						wx.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						});
					}
        }
      })
    } else {

      // 下单
      util.ajax({
        url: app.globalData.path + 'ApiFoods/orderinfo',
        method: "POST",
        data: {
          userId: userId,
          type: type,
          storeId: store_id,
          orderInfo: JSON.stringify(orderInfo),
          totalPic: totalPic,
          totalPrice: totalPrice,
          remarks: this.data.remarks
        },
        success: function(res) {
          if (res.data.status == '1') {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1000
            });
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/order/order?page=1',
              })
            }, 1000);
          }
        }
      })
    }
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
  menuTap: function(e) {
    var current = e.currentTarget.dataset.current; //获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent: current
    });
  },
  changeDate(e) {
    this.setData({
      date: e.detail.value
    });
  },
  changeTime(e) {
    this.setData({
      time: e.detail.value
    });
  },
  changeDateTime(e) {
    this.setData({
      start_time: '',
      dateTime: e.detail.value
    });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  // 预约菜品提交
  appointment: function(e) {

    console.log(22222222222)
    // 判断是否是预约订餐
    var time = this.data.dateTimeArray[0][this.data.dateTime[0]] + "-" + this.data.dateTimeArray[1][this.data.dateTime[1]] + "-" + this.data.dateTimeArray[2][this.data.dateTime[2]] + " " + this.data.dateTimeArray[3][this.data.dateTime[3]] + ":" + this.data.dateTimeArray[4][this.data.dateTime[4]] + ":00";
    this.setData({
      appointment_time: time
    })

    var userId = wx.getStorageSync('employeeInfo').id,
      type = e.target.dataset.id,
      store_id = this.data.store.id,
      orderInfo = this.data.orderInfo,
      totalPic = this.data.totalPic,
      totalPrice = this.data.totalPrice;
    if (type == '') {
      wx.showToast({
        title: '请选择付款方式',
        icon: 'none',
        duration: 2000 //持续的时间
      });
    }
    if (userId == '') {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000 //持续的时间
      });
      setTimeout(function() {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }, 3000)
    }
    if (orderInfo == '' || store_id == '') {
      wx.switchTab({
        url: '/pages/order/order',
      })
    }

    // 下单
    util.ajax({
      url: app.globalData.path + 'ApiFoods/orderinfo',
      method: "POST",
      data: {
        userId: userId,
        type: type,
        storeId: store_id,
        orderInfo: JSON.stringify(orderInfo),
        totalPic: totalPic,
        totalPrice: totalPrice,
        appointment: _this.data.appointment_time,
        remarks: this.data.remarks
      },
      success: function(res) {
        if (res.data.status == '1') {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000
          });
          setTimeout(function() {
            wx.switchTab({
              url: '/pages/order/order?page=1',
            })
          }, 1000);
        }
      }
    })
  }

})