require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express')
const mongoose = require('mongoose')

const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const dbURI = require('./config/db')
const { port, clientURI } = require('./config/config')

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const corsOptions = {
  origin: clientURI,
  credentials: true,
  optionsSuccessStatus: 200,
}

server.applyMiddleware({ app, cors: corsOptions, path: '/graphql' })

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
