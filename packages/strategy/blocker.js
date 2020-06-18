module.exports = class Blocker {
  constructor ({
    strategyList
  }) {
    this.strategyList = strategyList || []
  }
  test (logList) {
    for (const strategy of this.strategyList) {
      if (!strategy(logList)) {
        return false
      }
    }
    return true
  }
}