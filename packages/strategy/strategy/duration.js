module.exports = function (options = {}) {
  const maxDuration = options.maxDuration || 3600 * 48
  const triggerSpan = options.triggerSpan || 3600 * 2
  return function (logs) {
    let latestActiveTime = null
    let activeTime = null
    for (const log of logs) {
      if (activeTime === null) {
        latestActiveTime = activeTime = log.timestamp
        continue
      }
      if (log.timestamp - latestActiveTime <= triggerSpan) {
        if (log.timestamp - activeTime > maxDuration) {
          return false
        }
        latestActiveTime = log.timestamp
      } else {
        latestActiveTime = activeTime = null
      }
    }
    return true
  }
}