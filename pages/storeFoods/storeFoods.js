var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
	data: {
		category: '',
		curNav: 0,
		num: 0,
	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var _this = this;
		_this.setData({
			store_id:options.id
	    });

		//获取店铺信息
		util.ajax({
			url:app.globalData.path + 'ApiCategory/getStore',
			data:{
				id:_this.data.store_id
			},
			method: 'POST',
			success:function(res){
				if(res.data.code==0){
					_this.setData({
						store:res.data.data
					});
				}
			}
		})
		// 获取分类
		util.ajax({
			url: app.globalData.path + 'ApiCategory/index',
			data: {
				store_id: _this.data.store_id
			},
			method: 'GET',
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					_this.setData({
						category: res.data.data,
					});
				}
			}
		})

		// 获取全部菜品   
		util.ajax({
			url: app.globalData.path + 'ApiStore/index',
			data: {
				storeId: _this.data.store_id,
				categoryId: _this.data.curNav
			},
			method: 'GET',
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					_this.setData({
						foods: res.data.data,
					});
				}
			}
		})

	},

	//事件处理函数  
	switchRightTab: function (e) {
		// 获取item项的id，和数组的下标值  
		let id = e.target.dataset.id,
			index = parseInt(e.target.dataset.index);
		// 把点击到的某一项，设为当前index  
		this.setData({
			curNav: id,
			curIndex: index
		})

		var _this = this;
		util.ajax({
			url: app.globalData.path + 'ApiStore/index',
			data: {
				storeId: _this.data.store_id,
				categoryId: id
			},
			method: 'GET',
			success: function (res) {
				//成功
				if (res.data.code == 0) {
					_this.setData({
						foods: res.data.data,
					});
				}
			}
		})
	},
	/* 加数 */
	addCount: function (e) {
		console.log("刚刚您点击了加1");
		var num = this.data.num;
		// 总数量-1  
		if (num < 1000) {
			this.data.num++;
		}
		// 将数值与状态写回  
		this.setData({
			num: this.data.num
		});
		console.log(num)
	},  
	/* 减数 */
	delCount: function (e) {
		console.log("刚刚您点击了减1");
		var num = this.data.num;
		// 商品总数量-1
		if (num > 1) {
			this.data.num--;
		}
		// 将数值与状态写回  
		this.setData({
			num: this.data.num
		});
		console.log(num)
	}, 
	// getCount: function (e) {
	// 	var num = this.data.num;
	// 	console.log(num);
	// 	wx.showToast({
	// 		title: "数量：" + num + "",
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

	}
})