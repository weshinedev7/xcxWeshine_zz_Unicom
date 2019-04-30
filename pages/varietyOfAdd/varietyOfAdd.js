Page({

  /**
   * 页面的初始数据
   */
  data: {
		// 状态
    items: [{
        name: '0',
        value: '上架',
        checked: "ture"
      },
      {
        name: '1',
        value: '下架'
      }
    ],
    imgs: [],
    list: '',
    upload_picture_list: [],
    // 缩略图
    source: '',
    title: "",
    price: "",
    remarks: "",
  },
	// 重置数据
  reset: function() {
    this.setData({
      title: "",
      price: "",
      title: "",
      remarks: "",
      items: [{
          name: '0',
          value: '上架',
          checked: "ture"
        },
        {
          name: '1',
          value: '下架'
        }
      ],
    })

  },
  /**
	
   * 缩略图上传图片
	
   */
  uploadimg: function() {

    var that = this;

    wx.chooseImage({ //从本地相册选择图片或使用相机拍照

      count: 1, // 默认9

      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有

      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: function(res) {

        //console.log(res)

        //前台显示

        that.setData({

          source: res.tempFilePaths

        })

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        var tempFilePaths = res.tempFilePaths

        console.log(tempFilePaths[0])
        // wx.uploadFile({

        // 	url: 'http://www.website.com/home/api/uploadimg',

        // 	filePath: tempFilePaths[0],

        // 	name: 'file',



        // 	success: function (res) {

        // 		//打印

        // 		console.log(res.data)

        // 	}

        // })



      }

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
	// 菜品图片上传
  //选择图片方法
  uploadpic: function(e) {
    let that = this //获取上下文
    let upload_picture_list = that.data.upload_picture_list
    //选择图片
    wx.chooseImage({
      count: 8, // 默认9，这里显示一次选择相册的图片数量 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        let tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        for (let i in tempFiles) {
          tempFiles[i]['upload_percent'] = 0
          tempFiles[i]['path_server'] = ''
          upload_picture_list.push(tempFiles[i])
        }
        //显示
        that.setData({
          upload_picture_list: upload_picture_list,
        });
      }
    })
  },
  //点击上传图片
  uploadimage() {
    let page = this
    let upload_picture_list = page.data.upload_picture_list
    //循环把图片上传到服务器 并显示进度       
    for (let j in upload_picture_list) {
      if (upload_picture_list[j]['upload_percent'] == 0) {

        //上传图片后端地址
        upload_file_server('https://www.x..fds.af..a.fd.sa', page, upload_picture_list, j)
      }
    }
    let imgs = wx.setStorageSync('imgs', upload_picture_list);
  },
  // 点击删除图片
  deleteImg(e) {
    let upload_picture_list = this.data.upload_picture_list;
    let index = e.currentTarget.dataset.index;
    upload_picture_list.splice(index, 1);
    this.setData({
      upload_picture_list: upload_picture_list
    });
  },
  // 预览图片
  previewImg(e) {
    //获取当前图片的下标
    let index = e.currentTarget.dataset.index;
    //所有图片
    let imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})



/**
 * 上传图片方法
 */
function upload_file_server(url, that, upload_picture_list, j) {
  //上传返回值
  const upload_task = wx.uploadFile({
    // 模拟https
    url: url, //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
    filePath: upload_picture_list[j]['path'], //上传的文件本地地址    
    name: 'file',
    formData: {
      'num': j
    },
    //附近数据，这里为路径     
    success: function(res) {
      var data = JSON.parse(res.data);
      // //字符串转化为JSON  
      if (data.Success == true) {
        var filename = data.file //存储地址 显示
        upload_picture_list[j]['path_server'] = filename
      } else {
        upload_picture_list[j]['path_server'] = filename
      }
      that.setData({
        upload_picture_list: upload_picture_list
      });
      wx.setStorageSync('imgs', upload_picture_list);
    }
  })
  //上传 进度方法
  upload_task.onProgressUpdate((res) => {
    upload_picture_list[j]['upload_percent'] = res.progress
    that.setData({
      upload_picture_list: upload_picture_list
    });
  });
}