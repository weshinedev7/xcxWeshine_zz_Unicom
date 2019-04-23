// pages/makeAnAppointment/makeAnAppointment.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		"menuTapCurrent": 0,
		open: false,

		// 下拉菜单
		first: '区域',
		second: '售价',
		thirds: '形式',
		fours: '筛选',
		_num: 0,
		_res: 0,

		// 筛选内容
		array: [{ name: '单拍' }, { name: '亲子套餐' }, { name: '活动套餐' }, { name: '女王套餐' }],
		chaoxiang: [{ name: '单拍' }, { name: '亲子套餐' }, { name: '活动套餐' }, { name: '女王套餐' }],
		louceng: [{ name: '单拍' }, { name: '亲子套餐' }, { name: '活动套餐' }, { name: '女王套餐' }],
		zhuangxiu: [{ name: '单拍' }, { name: '亲子套餐' }, { name: '活动套餐' }, { name: '女王套餐' }],
		leibei: [{ name: '单拍' }, { name: '亲子套餐' }, { name: '活动套餐' }, { name: '女王套餐' }],
		tese: [{ name: '单拍' }, { name: '亲子套餐' }, { name: '活动套餐' }, { name: '女王套餐' }],
		paixu: [{ name: '单拍' }, { name: '亲子套餐' }, { name: '活动套餐' }, { name: '女王套餐' }],
		one: 0,
		two: 0,
		third: 0,
		four: 0,
		five: 0,
		six: 0,
		seven: 0,
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

	},
	menuTap: function (e) {
		var current = e.currentTarget.dataset.current;//获取到绑定的数据
		//改变menuTapCurrent的值为当前选中的menu所绑定的数据
		this.setData({
			menuTapCurrent: current
		});
	},
	tap_ch: function (e) {
		if (this.data.open) {
			this.setData({
				open: false
			});
		} else {
			this.setData({
				open: true
			});
		}
	},
	isShow: true,
	currentTab: 0,

	// 下拉切换
	hideNav: function () {
		this.setData({
			displays: "none"
		})
	},
	// 区域
	tabNav: function (e) {
		this.setData({
			displays: "block"
		})
		this.setData({
			selected1: false,
			selected2: false,
			selected: true
		})
		if (this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {

			var showMode = e.target.dataset.current == 0;

			this.setData({
				currentTab: e.target.dataset.current,
				isShow: showMode
			})
		}
	},
	// 下拉切换中的切换
	// 区域
	selected: function (e) {
		this.setData({
			selected1: false,
			selected2: false,
			selected: true
		})
	},
	selected1: function (e) {
		this.setData({
			selected: false,
			selected2: false,
			selected1: true
		})
	},
	selected2: function (e) {
		this.setData({
			selected: false,
			selected1: false,
			selected2: true
		})
	},
	// 下拉菜单1 2 3 4
	// 区域
	clickSum: function (e) {
		console.log(e.target.dataset.num)
		this.setData({
			_sum: e.target.dataset.num
		})
		this.setData({
			first: e.target.dataset.name
		})
		this.setData({
			displays: "none"
		})
		var text = this.data.name
		console.log(text)
	},
	onLoad: function (options) {

	},
	clickMum: function (e) {
		console.log(e.target.dataset.num)
		this.setData({
			_mum: e.target.dataset.num
		})
		this.setData({
			displays: "none"
		})
		var text = this.data.name
		console.log(text)
	},
	onLoad: function (options) {

	},
	clickCum: function (e) {
		console.log(e.target.dataset.num)
		this.setData({
			_cum: e.target.dataset.num
		})
		this.setData({
			displays: "none"
		})
		var text = this.data.name
		console.log(text)
	},
	onLoad: function (options) {

	},
	// 售价
	clickNum: function (e) {
		console.log(e.target.dataset.num)
		this.setData({
			_num: e.target.dataset.num
		})
		this.setData({
			second: e.target.dataset.name
		})
		this.setData({
			displays: "none"
		})
		var text = this.data.name
		console.log(text)
	},
	onLoad: function (options) {

	},
	// 房型
	clickHouse: function (e) {
		console.log(e.target.dataset.num)
		this.setData({
			_res: e.target.dataset.num
		})
		this.setData({
			thirds: e.target.dataset.name
		})
		this.setData({
			displays: "none"
		})
	},
	onLoad: function (options) {

	},

	// 筛选
	choseTxtColor: function (e) {
		var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
		console.log(e.currentTarget.dataset.id)
		this.setData({
			one: id
		})
	},
	chaoxiang: function (e) {
		var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
		this.setData({
			two: id
		})
	},
	louceng: function (e) {
		var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
		this.setData({
			third: id
		})
	},
	zhuangxiu: function (e) {
		var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
		this.setData({
			four: id
		})
	},
	leibei: function (e) {
		var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
		this.setData({
			five: id
		})
	},
	tese: function (e) {
		var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
		this.setData({
			six: id
		})
	},
	paixu: function (e) {
		var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
		this.setData({
			seven: id
		})
	}

})