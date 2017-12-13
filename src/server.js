const express = require('express')
const app = express()

app.use(express.static('wwwroot'))

app.get('/', function (req, res) {
    res.send('Hello World!')
  })
  
  app.listen(3002, function () {
    console.log('Server started on port 3002');
  })