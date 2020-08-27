const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    fetch_departments: [Department]
  }

  type Department {
    _id: ID!
    name: String!
  }
`
