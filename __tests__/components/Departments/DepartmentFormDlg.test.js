import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { DepartmentFormDlg } from '../../../components/Departments'

test('renders correctly', () => {
  const formData = { name: 'Software department' }
  const isOpen = true
  const onChange = jest.fn(('name', 'formData'))
  const onToggle = jest.fn()
  const onSave = jest.fn()
  const { container } = render(
    <DepartmentFormDlg
      formData={formData}
      isOpen={isOpen}
      onChange={onChange}
      onToggle={onToggle}
      onSave={onSave}
    />,
  )
  expect(container.getElementsByClassName('modal')).toBeDefined()
})
