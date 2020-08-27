const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    fetch_departments: [Department]
  }

  extend type Mutation {
    add_department(name: String!): Department
    edit_department(name: String!, _id: ID!): Department
    delete_department(_id: ID!): Department
  }

  type Department {
    _id: ID!
    name: String!
  }
`
