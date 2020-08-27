require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express')
const mongoose = require('mongoose')

const dbURI = require('./config/db')
const { port } = require('./config/config')

const app = express()

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen({ port }, () => {
      console.log(`Apollo Server on http://localhost:${port}/graphql`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
