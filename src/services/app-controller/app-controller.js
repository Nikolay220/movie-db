export default class AppController {
  constructor(cssObjName) {
    this.cssObjName = cssObjName
  }
  classesToCssModulesFormat(classesStr) {
    const arr = classesStr.split(' ')
    let res = arr.reduce((acc, curValue) => {
      acc += `${this.cssObjName[curValue]} `
      return acc
    }, '')
    return res
  }
}
