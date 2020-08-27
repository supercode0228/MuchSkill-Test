import gql from 'graphql-tag'

export const FETCH_DEPARTMENTS = gql`
  query {
    fetch_departments {
      _id
      name
    }
  }
`
