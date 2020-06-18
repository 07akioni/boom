module.exports = function (options = {}) {
  const deltaThreshold = options.deltaThreshold || 1
  const requestCount = options.requestCount || 200
    return function (logs) {
    const logQueue = []
    for (const log of logs) {
      if (logQueue.length < requestCount) {
        logQueue.push(log)
      }
      if (logQueue.length >= requestCount) {
        const startTime = logQueue[0].timestamp
        const averageInterval = (logQueue[logQueue.length - 1].timestamp - startTime) / (requestCount - 1)
        const intervalDeltaList = logQueue.map((v, i) => i && (Math.abs(v.timestamp - averageInterval - logQueue[i - 1].timestamp))).slice(1)
        if (!intervalDeltaList.some(v => v > deltaThreshold)) return false
        logQueue.shift()
      }
    }
    return true
  }
}