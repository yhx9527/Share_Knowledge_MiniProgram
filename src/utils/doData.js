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
    return list.sort(this.desc)
  }
}
