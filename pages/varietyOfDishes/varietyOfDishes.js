// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: 0,
    list: ['', '', '', ''],
    food: [{
        id: "1",
        icon: "/images/gbjd.jpg",
        name: "宫保鸡丁",
        details: "红而不辣、辣而不猛、香辣味浓、肉质滑脆。由于其入口鲜辣，鸡肉的鲜嫩配合花生的香脆",
        price: "99",
        original_price: "109",
        status: "0",
        sold: "100"
      },
      {
        id: "1",
        icon: "/images/mpdf.jpg",
        name: "麻婆豆腐",
        details: "麻来自花椒，辣来自辣椒，这道菜突出了川菜“麻辣”的特点。其口味独特，口感顺滑",
        price: "89",
        original_price: "99.9",
        status: "1",
        sold: "210"
      },
      {
        id: "1",
        icon: "/images/tds.jpg",
        name: "酸辣土豆丝",
        details: "色泽光亮，酸辣可口，让人口齿生津，酸辣易下饭",
        price: "25",
        original_price: "29",
        status: "0",
        sold: "99"
      },
      {
        id: "1",
        icon: "/images/szt.jpg",
        name: "红烧狮子头",
        details: "光闻起来就引动食欲，醇香味浓的肉块与汁液，超级美味",
        price: "79",
        original_price: "89",
        status: "1",
        sold: "99"
      },
      {
        id: "1",
        icon: "/images/hgr.jpg",
        name: "川香回锅肉",
        details: "制作原料主要有猪肉、青椒、蒜苗等，口味独特，色泽红亮，肥而不腻，入口浓香",
        price: "59",
        original_price: "69",
        status: "0",
        sold: "99"
      },
    ],
    food_upper: [{
        id: "1",
        icon: "/images/gbjd.jpg",
        name: "宫保鸡丁",
        details: "红而不辣、辣而不猛、香辣味浓、肉质滑脆。由于其入口鲜辣，鸡肉的鲜嫩配合花生的香脆",
        price: "99",
        original_price: "105",
        status: "0",
        sold: "100"
      },
      {
        id: "1",
        icon: "/images/tds.jpg",
        name: "酸辣土豆丝",
        details: "色泽光亮，酸辣可口，让人口齿生津，酸辣易下饭",
				price: "29",
				original_price: "33",
        status: "0",
        sold: "99"
      },
      {
        id: "1",
        icon: "/images/hgr.jpg",
        name: "川香回锅肉",
        details: "制作原料主要有猪肉、青椒、蒜苗等，口味独特，色泽红亮，肥而不腻，入口浓香",
        price: "59",
        original_price: "63",
        status: "0",
        sold: "99"
      },
    ],
    food_lower: [{
        id: "1",
        icon: "/images/mpdf.jpg",
        name: "麻婆豆腐",
        details: "麻来自花椒，辣来自辣椒，这道菜突出了川菜“麻辣”的特点。其口味独特，口感顺滑",
				price: "89",
				original_price: "92.5",
        status: "1",
        sold: "210"
      },
      {
        id: "1",
        icon: "/images/szt.jpg",
        name: "红烧狮子头",
        details: "光闻起来就引动食欲，醇香味浓的肉块与汁液，超级美味",
        price: "79",
        original_price: "89",
        status: "1",
        sold: "99"
      },
    ]
  },

  selectDispaly: function(e) {
    let _this = this;
    _this.setData({
      check: e.currentTarget.dataset.id
    });
    console.log(_this.data.check);
  },
	edit:function(){
		wx.showModal({
			title: '提示',
			content: '是否确认下架',
			success: function (res) {
				if (res.confirm) {
					wx.showToast({
						title: '已下架',
						icon: 'success',
						duration: 1000
					})
				} else if (res.cancel) {
				}
			}
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //判断是否登录
    if(wx.getStorageSync('storeInfo')===''){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000//持续的时间
      });
      setTimeout(function () {
        wx.redirectTo ({
          url: '/pages/roomLogin/roomLogin'
        })
      }, 3000)

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