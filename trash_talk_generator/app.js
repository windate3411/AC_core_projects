const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const trashTalk = require('./trash_talk.js')
//載入靜態檔案
app.use(express.static('public'))

//set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//router setting

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const choice = req.body
  const trash = trashTalk.talkTrashy(choice)
  const jobTitle = req.body.jobTitle
  res.render('index', { trash, choice, jobTitle })
})

// set https sever

app.listen(3000, () => {
  console.log("you are now listening at port 3000");
})