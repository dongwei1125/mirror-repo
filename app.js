const express = require('express')
const handler = require('./webhook-handler')
const { SUCCESS_CODE, ERRRO_CODE } = require('./const')
const app = express()
const port = 9000

app.use(express.json())

app.post('/mirror', (req, res, next) => {
  handler(req, res, err => {
    if (err) {
      next(err)
    } else {
      res.json({
        code: SUCCESS_CODE,
        msg: 'success',
        content: null,
      })
    }
  })
})

app.use((err, req, res, next) => {
  res.status(500).json({
    code: ERRRO_CODE,
    msg: 'fail',
    content: err.message,
  })
})

app.listen(port, () => {
  console.log(`Server start on http://localhost:${port}`)
})
