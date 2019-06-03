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
		if (e.target.dataset.current == 1) {
			this.onloadMethod()
		}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		var _this = this;
		// wx.getSystemInfo({
		// 	success: function(res) {
		// 		_this.setData({
		// 			height_h: res.screenHeight-310
		// 		})
		// 	},
		// })
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
        }
      }
    })

  }, //事件处理函数  
  switchRightTab: function(e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })

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
        }
      }
    })
  },
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
  tabNav: function(e) {
    console.log(e.target.dataset.current, 111, this.data.currentTab)
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
            url: app.globalData.path + 'ApiStore/foodDelte',
            method: 'POST',
            data: {
              foodId: foodId,
              store_id: wx.getStorageSync('storeInfo').store_id
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
        pageSize: 4, //每页展示的数据条数
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

					console.log(that.data.comment)
        }
      },
      complete: function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
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
		if (_this.data.currentTab == 1) {
			_this.onloadMethod()
    }
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

  }
})