Page({

  /**
   * 页面的初始数据
   */
  data: {
		check: 0,
		vehicle: [{
			start_time: "2019-04-29 13:30:00",
			end_time: "2019-04-29 15:30:00",
			number: "4",
			content: "购买公司的团建活动的材料",
			status: "0",
		}, {
			start_time: "2019-04-29 13:30:00",
			end_time: "2019-04-29 15:30:00",
			number: "4",
			content: "购买公司的团建活动的材料",
			status: "1",
			approver: "从你的世界路过",
			reason: "待议",
			date: "2019-04-28 12:30:00",
		}, {
			start_time: "2019-04-29 13:30:00",
			end_time: "2019-04-29 15:30:00",
			number: "4",
			content: "购买公司的团建活动的材料",
			status: "2",
			approver: "从你的世界路过",
			vehicle_id: "苏B.12345",
			date: "2019-04-28 12:30:00",
			}],
		no_pass: [ {
			start_time: "2019-04-29 13:30:00",
			end_time: "2019-04-29 15:30:00",
			number: "4",
			content: "购买公司的团建活动的材料",
			status: "1",
			approver: "从你的世界路过",
			reason: "待议",
			date: "2019-04-28 12:30:00",
		}],
		pass: [{
			start_time: "2019-04-29 13:30:00",
			end_time: "2019-04-29 15:30:00",
			number: "4",
			content: "购买公司的团建活动的材料",
			status: "2",
			approver: "从你的世界路过",
			vehicle_id: "苏B.12345",
			date: "2019-04-28 12:30:00",
		}]
  },
  selectDispaly: function(e) {
    let _this = this;
    _this.setData({
      check: e.currentTarget.dataset.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var date = new Date(); //获取系统当前时间
    // this.setData({
    // 	time: current_time,
    // })



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

  }
})