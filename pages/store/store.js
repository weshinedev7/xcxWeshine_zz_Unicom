var utils = require('../../utils/util.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-10-01',
    start_time: '06:00',
    end_time: '20:00',
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
              file_name: res.data.data.img,
							business_hours: res.data.data.business_hours,
							closing_time: res.data.data.closing_time,

            });
            var status = _this.data.store.status == 1 ? '(正在营业)' : '(今日休息)';
            var status_text = _this.data.store.status == 1 ? '1' : '2';
            if (_this.data.store.status) {
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
  submitData: function(e) {
    var _this = this;
    wx.request({
      url: app.globalData.path + 'ApiStore/storeSave',
      method: 'POST',
      data: {
        id: wx.getStorageSync('storeInfo').store_id,
				file_name: _this.data.file_name,
				name: e.detail.value.name,
				closing_time: e.detail.value.closing_time,
				business_hours: e.detail.value.business_hours,
        status: _this.data.status,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {

        if (res.data.code === 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          setTimeout(function() {
            wx.navigateTo({
							url: '/pages/store/store'
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
	},
	changeDate(e) {
		this.setData({
			date: e.detail.value
		});
	},
	changeTime(e) {
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