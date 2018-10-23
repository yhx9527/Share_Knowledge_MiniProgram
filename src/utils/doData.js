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
  checkRightNum(form, max, min, cur) {
    if (cur !== 1) {
      return true
    }
    let flag = form[max] >= form[min] && form[max] > 0
    return flag
  }
  checkRightNum1(form, max, min) {
    let flag = form[max] >= form[min] && form[max] > 0
    return flag
  }
  checkRightTime(form, start, end) {
    let date1 = new Date(Date.parse(form[start]))
    let temp1 = date1.getTime() + date1.getTimezoneOffset() * 60000
    let date2 = new Date(Date.parse(form[end]))
    let temp2 = date2.getTime() + date2.getTimezoneOffset() * 60000
    let now = Date.now() + 6 * 60 * 60000
    console.log(new Date(now).toLocaleString())
    console.log(new Date(temp1).toLocaleString())
    console.log(now, temp1, temp2)
    if (now <= temp1) {
      if (temp2 - temp1 >= 20 * 60000) {
        return 2
      }
      return 1
    }
    return 0
  }
}
