Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: 0,
    make_an_appointment: [{
      title: "人事人员培训",
      start_time: "2019-04-28 13:30:00",
      end_time: "2019-04-28 15:30:00",
      number: "60",
      content: "人员信息要明确，做好人员的规划。做好公司的小助手",
      option: "茶水、鲜花",
      remarks: "请提前检查好投影仪",
      status: "0",
    }, {
      title: "人事人员第二次培训",
      start_time: "2019-04-29 13:30:00",
      end_time: "2019-04-29 15:30:00",
      number: "50",
      content: "人员信息要明确，做好人员的规划。做好公司的小助手",
      option: "茶水、鲜花、白板",
      remarks: "请提前检查好白板",
      status: "1",
      approver: "从你的世界路过",
      conference_room_name: "四楼-401室",
      date: "2019-04-28 12:30:00",
    }, {
      title: "人事人员第三次培训",
      start_time: "2019-04-30 13:30:00",
      end_time: "2019-04-30 15:30:00",
      number: "67",
      content: "人员信息要明确，做好人员的规划。做好公司的小助手",
      option: "茶水、鲜花、笔记本电脑",
      remarks: "请自带笔记本电脑",
      status: "2",
      approver: "从你的世界路过",
      reason: "等待上级决定,再确认会议时间",
      date: "2019-04-30 12:30:00",
    }],
		not_pass: [{
			title: "人事人员培训",
			start_time: "2019-04-28 13:30:00",
			end_time: "2019-04-28 15:30:00",
			number: "60",
			content: "人员信息要明确，做好人员的规划。做好公司的小助手",
			option: "茶水、鲜花",
			remarks: "请提前检查好投影仪",
			status: "0",
		},{
			title: "人事人员第三次培训",
			start_time: "2019-04-30 13:30:00",
			end_time: "2019-04-30 15:30:00",
			number: "67",
			content: "人员信息要明确，做好人员的规划。做好公司的小助手",
			option: "茶水、鲜花、笔记本电脑",
			remarks: "请自带笔记本电脑",
			status: "2",
			approver: "从你的世界路过",
			reason: "等待上级决定,再确认会议时间",
			date: "2019-04-30 12:30:00",
		}],
		pass: [{
			title: "人事人员第三次培训",
			start_time: "2019-04-30 13:30:00",
			end_time: "2019-04-30 15:30:00",
			number: "67",
			content: "人员信息要明确，做好人员的规划。做好公司的小助手",
			option: "茶水、鲜花、笔记本电脑",
			remarks: "请自带笔记本电脑",
			status: "1",
			approver: "从你的世界路过",
			reason: "等待上级决定,再确认会议时间",
			date: "2019-04-30 12:30:00",
		}],
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