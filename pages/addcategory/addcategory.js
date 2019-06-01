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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
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
			success: function (res) {
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
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					_this.setData({
						foods: res.data.data,
						store: res.data.store,
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
        console.log(_this.data.foods)
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
			success: function (res) {
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
	tabNav: function (e) {
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