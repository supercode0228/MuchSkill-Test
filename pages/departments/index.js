import React from 'react'
import { ApolloConsumer, Query } from 'react-apollo'
import { isEmpty } from 'lodash'
import { Button } from 'reactstrap'

import { FETCH_DEPARTMENTS } from '../../gqls'

import { DepartmentsDataTable } from '../../components/Departments'

import styles from '../../styles/Department.module.css'

const Departments = () => {
  let departments = []

  return (
    <div className="container">
      <div className={styles.department__header}>
        <h3>Departments</h3>
        <Button className="button btn-black">Add</Button>
      </div>
      <ApolloConsumer>
        {(client) => (
          <Query query={FETCH_DEPARTMENTS}>
            {({ data, loading, error }) => {
              if (error) return false
              if (isEmpty(data)) return false
              departments = data.fetch_departments
              return (
                <DepartmentsDataTable
                  data={departments}
                  onDeleteDlg={handleDeleteDlgToggle}
                  onEditDlg={handleDlgToggle}
                />
              )
            }}
          </Query>
        )}
      </ApolloConsumer>
    </div>
  )
}

export default Departments
