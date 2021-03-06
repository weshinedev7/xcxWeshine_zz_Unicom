var dateTimePicker = require('../../utils/dateTimePicker.js');
var utils = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
	data: {
		"menuTapCurrent": 0,
		number: "",
		remarks: "",

	},
	reset: function () {
		this.setData({
			// input_code: "",
			upload_picture_list: "",
			title: "",
			number: "",
			content: "",

			// 选择时间
			date: '',
			time: '12:00',
			dateTimeArray: null,
			dateTime: null,
			dateTimeArray1: null,
			dateTime1: null,
			startYear: 2000,
			endYear: 2050

		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
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

		// 接收修改预约书时传入的预约id
		if (options.id){
			this.setData({
				b_id: options.id
			})
		}

		var that = this;
		console.log(that.data.start_time);
		// 修改时请求数据
		if (this.data.b_id != null) {
			wx.request({
				url: app.globalData.path + 'ApiBookingvehicle/find',
				method: 'POST',
				data: {
					id: this.data.b_id
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: function (res) {
					if (res.data.code === 0) {
						that.setData({
							vehicle: res.data.data,
							start_time: res.data.data.start_time,
							end_time: res.data.data.end_time,
							number: res.data.data.number,
							content: res.data.data.content,
						});
					}
				}
			})
		}
	},
	// 重置数据
	reset: function () {
		if (this.data.vehicle) {
			this.setData({
				start_time: this.data.vehicle.start_time,
				end_time: this.data.vehicle.end_time,
				number: this.data.vehicle.number,
				content: this.data.vehicle.content,
			})
		} else {
			this.setData({
				number: "",
				content: "",
			})
		}
	},
	// 提交数据
	formsubmit: function (e) {
		// 获取数据
		var start_time = e.detail.value.start_time
		var end_time = e.detail.value.end_time
		var number = e.detail.value.number
		var content = e.detail.value.content
		var that = this;

		if (!this.data.b_id) {
			that.setData({
				b_id: '',
			})
		}

		//判断
		if (start_time >= end_time) {
			wx.showToast({
				title: '使用时间不能小于结束时间',
				icon: 'none',
				duration: 2500 //持续的时间
			});
			return false;
		}
		// 获取当前时间(年月日时分)
		var date = utils.formatTime(new Date());
		if (start_time <= date) {
			wx.showToast({
				title: '使用时间不能小于当前时间',
				icon: 'none',
				duration: 2500 //持续的时间
			});
			return false;
		}

		if (number == '' || number == 0) {
			wx.showToast({
				title: '请重新输入乘坐的人数',
				icon: 'none',
				duration: 2000 //持续的时间
			});
			return false;
		}
		if (content == '') {
			wx.showToast({
				title: '请重新输入车辆用途',
				icon: 'none',
				duration: 2000 //持续的时间
			});
			return false;
		}
		// 请求数据
		wx.request({
			url: app.globalData.path + 'ApiBookingvehicle/save',
			method: "POST",
			data: {
				start_time: e.detail.value.start_time,
				end_time: e.detail.value.end_time,
				number: e.detail.value.number,
				content: e.detail.value.content,
				apply_time: utils.formatTime(new Date()),
				tel: wx.getStorageSync('employeeInfo').number,
				applicant: wx.getStorageSync('employeeInfo').name,
				user_id: wx.getStorageSync('employeeInfo').id,
				b_id: that.data.b_id
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
							url: '/pages/vehicle/vehicle'
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
	// delete_start_time: function (e) {
	// 	this.setData({
	// 		start_time: '',
	// 		dateTime: e.detail.value
	// 	})
	// 	console.log(this.data.deteTime)
	// },
	// delete_end_time: function (e) {
	// 	this.setData({
	// 		end_time: '',
	// 		dateTime1: e.detail.value
	// 	})
	// },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function () {

	},

  /**
   * 生命周期函数--监听页面显示
   */
	onShow: function () {

	},

  /**
   * 生命周期函数--监听页面隐藏
   */
	onHide: function () {

	},

  /**
   * 生命周期函数--监听页面卸载
   */
	onUnload: function () {

	},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
	onPullDownRefresh: function () {

	},

  /**
   * 页面上拉触底事件的处理函数
   */
	onReachBottom: function () {

	},

  /**
   * 用户点击右上角分享
   */
	onShareAppMessage: function () {

	},
	menuTap: function (e) {
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
	changeDateTime1(e) {
		this.setData({
			end_time: '',
			dateTime1: e.detail.value
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