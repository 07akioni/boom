const fs = require('fs')
const path = require('path')
const moment = require('moment')

const data = []

const logLiteral = fs.readFileSync(
  path.resolve(__dirname, 'meituan1.log')
).toString()

// 2020-04-16 14:07:28 [ID]:60-6C-66-C6-E5-58 [IP]:192.168.3.84 [HTTP] :GET [INFO ]: shopId = 1004743855数据处理结束

logLiteral.split('\n').forEach(
  line => {
    line = line.trim()
    if (!line.length) return
    if (line.includes('[ERROR]')) return
    if (!line.includes('[ID]')) return
    let [timestamp, rest] = line.split('[ID]:')
    timestamp = moment(timestamp.trim(), 'YYYY-MM-DD hh:mm:ss').valueOf()
    rest = rest.trim()
    let id
    [id, rest] = rest.split('[IP]:')
    id = id.trim()
    rest = rest.trim()
    let ip
    [ip, rest] = rest.split('[HTTP] :')
    ip = ip.trim()
    rest = rest.trim()
    let method
    [method, rest] = rest.split('[INFO ]:')
    method = method.trim()
    rest = rest.trim()
    let info = rest
    if (info.includes('出错')) return
    if (!(info.startsWith('开始执行') || info.startsWith('shopId'))) return
    data.push({
      service: '美团',
      timestamp,
      machineId: id,
      ip,
      accountId: '',
      method,
      path: '',
      payload: '',
      response: info,
    })
  }
)

fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(data, 0, 2))
// data.slice(0, 20).forEach(entity => console.log(entity))