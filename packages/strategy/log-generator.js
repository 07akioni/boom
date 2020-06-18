const { Log } = require('./log')

module.exports = function generate (options = {}) {
  const length = options.length === undefined ? 500 : options.length
  const interval =  options.interval === undefined ? 1 : options.interval
  const intervalDelta =  options.intervalDelta === undefined ? 1 : options.intervalDelta
  let acc = 0
  return Array.apply(null, { length })
    .map(v => {
      const timestamp = Number((acc + Math.random() * intervalDelta * 2).toFixed(2))
      acc += interval
      return timestamp
    })
    .map(v => new Log({
      timestamp: v
    }))
}