var app = getApp();
var util = require('../../utils/util.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dispaly:'none',
    menuTapCurrent: 0,
    items: [],
    title: "",
    number: "",
    content: "",
    title: "",
    remarks: "",
    otions:'',
  },

  reset: function() {
    this.setData({
      dispaly:'none',
      menuTapCurrent: 0,
      items: [],
      title: "",
      number: "",
      content: "",
      title: "",
      remarks: "",
      otions:'',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //提交会议申请
    var that = this;
    util.ajax({
      url: app.globalData.path + 'ApiRoom/getOptions',
      method: 'POST',
      data: {},
      success: function (res) {
        if(res.data.status ==='200'){
          that.setData({
            dispaly:'',
            items:res.data.info
          });
        }
      }
    });

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
  },

  //获取输入的值
  getInput: function(e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]:e.detail.value
    })
  },

  //获取补充选项的checkbox的值
  checkboxChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      otions:e.detail.value
    })
  },

  //提交
  submit:function(e){
    var dateTimeArray=this.data.dateTimeArray;
    var dateTimeArray1=this.data.dateTimeArray1;
    var dateTime=this.data.dateTime;
    var dateTime1=this.data.dateTime1;
    var start_time=dateTimeArray['0'][dateTime['0']]+'-'+dateTimeArray['1'][dateTime['1']]+'-'+dateTimeArray['2'][dateTime['2']]+' '+dateTimeArray['3'][dateTime['3']]+':'+dateTimeArray['4'][dateTime['4']]+':00';
    var end_time=dateTimeArray1['0'][dateTime1['0']]+'-'+dateTimeArray1['1'][dateTime1['1']]+'-'+dateTimeArray1['2'][dateTime1['2']]+' '+dateTimeArray1['3'][dateTime1['3']]+':'+dateTimeArray1['4'][dateTime1['4']]+':00';
    if(this.data.title===''){
      wx.showToast({
        title: '会议标题不能为空',
        icon: 'none',
        duration: 2000//持续的时间
      });
      return false;
    }
    if(this.data.number===''){
      wx.showToast({
        title: '会议人数不能为空',
        icon: 'none',
        duration: 2000//持续的时间
      });
      return false;
    }
    if(start_time===''){
      wx.showToast({
        title: '开始时间有误',
        icon: 'none',
        duration: 2000//持续的时间
      });
      return false;
    }
    if(end_time===''){
      wx.showToast({
        title: '结束时间有误',
        icon: 'none',
        duration: 2000//持续的时间
      });
      return false;
    }

    //提交会议申请
    util.ajax({
      url: app.globalData.path + 'ApiRoom/submitRecord',
      method: 'POST',
      data: {
        employee_id:wx.getStorageSync('employeeInfo').id,
        title:this.data.title,
        number:this.data.number,
        content:this.data.content,
        otions:this.data.otions,
        remarks:this.data.remarks,
        start_time:start_time,
        end_time:end_time,
      },
      success: function (res) {
        if(res.data.status!=='200'){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000//持续的时间
          });
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000//持续的时间
          });
          setTimeout(function () {
            wx.navigateTo ({
              url: '/pages/conferenceRoom/conferenceRoom'
            })
          }, 3000)
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
  },

})