import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ConfirmDlg = (props) => {
  const { isOpen, content, onToggle, onConfirm } = props
  return (
    <Modal isOpen={isOpen} toggle={onToggle}>
      <ModalHeader toggle={onToggle}>Confirm</ModalHeader>
      <ModalBody>
        <div>{content}</div>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={onConfirm}>
          Confirm
        </Button>{' '}
        <Button color="secondary" onClick={onToggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ConfirmDlg
