exports.Log = class Log {
  constructor ({
    serviceName,
    path,
    username,
    ip,
    timestamp,
    args
  } = {}) {
    this.serviceName = serviceName
    this.path = path,
    this.username = username
    this.ip = ip
    this.timestamp = timestamp
    this.args = args
  }
}