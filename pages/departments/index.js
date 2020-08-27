import React from 'react'
import { Button } from 'reactstrap'

import styles from '../../styles/Department.module.css'

const Departments = () => {
  return (
    <div className="container">
      <div className={styles.department__header}>
        <h3>Departments</h3>
        <Button className="button btn-black">Add</Button>
      </div>
    </div>
  )
}

export default Departments
