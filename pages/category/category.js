var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    cate_id: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
            list: res.data.data
          })
					console.log(res.data.data)
        }
      }
    })
		console.log(_this.data.list)
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
								wx.showToast({
									title: '删除失败',
									icon: 'succes',
									duration: 1000,
									mask: true
								});
							}
            }
          })
        }
      }
    })

  },
  powerDrawer: function(e) {
    var key = e.currentTarget.dataset.key
		if (key != 1000) {
      this.setData({
        cate_id: e.currentTarget.dataset.id,
        key: e.currentTarget.dataset.key,
        edit_category: this.data.list[key]
      })
    }
    var currentStatu = e.currentTarget.dataset.statu;
    this.add(currentStatu)
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
          edit_category: ''
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
    }
    if (_this.data.cate_id != 0) {
      var data = {
        cate_id: _this.data.cate_id,
        name: e.detail.value.name,
				sort: e.detail.value.sort,
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

  }
})