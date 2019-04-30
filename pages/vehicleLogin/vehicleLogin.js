Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    pwd:''
  },

  getInput:function(e){
    let item = e.currentTarget.dataset.model;
    this.setData({
      [item]:e.detail.value
    });
  },

  userLogin:function(e){
    var user=this.data.user;
    var pwd=this.data.pwd;
    if(user==='' || pwd===''){
      wx.showToast({
         title: '账号、密码不能为空',
         icon: 'none',
         duration: 2000//持续的时间
      });
    }else{
      wx.showToast({
        title: '登录成功',
        icon: 'succes',
        duration: 2000,
        mask: true
      });
      setTimeout(function () {
        wx.navigateTo({
          url: 'pages/vehicle/vehicle'
        })
      }, 3000)};
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

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

  }
})