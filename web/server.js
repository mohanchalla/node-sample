const express = require('express')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const { graphqlHTTP } = require("express-graphql")
const { schema, resolvers } = require('./schema/schema.js');
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

// this makes graphql UI to be avialable via "/graphql"
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  }));

const connectionString = 'mongodb://admin:admin@db1:27001,db2:27002,db3:27003/star-wars?authSource=admin&replicaSet=rs01&retryWrites=true&w=majority';
mongoose.connect(connectionString, { useNewUrlParser: true })
const db = mongoose.connection

db.once('open', _ => {
  console.log('Database connected')
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.get('/', (req, res) => {
  res.render('index.ejs', { })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})