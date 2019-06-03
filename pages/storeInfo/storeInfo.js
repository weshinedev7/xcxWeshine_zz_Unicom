var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected1: true,
    toastHidden: true,
    changeHidden: true,
    toView: 'order1',
    carArray: [],
    totalCount: 0,
    typeRest: true,
    color: '#dd2727',
    totalPrice: 0,
    catalogSelect: 0,
    showModal1: false,
    pjModel: true,
    queryTime: [],
    loginType: true,
    pageScrollToNum: 0,
    types: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 菜品分类使用这个方法
    // var arr = [];
    // for (var i = 0; i < data.data.result.length; i++) {
    //   data.data.result[i].goodsList.forEach(function (item, index) {
    //     item.one = 0;
    //     item.parentIndex = i;
    //     item.index = index;
    //     arr.push(item)
    //   })
    // }
    // that.setData({ dishes: data.data.result });

    var _this = this;
    _this.setData({
      store_id: options.id
    });

    //获取店铺信息
    util.ajax({
      url: app.globalData.path + 'ApiCategory/getStore',
      data: {
        id: _this.data.store_id
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 0) {
          _this.setData({
            store: res.data.data
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
    console.log('order' + index.toString());

  },
  //选择取餐方式
  radioChange: function(e) {
    console.log(e.detail.value);
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
    console.log(e.currentTarget.dataset);
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
    // 请求此菜品是否多规格
    // if (info.attributeList && info.attributeList.length > 0) {
    //   var pr = 0;
    //   for (var i = 0; i < info.attributeList.length; i++) {
    //     info.attributeList[i].attributeValueList.forEach(function(item, index) {
    //       if (index == 0) {
    //         pr += Number(item.price);
    //         item.status = true;
    //       } else {
    //         item.status = false;
    //       }
    //     })
    //   }
    //   that.data.cate_foods[parentIndex].goodsList[index].attributeList = info.attributeList;
    //   var showPri = Number(pr) + Number(that.data.dishes[parentIndex].goodsList[index].goodsPrice);
    //   that.setData({
    //     showModal: true,
    //     attributeList: info.attributeList,
    //     ggbt: info.goodsName,
    //     dishes: that.data.dishes,
    //     ggbtPrc: showPri
    //   });
    // } else {
    //   that.addOrderNumber();
    // }
  },
  //选择规格
  // xzggClick: function(e) {
  //   var that = this;
  //   var index = e.currentTarget.dataset.index;
  //   var parent = e.currentTarget.dataset.parent;
  //   var ggbtPrc = 0;
  //   this.data.attributeList[parent].attributeValueList.forEach(function(item, index) {
  //     item.status = false;
  //   });
  //   this.data.attributeList[parent].attributeValueList[index].status = true;
  //   this.setData({
  //     attributeList: this.data.attributeList
  //   });
  //   this.data.dishes[that.data.parentIndex].goodsList[that.data.index].attributeList = this.data.attributeList;
  //   this.setData({
  //     dishes: that.data.dishes
  //   });
  //   console.log('dishes', this.data.attributeList);
  //   for (var i = 0; i < this.data.attributeList.length; i++) {
  //     for (var j = 0; j < this.data.attributeList[i].attributeValueList.length; j++) {
  //       if (this.data.attributeList[i].attributeValueList[j].status) {
  //         ggbtPrc += Number(this.data.attributeList[i].attributeValueList[j].price);
  //       }
  //     }
  //   }
  //   console.log('ggbtPrc', ggbtPrc);
  //   ggbtPrc = Number(ggbtPrc) + Number(this.data.dishes[this.data.parentIndex].goodsList[this.data.index].goodsPrice)
  //   this.setData({
  //     ggbtPrc: ggbtPrc
  //   });
  // },

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
    // if (types == 1) {
    //   this.setData({
    //     changeHidden: false
    //   })
    // } else {
    //   if (this.data.cate_foods[parentIndex].foods[index].one > 0) {
    //     this.data.cate_foods[parentIndex].foods[index].one -= 1;
    //     this.setData({
    //       cate_foods: this.data.cate_foods
    //     });
    //     this.setDelectOrderNumner(parentIndex, index);
    //     this.getGwcNumber();
    //   }
    // }

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
        console.log(item);
        // if (item.attributeList.length > 0) {
        //   num += 1;
        //   price += parseFloat(item.price);
        //   for (var j = 0; j < item.attributeList.length; j++) {
        //     for (var q = 0; q < item.attributeList[j].attributeValueList.length; q++) {
        //       if (item.attributeList[j].attributeValueList[q].status) {
        //         price += parseFloat(item.attributeList[j].attributeValueList[q].price)
        //       }
        //     }
        //   }
        // } else {
        //   num += parseInt(item.one)
        //   price += parseFloat(item.price * item.one);
        // }
        num += parseInt(item.one)
        price += parseFloat(item.price * item.one);
        console.log('价格', price)
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
    //满减提示
    // if (this.data.newList.length > 0) {
    //   this.manjianMethod();
    // }
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
    console.log(this.data.cate_foods[parentIndex]);
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
    console.log('---------------');
    console.log(this.data.carArray);
    console.log(this.data.totalCount);
    console.log('---------------');
    var that = this;
    wx.setStorageSync('orderInfo', this.data.carArray)
    wx.setStorageSync('totalPic', this.data.totalCount)
    wx.setStorageSync('totalPrice', this.data.totalPrice)
    if (this.data.carArray==''){
      wx.showToast({
        title: '请选择菜品',
        icon: 'none',
        duration: 2000//持续的时间
      });
    }else{
      wx.navigateTo({
        url: '/pages/sureOrder/sureOrder?store_id=' + that.data.store_id
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
  
})