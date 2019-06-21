var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    imglist: [],
    thumbnail: [],
    originUrl: '',
    goodsPic: [],
		cateId:0,
    id: '',
    type: 1,
    food: [],
		appointment:0,

    // 分类数据
    category: '',
    category_index: '',
  },
  category: function(e) {
    this.setData({
      cateId: this.data.category[e.detail.value].id
    })
    var cateId = this.data.category[e.detail.value].id
    console.log(cateId)
    this.setData({
      category_index: e.detail.value,
    })
  },
  onLoad: function(options) {

    if (options.id != null) {
      this.setData({
        id: options.id
      })
    }
  },
  onShow: function() {
    let _this = this;
    if (_this.data.id == 0) {
      // 分类搜索
      util.ajax({
        url: app.globalData.path + 'ApiCategory/index',
        method: 'GET',
        data: {
          store_id: wx.getStorageSync('storeInfo').store_id
        },
        success: function(res) {
          //成功
          if (res.data.code == 0) {
            _this.setData({
              category: res.data.data,
            });
          }
        }
      });
    } else {
      // 按条件查询数据
      util.ajax({
        url: app.globalData.path + 'ApiStore/add',
        method: 'GET',
        data: {
          id: _this.data.id,
          store_id: wx.getStorageSync('storeInfo').store_id
        },
        success: function(res) {
          //成功
          _this.data.thumbnail.push(res.data.data.img);
          if (res.data.code == 0) {
            _this.setData({
							food: res.data.data,
							appointment: res.data.data.appointment,
              thumbnail: _this.data.thumbnail,
              imglist: res.data.imgs,
              type: res.data.data.type,
              category: res.data.category,
            });

            // 分类
            if (_this.data.food.category_id != 0) {
              var arr = [];
              var arr1 = 0;
              _this.data.category.forEach(function(item) {
                arr.push(item.id)
              })
              var food = _this.data.food;
              var category_id = food.category_id;

              arr.forEach(function(item, index) {
                if (item == category_id) {
                  arr1 = index
                }
              })
              _this.setData({
                category_index: arr1,
								cateId: _this.data.food.category_id
              })
            }
          }

        }

      });
    }
  },
  // 缩略图
  upload_thumbnail: function() {
    this.upload(2, 1)
  },
  // 展示图片
  upload_file: function() {
    var num = 3 - Number(this.data.imglist.length);
    this.upload(1, num)
  },
  //菜名
  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //价格
  price: function(e) {
    this.setData({
      price: e.detail.value
    })
  },
  originPrice: function(e) {
    this.setData({
      originPrice: e.detail.value
    })
  },
  //菜品详情
  brief: function(e) {
    this.setData({
      brief: e.detail.value
    })
  },
  // 文件上传
  upload: function(status, num) {
    var _this = this;

    // 选择文件
    wx.chooseImage({
      count: num, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if (res.tempFilePaths) {

          if (status == 1) {
            for (var i = 0; i < res.tempFilePaths.length; i++) {
              _this.upload_img(res.tempFilePaths[i], status)
            }
          } else {
            _this.upload_img(res.tempFilePaths[0], status)
          }
        }
      }
    })

  },
  getCropperImg(e) {
    this.upimgAjax(e.detail.url, 2)
    this.setData({
      originUrl: ''
    })
  },
  // 上传文件
  upload_img: function(url, status) {
    var ajaxurl = status == 1 ? 'ApiStore/multipleFiles' : 'ApiStore/singleFile';
    var _this = this;

    wx.uploadFile({
      url: app.globalData.path + ajaxurl,
      filePath: url,
      formData: {},
      name: 'file',
      success: function(res) {
        var json = JSON.parse(res.data);
        if (status == 1) {
          _this.data.goodsPic.push(json.file_name);
          _this.setData({
            imglist: _this.data.goodsPic
          })
        } else {
          _this.setData({
            thumbnail: json.file_name
          })
        }
      }
    })

  },
  formsubmit: function(e) {
    var _this = this;
    if (e.detail.value.name == '') {
      return _this.alertMethod('请填写菜品名称');
    }
    if (e.detail.value.price == '') {
      return _this.alertMethod('请填写菜品价格');
    }
    if (_this.data.cateId == 0) {
      return _this.alertMethod('请选择菜品分类');
    }
    if (e.detail.value.originPrice == '') {
      return _this.alertMethod('请填写菜品原价格');
    }
    if (e.detail.value.brief == '') {
      return _this.alertMethod('请填写菜品详情');
    }
    if (_this.data.imglist == '') {
      return _this.alertMethod('请选择菜品展示图片');
    }
    if (_this.data.thumbnail == '') {
      return _this.alertMethod('请选择菜品缩略图');
    }
		console.log(_this.data.cateId)
    // 数据上传
    util.ajax({
      url: app.globalData.path + 'ApiStore/save',
      method: 'POST',
      data: {
        id: _this.data.id,
        name: e.detail.value.name,
        price: e.detail.value.price,
        store_id: wx.getStorageSync('storeInfo').store_id,
        type: e.detail.value.type,
        original_price: e.detail.value.original_price,
        brief: e.detail.value.brief,
        imglist: _this.data.imglist,
        appointment: e.detail.value.appointment,
        thumbnail: _this.data.thumbnail,
        cateId: _this.data.cateId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {

        if (res.data.code === 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          setTimeout(function() {
            wx.navigateBack({
              delta: 2
            })
          }, 500)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true
          });
        }
      }
    })
  },
  // 点击删除图片
  deleteImg(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          let imglist = that.data.imglist;
          let index = e.currentTarget.dataset.index;
          imglist.splice(index, 1);
          that.setData({
            imglist: imglist
          });
        }
      }
    })

  },
  // 点击放大
  previewImage: function(e) {
    var that = this;
    //获取当前图片的下表
    var index = e.currentTarget.dataset.index;
    //数据源
    var pictures = that.data.imglist;
    wx.previewImage({
      //当前显示下表
      current: pictures[index],
      //数据源
      urls: pictures
    })
  },

  // 缩略图点击删除图片
  deleteIcon(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          that.setData({
            thumbnail: ''
          });
        }
      }
    })

  },
  // 缩略图点击放大
  previewImage1: function(e) {
    var that = this;
    //数据源
    let pictures = new Array();
    pictures.push(that.data.thumbnail);
    wx.previewImage({
      //当前显示下表
      current: pictures[0],
      //数据源
      urls: pictures
    })
  },
  alertMethod: function(text) {
    wx.showToast({
      title: text,
      icon: 'none'
    });
    return false;
  },
})