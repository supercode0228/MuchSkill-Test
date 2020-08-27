import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { FormElement } from '../Common'

const TechToolFormDlg = (props) => {
  const {
    formData,
    departments,
    isOpen,
    onToggle,
    onChange,
    onSelect,
    onSave,
  } = props
  const { name, department } = formData

  const options = departments.map((item) => {
    return { label: item.name, value: item._id }
  })

  return (
    <Modal isOpen={isOpen} toggle={onToggle}>
      <ModalHeader toggle={onToggle}>TechTool</ModalHeader>
      <ModalBody>
        <form>
          <FormElement
            required
            property="name"
            title="Name"
            placeholder="Enter the name..."
            onChange={onChange}
            value={name}
          />
          <FormElement
            type="select"
            required
            property="department"
            title="Department"
            placeholder="Select Department..."
            options={options}
            onChange={onSelect}
            value={department}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>{' '}
        <Button color="secondary" onClick={onToggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default TechToolFormDlg
