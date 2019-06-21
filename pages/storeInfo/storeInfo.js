var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    selected1: true,
    toastHidden: true,
    changeHidden: true,
    toView: 'order1',
		carArray: [],
		yyArray: [],
		totalCount: 0,
		totalPrice: 0,
		totalCount_yy: 0,
		totalPrice_yy: 0,
    typeRest: true,
    color: '#dd2727',
    catalogSelect: 0,
    showModal1: false,
    pjModel: true,
    queryTime: [],
    loginType: true,
    pageScrollToNum: 0,
    types: 1,

    // 评论
    list: [],
    len: null,
    openof: 1,
    page: 1,


		showDialog: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    _this.setData({
			store_id: options.id
    });

		_this.appointment()
    //获取店铺信息
    util.ajax({
      url: app.globalData.path + 'ApiFoods/getStore',
      data: {
        id: _this.data.store_id
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 0) {
          _this.setData({
            store: res.data.data,
            score: res.data.score,
            count: res.data.count
          });
        }
      }
    })

    //获取门店下的分类，分类下的对应菜品
    util.ajax({
      url: app.globalData.path + 'ApiFoods/getCateAndFoods',
      data: {
        store_id: _this.data.store_id
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 0) {
          var arr = [];
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].foods.forEach(function(item, index) {
              item.one = 0;
              item.parentIndex = i;
              item.index = index;
            })
          }
          _this.setData({
            cate_foods: res.data.data
          });
					if(_this.data.cate_foods.length === 0){
						_this.toggleDialog()
					}
        }
      }
    })

  },
  ycgg: function() {
    this.setData({
      showModal: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        let windowHeight = res.windowHeight; // 可使用屏幕高度（px）
        let windowWidth = res.windowWidth; // 可使用屏幕宽度（px）
        let scrollHeight = windowHeight - 100 * windowWidth / 750;
        that.setData({
          scrollHeight
        });
      }
    });
  },

  selectMenu: function(e) {
    let index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: 'order' + index.toString(),
      catalogSelect: e.currentTarget.dataset.itemIndex,
      parentIndex: index
    });

  },
  //选择取餐方式
  radioChange: function(e) {
		
    this.setData({
      types: e.detail.value
    });
  },
  go: function() {
    if (!this.data.types) {
      this.setData({
        types: 1
      });
    }
    this.setData({
      showModal1: false
    });
  },
  //——————————————点击加号——————添加到购物车
  addCart: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.itemIndex;
    var info = e.currentTarget.dataset.info;
    var parentIndex = e.currentTarget.dataset.parent;
    //保存下标
    this.setData({
      index: index,
      parentIndex: parentIndex
    })
    that.addOrderNumber();
  },
  //选好了
  xhl: function(e) {
    this.data.dishes[this.data.parentIndex].goodsList[this.data.index].one += 1;
    this.data.carArray.push(this.data.dishes[this.data.parentIndex].goodsList[this.data.index]);
    this.setData({
      dishes: this.data.dishes,
      carArray: this.data.carArray
    });
    this.setData({
      showModal: false
    })
    this.getGwcNumber();
  },
	// 加数量
  addOrderNumber: function() {
    this.data.cate_foods[this.data.parentIndex].foods[this.data.index].one += 1;
    this.setData({
      cate_foods: this.data.cate_foods
    });
    this.getAttributePrice();
    this.getGwcNumber();
  },
  //减少数量
  decreaseCart: function(e) {
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parent;
    var types = e.currentTarget.dataset.type;
    if (this.data.cate_foods[parentIndex].foods[index].one > 0) {
      this.data.cate_foods[parentIndex].foods[index].one -= 1;
      this.setData({
        cate_foods: this.data.cate_foods
      });
      this.setDelectOrderNumner(parentIndex, index);
      this.getGwcNumber();
    }

  },
  //增加数量并改变购物车数量
  getAttributePrice: function() {
    var flag = false
    var id = this.data.cate_foods[this.data.parentIndex].foods[this.data.index].id;
    for (var i = 0; i < this.data.carArray.length; i++) {
      if (this.data.carArray[i].id == id) {
        this.data.carArray[i].one += 1;
        flag = true;
        break;
      }
    }

    if (!flag) {
      this.data.carArray.push(this.data.cate_foods[this.data.parentIndex].foods[this.data.index]);
    }

    this.setData({
      carArray: this.data.carArray
    })
  },

  //减少数量
  setDelectOrderNumner: function(parentIndex, index) {
    var id = this.data.cate_foods[parentIndex].foods[index].id;
    var index;
    for (var i = 0; i < this.data.carArray.length; i++) {
      if (this.data.carArray[i].id == id) {
        index = i;
        break;
      }
    }
    if (this.data.carArray[index].one <= 1) {
      this.data.carArray.splice(index, 1);
    } else {
      this.data.carArray[index].one -= 1;
    }
    this.setData({
      carArray: this.data.carArray
    })
  },

  //统计购物车数量
  getGwcNumber: function() {
    var num = 0;
    var total = 0;
    var select = [];
    this.data.carArray.forEach(function(item) {
      var price = 0;
      if (item.one > 0) {
        num += parseInt(item.one)
        price += parseFloat(item.price * item.one);
        item.totalPrice = price.toFixed(2)
        total += price;
      }
    })
    var num1 = total.toFixed(2)
    this.setData({
      totalCount: num,
      totalPrice: total.toFixed(2),
      carArray: this.data.carArray,
      czNumberInfo: num1
    });
  },
  manjianMethod: function() {
    var newArr = this.bubbleSort(this.data.newList);
    var manNum = [];
    for (var i = 0; i < newArr.length; i++) {
      if (Number(newArr[i].destAmount) > Number(this.data.totalPrice)) {
        manNum.push(newArr[i]);
      }
    }
    this.setData({
      manjianNum: (Number(manNum[0].destAmount) - Number(this.data.totalPrice)).toFixed(2),
      manjianMoney: manNum[0].discountAmount,
      manjianTotal: manNum[0].destAmount
    })
  },
  //冒泡排序
  bubbleSort: function(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (parseFloat(arr[i].destAmount) > parseFloat(arr[j].destAmount)) { //如果前面的数据比后面的大就交换  
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  },
  // ————————————————————底部弹框——————————————————————
  //购物车弹框
  change: function(e) {
    this.setData({
      changeHidden: true
    })
  },
  toastChange: function(e) {
    this.setData({
      toastHidden: true
    })
  },
  change1: function(e) {
    this.setData({
      changeHidden: false
    })
  },

  //购物车加减
  addShopCart: function(e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parent;
    var meindex = e.currentTarget.dataset.meindex;
    this.data.cate_foods[parentIndex].foods[index].one += 1;
    this.data.carArray[meindex].one += 1;
    this.setData({
      cate_foods: this.data.cate_foods,
      carArray: this.data.carArray
    });
    this.getGwcNumber();
  },

  //购物车做减法
  decreaseShopCart: function(e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parent;
    var meindex = e.currentTarget.dataset.meindex;
    this.data.cate_foods[parentIndex].foods[index].one -= 1;
    if (this.data.carArray[meindex].one <= 1) {
      this.data.carArray.splice(meindex, 1);
    } else {
      this.data.carArray[meindex].one -= 1;
    }

    this.setData({
      cate_foods: this.data.cate_foods,
      carArray: this.data.carArray
    });
    this.getGwcNumber();
  },

  //不同规格的删除购物车
  delectOrder: function(e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parent;
    var meindex = e.currentTarget.dataset.meindex;
    this.data.cate_foods[parentIndex].foods[index].one -= 1;
    this.data.carArray.splice(meindex, 1);
    this.setData({
      cate_foods: this.data.cate_foods,
      carArray: this.data.carArray
    });
    this.getGwcNumber();
  },

  //下单
  pay: function() {
    var that = this;
    wx.setStorageSync('orderInfo', this.data.carArray)
    wx.setStorageSync('totalPic', this.data.totalCount)
    wx.setStorageSync('totalPrice', this.data.totalPrice)
    if (this.data.carArray == '') {
      wx.showToast({
        title: '请选择菜品',
        icon: 'none',
        duration: 2000 //持续的时间
      });
    } else {
      wx.navigateTo({
				url: '/pages/sureOrder/sureOrder?store_id=' + that.data.store_id + '&type=1'
      })
    }
    // if (this.data.types == 1) {
    //   wx.navigateTo({
    //     url: '../pay1/pay1?id=' + that.data.busid
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '../pay/pay?id=' + that.data.busid
    //   })
    // }

  },
  //清空购物车
  clear: function() {
    for (var i = 0; i < this.data.cate_foods.length; i++) {
      this.data.cate_foods[i].foods.forEach(function(item) {
        item.one = 0;
      })
    }

    this.setData({
      cate_foods: this.data.cate_foods,
      carArray: []
    })
    this.getGwcNumber()
  },

  closePjModel: function() {
    this.setData({
      pjModel: true
    })
  },
  clickImage: function(e) {
    var id = e.currentTarget.dataset.info;
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.info
    })
  },
  onShareAppMessage: function(res) {
    var that = this;
    return {
      title: that.data.businessInfo.name,
      path: 'pages/info/info?id=' + that.data.busid,
      imageUrl: that.data.businessInfo.merchantPic
    }
  },

  gotoHome: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  //点击切换
  clickTab: function(e) {
    var _this = this;
    if (_this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      _this.setData({
        currentTab: e.target.dataset.current
      })

    }
    if (_this.data.currentTab == 2) {
      _this.onloadMethod()
    }
  },
  //滑动加载  评分
  onloadMethod: function() {
    let that = this

    if (that.data.len == 0) return false;
    if (that.data.openof != that.data.page) return false;
    that.data.openof++;
    this.setData({
      openof: that.data.openof
    })
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    //调接口
    util.ajax({
      url: app.globalData.path + 'ApiStore/storeComment',
      method: 'GET',
      data: {
        storeId: that.data.store_id,
        pageSize: 10, //每页展示的数据条数
        page: that.data.page //当前页码（从1开始）
      },
      success: function(res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading() //完成停止加载
        if (res.data.code == 0) {
          res.data.data.forEach(function(item) {
            that.data.list.push(item)
          })
					that.data.page++;
          that.setData({
            len: res.data.data.length,
            page: that.data.page,
            openof: that.data.page,
            comment: that.data.list,
          })

        }
      },
      complete: function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
    })
  },
  onShow: function() {
		let _this = this;
		_this.setData({
			list: [],
			len: null,
			openof: 1,
			page: 1,
		})
		_this.appointment()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.onloadMethod();
  },
  // 预约菜品
  appointment: function() {
    var _this = this;
    util.ajax({
      url: app.globalData.path + 'ApiFoods/appointment',
      data: {
        storeId: _this.data.store_id
      },
      method: 'GET',
      success: function(res) {
				if (res.data.code == 0) {
					var arr = [];
					for (var i = 0; i < res.data.data.length; i++) {
						res.data.data.forEach(function (item) {
							item.one = 0;
						})
					}
          _this.setData({
            foods: res.data.data,
						yyArray:_this.data.yyArray
          })
        }
      }
    })

  },
  // 预约
	// 加数量
	addFoods: function (e) {
		var that = this;
		var index = e.currentTarget.dataset.itemIndex;
		var info = e.currentTarget.dataset.info;
		//保存下标
		this.setData({
			index: index
		})
		that.addFoodsNumber();
	},
	//减数量
	decreaseCartNum: function (e) {
		var index = e.currentTarget.dataset.itemIndex;
		var types = e.currentTarget.dataset.type;
		if (this.data.foods[index].one > 0) {
			this.data.foods[index].one -= 1;
			this.setData({
				foods: this.data.foods
			});
			this.setDelectOrderNumner(index);
			this.getCartNumber();
		}
	},
	// 菜品部分数量
	addFoodsNumber: function () {
		let _this = this;
		_this.data.foods[_this.data.index].one += 1;
		_this.setData({
			foods: _this.data.foods
		});
		_this.getCartPrice();
		_this.getCartNumber();
	},
	//增加数量并改变购物车数量
	getCartPrice: function () {
		var flag = false
		var id = this.data.foods[this.data.index].id;
		for (var i = 0; i < this.data.yyArray.length; i++) {
			if (this.data.yyArray[i].id == id) {
				this.data.yyArray[i].one += 1;
				flag = true;
				break;
			}
		}
		if (!flag) {
			this.data.yyArray.push(this.data.foods[this.data.index]);
		}
		this.setData({
			yyArray: this.data.yyArray
		})
	},
	// 购物车数量
	getCartNumber: function () {
		var _this = this;
		var num = 0;
		var total = 0;
		var select = [];
		_this.data.yyArray.forEach(function (item) {
			var price = 0;
			if (item.one > 0) {
				num += parseInt(item.one)
				price += parseFloat(item.price * item.one);
				item.totalPrice = price.toFixed(2)
				total += price;
			}
		})
		var num1 = total.toFixed(2)
		_this.setData({
			totalCount_yy: num,
			totalPrice_yy: total.toFixed(2),
			yyArray: _this.data.yyArray,
			czNumberInfo: num1
		});
	},
	//下单
	appointmentPay: function () {
		var that = this;
		wx.setStorageSync('orderInfo', this.data.yyArray)
		wx.setStorageSync('totalPic', this.data.totalCount_yy)
		wx.setStorageSync('totalPrice', this.data.totalPrice_yy)
		if (this.data.yyArray == '') {
			wx.showToast({
				title: '请选择预约菜品',
				icon: 'none',
				duration: 2000 //持续的时间
			});
		} else {
			wx.navigateTo({
				url: '/pages/sureOrder/sureOrder?store_id=' + that.data.store_id+'&type=2'
			})
		}
	},
	// 清空预约购物车
	clear_yy: function () {
		for (var i = 0; i < this.data.foods.length; i++) {
			this.data.foods.forEach(function (item) {
				item.one = 0;
			})
		}

		this.setData({
			foods: this.data.foods,
			yyArray: []
		})
		this.getCartNumber()
	},
	// 无数据提示框
	toggleDialog() {
		this.setData({
			showDialog: true
		});

	},
})
