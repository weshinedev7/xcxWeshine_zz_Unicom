var app = getApp();
var util = require('../../utils/util.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
		cate_id: 0,
		business_hours:"00:00",
		closing_time: "00:00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

		// 获取完整的年月日 时分秒，以及默认显示的数组
		var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
		var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
		// 精确到分的处理，将数组的秒去掉
		obj.dateTimeArray.pop();
		obj.dateTime.pop();

		obj1.dateTimeArray.pop();
		obj1.dateTime.pop();

		this.setData({
			dateTime: obj.dateTime,
			dateTimeArray: obj.dateTimeArray,
			dateTimeArray1: obj1.dateTimeArray,
			dateTime1: obj1.dateTime
		});
    var _this = this;
    util.ajax({
      url: app.globalData.path + 'ApiCategory/index',
      method: 'GET',
      data: {
        store_id: wx.getStorageSync('storeInfo').store_id,
      },
			success: function (res) {
				console.log(res.data.data)
        if (res.data.code == 0) {
          _this.setData({
            list: res.data.data,
          })
        }
      }
		})
  },
  delete_cate: function(e) {
    var _this = this;
    var key = e.currentTarget.dataset.key;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function(sm) {
        if (sm.confirm) {
          util.ajax({
						url: app.globalData.path + 'ApiCategory/delete_cate',
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
								// 删除元素
								var list = _this.data.list;
								list.splice(key, 1);
								_this.setData({
									list: list
								})  
              }else{
								if(res.data.code == 1){
									wx.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 1500,
										mask: true
									});
								}
							}
            }
          })
        }
      }
    })

  },
  powerDrawer: function(e) {
		var _this = this;
    var key = e.currentTarget.dataset.key
		if(key !== "00"){
			if (key != 10000) {
				_this.setData({
					cate_id: e.currentTarget.dataset.id,
					key: e.currentTarget.dataset.key,
					edit_category: _this.data.list[key],
					business_hours: _this.data.list[key].start_time,
					closing_time: _this.data.list[key].end_time
				})
			}
		}
    var currentStatu = e.currentTarget.dataset.statu;
		_this.add(currentStatu)
  },
  add: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function() {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false,
          cate_id: 0,
          key: '',
					edit_category: '',
					business_hours: "00:00",
					closing_time: "00:00"
        });
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  submit_data: function(e) {
		var _this = this;
		if (e.detail.value.name == '') {
			wx.showToast({
				title: '分类名不能为空',
				icon: 'none',
				duration: 2000 //持续的时间
			});
			return false;
		}
		if (e.detail.value.sort == '') {
			wx.showToast({
				title: '排序不能为空',
				icon: 'none',
				duration: 2000 //持续的时间
			});
			return false;
		}
		var start_time = e.detail.value.start_time
		var end_time = e.detail.value.end_time
		if (start_time >= end_time){
			wx.showToast({
				title: '开始时间不能大于结束时间',
				icon: 'none',
				duration: 2000 //持续的时间
			});
			return false;
		}
    if (_this.data.cate_id != 0) {
      var data = {
        cate_id: _this.data.cate_id,
        name: e.detail.value.name,
				sort: e.detail.value.sort,
				startTime: e.detail.value.start_time,
				endTime: e.detail.value.end_time,
				store_id: wx.getStorageSync('storeInfo').store_id,
      }
      util.ajax({
        url: app.globalData.path + 'ApiCategory/save',
        method: 'POST',
        data: data,
        success: function(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'succes',
              duration: 1000,
              mask: true
            });
            setTimeout(function() {
              wx.redirectTo({
                url: '/pages/category/category'
              })
            }, 500)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
              mask: true
            });
          }
        }
      })
    } else {
      var data = {
        cate_id: _this.data.cate_id,
        name: e.detail.value.name,
				sort: e.detail.value.sort,
				startTime: e.detail.value.start_time,
				endTime: e.detail.value.end_time,
        store_id: wx.getStorageSync('storeInfo').store_id,
      }
      util.ajax({
        url: app.globalData.path + 'ApiCategory/save',
        method: 'POST',
        data: data,
        success: function(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'succes',
              duration: 1000,
              mask: true
            });
            setTimeout(function() {
              wx.redirectTo({
                url: '/pages/category/category'
              })
            }, 500)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
              mask: true
            });
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
	changeDate(e) {
		this.setData({
			date: e.detail.value
		});
	},
	changeTime(e) {
		console.log(e.detail.value)
		this.setData({
			business_hours: '',
			start_time: e.detail.value
		});
	},
	changeTime1(e) {
		this.setData({
			closing_time: '',
			end_time: e.detail.value
		});
	},
	changeDateTime(e) {
		this.setData({
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
	changeDateTimeColumn1(e) {
		var arr = this.data.dateTime1,
			dateArr = this.data.dateTimeArray1;

		arr[e.detail.column] = e.detail.value;
		dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

		this.setData({
			dateTimeArray1: dateArr,
			dateTime1: arr
		});
	}
})