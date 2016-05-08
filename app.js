var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var mongoose = require('mongoose')

mongoose.connect('mongodb://root:1234@jello.modulusmongo.net:27017/tu7byxUx')
var Schema = mongoose.Schema
var thingSchema = new Schema({}, { strict: false })
var Product = mongoose.model('products', thingSchema)

app.use(express.static('public'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/data', function (req, res) {
  Product.find(function (err, data) {
    if (err === null) res.send(data)
    else res.sendStatus(400)
  })
})

app.get('/data/:_id', jsonParser, function (req, res) {
  Product.find(req.params, function (err, data) {
    if (err) return console.error(err)
    res.send(data)
  })
})

app.post('/data', jsonParser, function (req, res) {
  var insert = new Product(req.body)
  insert.save(function (err) {
    if (err) {
      console.log(err)
    }
    res.send('success')
  })
})

app.put('/data', jsonParser, function (req, res) {
  var index = {_id: req.body._id}
  var newdata = {code: req.body.code, name: req.body.name, price: req.body.price}
  Product.update(index, {$set: newdata}, function (err) {
    if (err) {
      console.log(err)
    }
    res.send('success')
  })
})

app.delete('/data/:_id', jsonParser, function (req, res) {
  Product.remove(req.params, function (err) {
    if (err) {
      console.log(err)
    }
    res.send('success')
  })
})

var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function () {
  console.log('App listening at http://%s:%s', server.address().address,
    server.address().port)
  console.log('Press Ctrl+C to quit.')
})
