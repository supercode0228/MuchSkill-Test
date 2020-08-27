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
