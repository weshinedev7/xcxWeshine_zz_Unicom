var utils = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
		
    if (_this.data.id != '') {
      wx.request({
        url: app.globalData.path + 'ApiStore/find',
        method: 'GET',
        data: {
					id: wx.getStorageSync('storeInfo').store_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data.code === 0) {
						_this.setData({
							store: res.data.data,
              file_name: res.data.data.img
            });
						var status = _this.data.store.status == 1 ? '(正在营业)' : '(今日休息)';
						var status_text = _this.data.store.status == 1 ? '1' : '2';
						if (_this.data.store.status){
							_this.setData({
								status_text: status,
								status: status_text,
							});
						}
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
  // 修改商店状态
  switchChange(e) {
		var status = e.detail.value === true ? '1' : '2';
		var status_text = status == 1 ? '(正在营业)' : '(今日休息)';
		this.setData({
			status: status,
			status_text: status_text
		})
  },
  upload: function(e) {
    // 选择文件
    var _this = this;
		wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if (res.tempFilePaths) {
          wx.uploadFile({
						url: app.globalData.path + 'ApiStore/singleFile',
            filePath: res.tempFilePaths[0],
            formData: {},
            name: 'file',
            success: function(res) {
              var json = JSON.parse(res.data);
							if (json.code == 0) {
              	_this.setData({
									file_name: json.file_name
              	})
              }
            }
          })
        }

      }
    })
  },
	submitData:function(e){
		var _this = this;
		wx.request({
			url: app.globalData.path + 'ApiStore/storeSave',
			method: 'POST',
			data: {
				id: wx.getStorageSync('storeInfo').store_id,
				file_name: _this.data.file_name,
				name: e.detail.value.name,
				status: _this.data.status,
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {

				if (res.data.code === 0) {
					wx.showToast({
						title: res.data.msg,
						icon: 'succes',
						duration: 1000,
						mask: true
					});
					setTimeout(function () {
						wx.navigateTo({
							url: '/pages/varietyOfDishes/varietyOfDishes'
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
})