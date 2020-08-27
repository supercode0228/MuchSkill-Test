const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    fetch_techtools: [TechTool]
  }

  extend type Mutation {
    add_techtool(name: String!, departments: [ID!]): TechTool
    edit_techtool(name: String!, departments: [ID!], _id: ID!): TechTool
    delete_techtool(_id: ID!): TechTool
  }

  type TechTool {
    _id: ID!
    name: String!
    departments: [TechToolDepartment]
  }

  type TechToolDepartment {
    _id: ID!
    name: String!
  }
`
