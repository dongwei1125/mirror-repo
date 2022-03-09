const crypto = require('crypto')
const mirror = require('./mirror')
const { GITHUB_WEBHOOK_SECRET } = require('./webhook.config')

function handler(req, res, cb) {
  try {
    const sign = req.headers['x-hub-signature']
    const encrypted = encrypt(GITHUB_WEBHOOK_SECRET, req.body)
    var result = null

    if (isEqual(sign, encrypted)) {
      mirror()
    } else {
      throw new Error('X-Hub-Signature does not match body signature')
    }
  } catch (err) {
    result = err
  }

  cb(result)
}

function encrypt(secret, sign) {
  return `sha1=${crypto.createHmac('sha1', secret).update(JSON.stringify(sign)).digest('hex')}`
}

function isEqual(value = '', other = '') {
  if (value.length !== other.length) return false

  return crypto.timingSafeEqual(Buffer.from(value), Buffer.from(other))
}

module.exports = handler
