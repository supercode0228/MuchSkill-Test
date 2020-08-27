import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { FormElement } from '../Common'

const TechToolFormDlg = (props) => {
  const { formData, isOpen, onToggle, onChange, onSave } = props
  const { name } = formData
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
