var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: [],
    remarks: '',
    content: '',
    id: '',
    food_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      id: options.id,
      food_id: options.food_id
    })
    util.ajax({
      url: app.globalData.path + 'ApiFoods/scoreoption',
      method: "GET",
      data: {},
      success: function(res) {
        console.log('res', res);
        if (res.data.status == 'success') {
          res.data.list.forEach(function(item) {
            item.options = [];
            item.option.forEach(function(val) {
              var obj = {
                name: val,
                active: false
              }
              item.options.push(obj);
            });
          });
          that.setData({
            list: res.data.list
          });
        }
      }
    })
  },
  chioseTap: function(e) {
    var index = e.currentTarget.dataset.index;
    var parent = e.currentTarget.dataset.parent;
    this.data.list[parent].options.forEach(function(item) {
      item.active = false;
    });
    this.data.list[parent].options[index].active = true;
    this.setData({
      list: this.data.list
    })
  },
  submit: function() {
    var arr = [];
    var types = false;
    this.data.list.forEach(function(item) {
      item.options.forEach(function(val) {
        if (val.active) {
          var obj = {
            id: item.id,
            question: item.question,
            option: val.name
          }
          types = true;
          arr.push(obj);
        }
      });
    });
    if ((!this.data.content || this.data.content == '') && !types) {
      wx.showToast({
        title: '请选择评分项目或者填写意见',
        icon: 'none'
      });
      return false;
    }
    util.ajax({
      url: app.globalData.path + 'ApiFoods/ScoreDetail',
      data: {
        id: this.data.id,
        food_id: this.data.food_id,
        options: arr.length > 0 ? JSON.stringify(arr) : '',
        content: this.data.content ? this.data.content : ''
      },
      method: "POST",
      success: function(res) {
        console.log(res)
        if (res.data.status == 'success') {
          wx.showToast({
            title: '评分成功',
            icon: 'none'
          });
          setTimeout(function(){
            wx.navigateBack({
              data: 1
            })
          },1000);
        } else {
          wx.showToast({
            title: '评分失败',
            icon: 'none'
          })
        }
      }
    })
  },
  getContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  cancel: function() {
    wx.navigateBack({
      data: 1
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

  }
})