export default class AppController {
  constructor(stylesObj) {
    this.stylesObj = stylesObj
  }
  classesToCssModulesFormat(classesStr) {
    const arr = classesStr.split(' ')
    let res = arr.reduce((acc, curValue) => {
      acc += `${this.stylesObj[curValue]} `
      return acc
    }, '')
    return res
  }
}
