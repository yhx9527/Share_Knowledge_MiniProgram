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
  subject(list) {
    if (list === null) {
      return []
    }
    return list.filter(item => {
      item.ksEndTime = item.ksEndTime.split('T').join(' ')
      item.ksStartTime = item.ksStartTime.split('T').join(' ')
      return item.ksConfirm === true
    })
  }
  comments(list) {
    if (list === null) {
      return []
    }
    return list.filter(item => {
      return item.kcShow
    })
  }
  subInfo(subject, kuId) {
    subject.enroll = 0
    subject.park = 0
    subject.ksEndTime = subject.ksEndTime.split('T').join(' ')
    subject.ksStartTime = subject.ksStartTime.split('T').join(' ')
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
