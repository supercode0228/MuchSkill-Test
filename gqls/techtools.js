import gql from 'graphql-tag'

export const FETCH_TECHTOOLS = gql`
  query {
    fetch_techtools {
      _id
      name
      departments {
        _id
        name
      }
    }
  }
`

export const ADD_TECHTOOL = gql`
  mutation add_techtool($name: String!, $departments: [ID!]) {
    add_techtool(name: $name, departments: $departments) {
      _id
      name
      departments {
        _id
        name
      }
    }
  }
`

export const EDIT_TECHTOOL = gql`
  mutation edit_techtool($name: String!, $departments: [ID!], $_id: ID!) {
    edit_techtool(name: $name, departments: $departments, _id: $_id) {
      _id
      name
      departments {
        _id
        name
      }
    }
  }
`

export const DELETE_TECHTOOL = gql`
  mutation delete_techtool($_id: ID!) {
    delete_techtool(_id: $_id) {
      _id
      name
      departments {
        _id
        name
      }
    }
  }
`
