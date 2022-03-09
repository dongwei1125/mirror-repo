const path = require('path')
const { spawn } = require('child_process')
const { SRC_REPO, DIST_REPO, GITEE_USERNAME, GITEE_PASSWORD } = require('./webhook.config')

const shPath = path.join(__dirname, 'shell.sh')
const fullPath = getFullPath(DIST_REPO, GITEE_USERNAME, GITEE_PASSWORD)
const command = `${shPath} ${SRC_REPO} ${fullPath} && echo [webhook-handler] Running shell success`

function mirror() {
  const process = spawn(command, {
    shell: true,
  })

  process.stderr.on('data', data => {
    console.log(data.toString())
  })

  process.stdout.on('data', data => {
    console.log(data.toString())
  })

  process.on('exit', () => {
    console.log('[webhook-handler] Process exit')
  })

  process.on('close', () => {
    console.log('[webhook-handler] Process close')
  })

  process.on('error', () => {
    console.log('[webhook-handler] Process error')
  })
}

function getFullPath(url, username, password) {
  const index = url.indexOf('//')
  const protocol = url.slice(0, index + 2)
  const path = url.slice(index + 2)

  return `${protocol}${username}:${password}@${path}`
}

module.exports = mirror
