export default class {
  // 属性降序
  desc(property) {
    return function (obj1, obj2) {
      var value1 = obj1[property]
      var value2 = obj2[property]
      return value2 - value1
    }
  }
// 属性升序
  asce(property) {
    return function (obj1, obj2) {
      var value1 = obj1[property]
      var value2 = obj2[property]
      return value1 - value2
    }
  }
 // 时间格式化
  timeFormat(timeString) {
    let dateTemp = new Date(Date.parse(timeString))
    let date = new Date(dateTemp.getTime() + dateTemp.getTimezoneOffset() * 60000)
    let month = date.getMonth() + 1
    let hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
    let minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
    return date.getFullYear() + '年' + month + '月' + date.getDate() + '日' + '  ' + hours + '时' + minutes + '分'
  }
  timeFormat1(timeString) {
    let dateTemp = new Date(Date.parse(timeString))
    let date = new Date(dateTemp.getTime() + dateTemp.getTimezoneOffset() * 60000)
    let time = timeString.split('T')[1]
    let month = date.getMonth() + 1
    return date.getFullYear() + '年' + month + '月' + date.getDate() + '日' + '  ' + time
  }
  // 当前时间比较
  compareTime(kstime) {
    let date = new Date(Date.parse(kstime))
    let temp = date.getTime() + date.getTimezoneOffset() * 60000
    let now = Date.now()
    if (now > temp) {
      return true
    } else if (now < temp) {
      return false
    }
  }
  oneSubject(item) {
    var that = this
    item.ifPast = that.compareTime(item.ksStartTime)
    item.ifEnd = that.compareTime(item.ksEndTime)
    item.ksEndTime = that.timeFormat(item.ksEndTime)
    item.ksStartTime = that.timeFormat(item.ksStartTime)
    return item
  }
  subject(list) {
    var that = this
    if (list === null) {
      return []
    }
    return list.filter(item => {
      item.ifPast = that.compareTime(item.ksStartTime)
      item.ifEnd = that.compareTime(item.ksEndTime)
      item.ksEndTime = that.timeFormat(item.ksEndTime)
      item.ksStartTime = that.timeFormat(item.ksStartTime)
      return item.ksConfirm === true
    })
  }
  comments(list) {
    if (list == null) {
      return []
    }
    return list.filter(item => {
      return item.kcShow === true
    })
  }
  subInfo(subject, kuId) {
    var that = this
    subject.enroll = 0
    subject.park = 0
    subject.ifPast = that.compareTime(subject.ksStartTime)
    subject.ifEnd = that.compareTime(subject.ksEndTime)
    subject.ksEndTime = that.timeFormat(subject.ksEndTime)
    subject.ksStartTime = that.timeFormat(subject.ksStartTime)
    subject.ksEnrollList.forEach(item => {
      if (item.kuId === kuId) {
        subject.enroll = item.keStatus ? 2 : 1
      }
    })
    subject.ksPartakeList.forEach(item => {
      if (item.kuId === kuId) {
        subject.park = item.kpStatus ? 2 : 1
      }
    })
    return subject
  }
  doInfo(ksUser) {
    if (ksUser.kuPhone) {
      return true
    }
    return false
  }
  checkEmpty(form, array) {
    return array.every(item => {
      return form[item] !== ''
    })
  }
}
