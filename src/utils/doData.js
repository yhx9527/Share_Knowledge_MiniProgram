export default class {
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
}
