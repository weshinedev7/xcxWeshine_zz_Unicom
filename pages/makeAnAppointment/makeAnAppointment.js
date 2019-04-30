// pages/makeAnAppointment/makeAnAppointment.js
var dateTimePicker = require('../../utils/dateTimePicker.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    "menuTapCurrent": 0,
    items: [{
        name: '茶水',
        value: '茶水'
      },
      {
        name: '桌签',
        value: '桌签',
        checked: 'true'
      },
      {
        name: '笔记本电脑',
        value: '笔记本电脑'
      },
      {
        name: '投影仪',
        value: '投影仪'
      },
      {
        name: '鲜花',
        value: '鲜花'
      },
      {
        name: '点名发言',
        value: '点名发言'
      },
      {
        name: '背景音乐',
        value: '背景音乐'
      },
		],
		title: "",
		number: "",
		content: "",
		title: "",
		remarks: "",
  },
	reset: function () {
		this.setData({
			// input_code: "",
			title: "",
			number: "",
			content: "",
			title: "",
			remarks: "",
			items: [{
					name: '茶水',
					value: '茶水'
				},
				{
					name: '桌签',
					value: '桌签',
					checked: 'true'
				},
				{
					name: '笔记本电脑',
					value: '笔记本电脑'
				},
				{
					name: '投影仪',
					value: '投影仪'
				},
				{
					name: '鲜花',
					value: '鲜花'
				},
				{
					name: '点名发言',
					value: '点名发言'
				},
				{
					name: '备注',
					value: '备注'
				},
			],
		})
		
		// if (getCurrentPages().length >= 1) {

		// 	//刷新当前页面的数据
		// 	getCurrentPages()[getCurrentPages().length - 1].onLoad()
		// }
	},
	
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
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
      dateTime: e.detail.value
    });
  },
  changeDateTime1(e) {
    this.setData({
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