export default class {
  subject(list) {
    return list.filter(item => {
      return item.ksConfirm === true
    })
  }
}
