const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const ajax = obj =>{
  wx.request({
    url: obj.url,
    method: obj.method || 'POST',
    header : {
      "Content-Type": "application/json"
    },
    data: obj.data,
    success: function (res) {
      if (typeof obj.success == 'function'){
        obj.success(res)
      }
    },
    error:function(res){
      if (typeof obj.error == 'function') {
        obj.error(res)
      }
    },
    complete:function(res){
      if (typeof obj.complete == 'function') {
        obj.error(res)
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  ajax: ajax
}
