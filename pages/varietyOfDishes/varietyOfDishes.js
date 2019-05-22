// pages/order/order.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: 0,
    list: ['', '', '', ''],
    food: [{
        id: "1",
        icon: "/images/gbjd.jpg",
        name: "宫保鸡丁",
        details: "红而不辣、辣而不猛、香辣味浓、肉质滑脆。由于其入口鲜辣，鸡肉的鲜嫩配合花生的香脆",
        price: "99",
        original_price: "109",
        status: "0",
        sold: "100"
      },
      {
        id: "1",
        icon: "/images/mpdf.jpg",
        name: "麻婆豆腐",
        details: "麻来自花椒，辣来自辣椒，这道菜突出了川菜“麻辣”的特点。其口味独特，口感顺滑",
        price: "89",
        original_price: "99.9",
        status: "1",
        sold: "210"
      },
      {
        id: "1",
        icon: "/images/tds.jpg",
        name: "酸辣土豆丝",
        details: "色泽光亮，酸辣可口，让人口齿生津，酸辣易下饭",
        price: "25",
        original_price: "29",
        status: "0",
        sold: "99"
      },
      {
        id: "1",
        icon: "/images/szt.jpg",
        name: "红烧狮子头",
        details: "光闻起来就引动食欲，醇香味浓的肉块与汁液，超级美味",
        price: "79",
        original_price: "89",
        status: "1",
        sold: "99"
      },
      {
        id: "1",
        icon: "/images/hgr.jpg",
        name: "川香回锅肉",
        details: "制作原料主要有猪肉、青椒、蒜苗等，口味独特，色泽红亮，肥而不腻，入口浓香",
        price: "59",
        original_price: "69",
        status: "0",
        sold: "99"
      },
    ],
    // 侧边栏
    open: false,
    // mark 是指原点x轴坐标
    mark: 0,
    // newmark 是指移动的最新点的x轴坐标 
    newmark: 0,
    istoright: true,
    storeImg: wx.getStorageSync('storeInfo').img
  },
  selectDispaly: function(e) {
    let _this = this;
    _this.setData({
      check: e.currentTarget.dataset.id
    });

    _this.setData({
      foods: '',
    });

    // 按条件查询数据
    util.ajax({
      url: app.globalData.path + 'ApiStore/index',
      method: 'POST',
      data: {
        store_id: wx.getStorageSync('storeInfo').store_id,
        check: this.data.check
      },
      success: function(res) {
        //成功
        if (res.data.code == 0) {
          _this.setData({
            foods: res.data.data,
          });
        }
      }

    });
  },
  search: function(e) {
    console.log(11111111)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //判断是否登录
    if (wx.getStorageSync('storeInfo') === '') {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000 //持续的时间
      });
      setTimeout(function() {
        wx.redirectTo({
          url: '/pages/roomLogin/roomLogin'
        })
      }, 3000)

    }
    var that = this;

    // 请求数据
    util.ajax({
      url: app.globalData.path + 'ApiStore/index',
      method: 'POST',
      data: {
        store_id: wx.getStorageSync('storeInfo').store_id,
        check: this.data.check
      },
      success: function(res) {
        //成功
        if (res.data.code == 0) {
          that.setData({
            foods: res.data.data,
            store: res.data.store
          });
        }
      }

    });
  },
  // 修改状态
  status: function(e) {
    var id = e.currentTarget.dataset.id
    var status = e.currentTarget.dataset.status

    var current_state = status == 1 ? "下架" : "上架"

    wx.showModal({
      title: '提示',
      content: '是否确认' + current_state,
      success: function(res) {
        if (res.confirm) {
          util.ajax({
            url: app.globalData.path + 'ApiStore/status',
            method: 'POST',
            data: {
              id: id
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
                    url: '/pages/varietyOfDishes/varietyOfDishes'
                  })
                }, 500)
              }
            }
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
              url: '/pages/roomLogin/roomLogin'
            })
          }, 1000)
        }
      }
    })
  },
  // 以下为侧边栏JS
  // 点击左上角小图标事件
  tap_ch: function(e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },

  tap_start: function(e) {
    // touchstart事件
    // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 newmark
    this.data.mark = this.data.newmark = e.touches[0].pageX;
    console.log('关闭')
		console.log(this.data.mark)
  },

  tap_drag: function(e) {
    // touchmove事件
    this.data.newmark = e.touches[0].pageX;

    // 手指从左向右移动
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }

    // 手指从右向左移动
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;
    }
    this.data.mark = this.data.newmark;
  },

  tap_end: function(e) {
		
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    // 通过改变 opne 的值，让主页加上滑动的样式
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }

  },
	left_open:function(){
		if (this.data.open == true) {
			this.setData({
				open: true
			});
		} else {
			this.setData({
				open: false
			});
		}
	}
})