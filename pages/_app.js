import App from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../apollo/withApollo'

import '../styles/globals.css'

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withApollo(MyApp)
