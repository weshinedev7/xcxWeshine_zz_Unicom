const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 年月日时分
const formatTime1 = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}
// 年月日
const formatTime2 = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-')
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
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
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
  ajax: ajax,
	formatTime1: formatTime1,
	formatTime2: formatTime2
}
