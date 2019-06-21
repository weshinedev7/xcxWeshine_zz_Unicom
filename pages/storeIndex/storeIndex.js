var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: '',
    curNav: 0,
    isShow: true,
    currentTab: 0,

    // 评论
    list: [],
    len: null,
    openof: 1,
    page: 1
  },
  //打开透明层
  showRule: function() {
    this.setData({
      isRuleTrue: true
    })
  },
  //关闭透明层
  hideRule: function() {
    this.setData({
      isRuleTrue: false
    })
  },
  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTba: e.detail.current
    });
  },
  //点击切换
  clickTab: function(e) {
    var _this = this;
    if (_this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      _this.setData({
        currentTab: e.target.dataset.current
      })

    }
    if (e.target.dataset.current == 2) {
      this.onloadMethod()
    }
    if (e.target.dataset.current == 1) {
      this.appointment()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  }, //事件处理函数  
  switchRightTab: function(e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    if (id == 0) {
      this.setData({
        curNav: id,
        curIndex: index,
        categoryId: 0
      })
    } else {
      this.setData({
        curNav: id,
        curIndex: index,
        categoryId: id
      })
    }

    var _this = this;
    util.ajax({
      url: app.globalData.path + 'ApiStore/index',
      data: {
        storeId: wx.getStorageSync('storeInfo').store_id,
        categoryId: id
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        //成功
        if (res.data.code == 0) {
          _this.setData({
            foods: res.data.data,
            store: res.data.store,
          });
					if (id != 0){
					_this.setData({
						categoryType: res.data.category.type,
						start_time: res.data.category.start_time,
						end_time: res.data.category.end_time,
					})
				}
					console.log(_this.data.foods)
          if (_this.data.foods.length == 0) {
						// 分类状态
            _this.setData({
              categoryType: 0
            })
          }
        }
      }
    })
  },
  // 商品上下架
  upperLowerShelf: function(e) {

    var id = e.target.dataset.id;
    var key = e.target.dataset.key;
    var _this = this;
    util.ajax({
      url: app.globalData.path + 'ApiStore/status',
      data: {
        foodId: id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000,
            mask: true
          });
          if (_this.data.check == 0) {
            _this.data.foods[key].type = _this.data.foods[key].type == 1 ? '2' : '1';
            _this.setData({
              foods: _this.data.foods
            })
          }
        }
      }
    })
  },
  // 分类下架
  categoryLowerShelf: function(e) {
    var checkedValue = e.detail.value;
    this.setData({
      type: e.detail.value == true ? '1' : '2'
    })
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);

    var _this = this;
    util.ajax({
      url: app.globalData.path + 'ApiStore/categoryLowerShelf',
      data: {
        storeId: wx.getStorageSync('storeInfo').store_id,
        categoryId: id,
        type: this.data.type
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        //成功
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000,
            mask: true
          });
          var foods = [];
          _this.data.foods.forEach(function(item, index) {
            item.type = item.type == 1 ? '2' : '1'
            foods.push(item)
          })
          _this.setData({
            foods: foods,
            categoryType: _this.data.type == 1 ? '1' : '2'
          })
        }
      }
    })
  },
  tabNav: function(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  foodDelete: function(e) {

    var _this = this;
    var key = e.currentTarget.dataset.key
    var foodId = e.currentTarget.dataset.id;

    // 删除数据
    wx.showModal({
      title: '提示',
      content: '确认删除此菜品？',
      success: function(res) {
        if (res.confirm) {
          util.ajax({
            url: app.globalData.path + 'ApiStore/foodDelete',
            method: 'POST',
            data: {
              foodId: foodId,
              storeId: wx.getStorageSync('storeInfo').store_id
            },
            success: function(res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration: 1000,
                  mask: true
                });

                // 删除元素
                var foods = _this.data.foods;
                foods.splice(key, 1);
                _this.setData({
                  foods: foods
                })

              }
            }
          })
        }

      }
    })
  },
  //滑动加载  评分
  onloadMethod: function() {
    let that = this

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
      url: app.globalData.path + 'ApiStore/storeComment',
      method: 'GET',
      data: {
        storeId: wx.getStorageSync('storeInfo').store_id,
        pageSize: 10, //每页展示的数据条数
        page: that.data.page //当前页码（从1开始）
      },
      success: function(res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.code == 0) {
          res.data.data.forEach(function(item) {
            that.data.list.push(item)
          })
          that.data.page++;
          that.setData({
            len: res.data.data.length,
            page: that.data.page,
            openof: that.data.page,
            comment: that.data.list,
          })

        }
      },
      complete: function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },
  outLogin: function(e) {
    wx.showModal({
      title: '提示',
      content: '确定要注销吗？',
      success: function(sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          wx.setStorageSync('storeInfo', "");
          wx.showToast({
            title: '已注销',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          setTimeout(function() {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }, 1000)
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
  onShow: function() {
    var _this = this;
    _this.onloadMethod()

    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          height_h: res.screenHeight - 330
        })
      },
    })
      _this.appointment()
    // 获取分类
    util.ajax({
      url: app.globalData.path + 'ApiCategory/index',
      data: {
        store_id: wx.getStorageSync('storeInfo').store_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        //成功
        if (res.data.code == 0) {
          _this.setData({
            category: res.data.data,
          });
        }
      }
    })
    // 获取全部数据   
    util.ajax({
      url: app.globalData.path + 'ApiStore/index',
      data: {
        storeId: wx.getStorageSync('storeInfo').store_id,
        categoryId: _this.data.curNav
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        //成功
        if (res.data.code == 0) {
          _this.setData({
            foods: res.data.data,
            store: res.data.store,
            score: res.data.score,
            count: res.data.count,
          });
					// console.log(_this.data.foods)
        }
      }
    })
  },
	// 预约菜品
  appointment: function() {
    var _this = this;
    // 获取全部数据   
    util.ajax({
      url: app.globalData.path + 'ApiStore/appointment',
      data: {
        storeId: wx.getStorageSync('storeInfo').store_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        //成功
        if (res.data.code == 0) {
          _this.setData({
            appointment_foods: res.data.data
          });
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
  appointment_cz: function(e) {
    console.log(e.detail.value)
    var _this = this;
    if (e.detail.value == false) {
      wx.showModal({
        title: '提示',
        content: '确定要清除全部吗？',
        success: function(sm) {
          if (sm.confirm) {
            util.ajax({
              url: app.globalData.path + 'ApiStore/closeAppointment',
              method: 'POST',
              data: {
                storeId: wx.getStorageSync('storeInfo').store_id
              },
              success: function(res) {
                if (res.data.code == 0) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                  })
                  _this.setData({
                    appointment_foods: ''
                  })
                }
              }
            });
          }else{
						_this.setData({
							appointment_foods: _this.data.appointment_foods
						})
					}
        }
      })
    }
  }
})