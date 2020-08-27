import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../../pages'

test('renders correctly', () => {
  const { container } = render(<Home />)
  expect(container.getElementsByClassName('container')).toBeDefined()
})
