module.exports = function (options = {}) {
  const timeSpan = options.timeSpan || 60
  const requestCount = options.requestCount || 60
  const averageFrequencythreshold = timeSpan / requestCount
  return function (logs) {
    if (!logs.length) return true
    let startTime = logs[0].timestamp
    let startIndex = 0
    for(const [index, log] of logs.entries()) {
      if (index === 0) continue
      if (log.timestamp - startTime < timeSpan) continue
      if ((log.timestamp - startTime) / (index - startIndex + 1) < averageFrequencythreshold) {
        return false
      }
      if (startIndex === logs.length - 1) break
      startTime = logs[++startIndex].timestamp
    }
    return true
  }
}