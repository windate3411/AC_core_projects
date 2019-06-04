//載入express
const express = require('express')
const app = express()

//從func.js導入函式
const search = require('./func.js')

//讀取餐廳資料的json檔案
const restaurantList = require('./restaurant.json')

//載入express-handlebar
const exphbs = require('express-handlebars')

//將app.js的模板交由handlebar處理
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//載入靜態檔案
app.use(express.static('public'))

//設定路由
app.get('/', (req, res) => {
  res.render('index', { list: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant_detail = restaurantList.results.find(movie => movie.id.toString() === req.params.id)
  res.render('show', { list: restaurant_detail })
})

//
app.get('/search', (req, res) => {
  res.render('index', { list: search(restaurantList.results, req.query.keyword), keyword: req.query.keyword })
})

app.listen(3000, () => {
  console.log('you are now listening at port 3000')
})