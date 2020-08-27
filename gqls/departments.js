import gql from 'graphql-tag'

export const FETCH_DEPARTMENTS = gql`
  query {
    fetch_departments {
      _id
      name
    }
  }
`

export const ADD_DEPARTMENT = gql`
  mutation add_department($name: String!) {
    add_department(name: $name) {
      _id
      name
    }
  }
`

export const EDIT_DEPARTMENT = gql`
  mutation edit_department($name: String!, $_id: ID!) {
    edit_department(name: $name, _id: $_id) {
      _id
      name
    }
  }
`
