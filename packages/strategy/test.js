const Blocker = require('./blocker')
const generate = require('./log-generator')
const intervalStrategy = require('./strategy/interval')
const intervalDeltaStrategy = require('./strategy/interval-delta')
const durationStrategy = require('./strategy/duration')

const blocker = new Blocker({
  strategyList: [
    intervalStrategy({
      timeSpan: 60,
      requestCount: 40
    }),
    intervalDeltaStrategy({
      deltaThreshold: 4,
      requestCount: 200
    }),
    durationStrategy({
      maxDuration: 3600 * 28,
      triggerSpan: 3600 * 2
    })
  ]
})

const data = require('./data.json').map(v => ({
  timestamp: v.timestamp / 1000
}))

console.log(blocker.test(data))

// console.log(blocker.test(generate({
//   length: 200,
//   interval: 20,
//   intervalDelta: 2
// })))

const options = {
  interval: 20,
  intervalDelta: 2
}

function getNewParameter (reason) {
  if (!reason) {
    return Object.assign({}, options, {
      interval: options.interval * 2,
      intervalDelta: options.intervalDelta * 2
    })
  }
}