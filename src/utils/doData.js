export default class {
  subject(list) {
    if (list === null) {
      return []
    }
    return list.filter(item => {
      return item.ksConfirm === true
    })
  }
}
