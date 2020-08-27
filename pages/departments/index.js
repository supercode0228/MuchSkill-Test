import React, { useState } from 'react'
import { ApolloConsumer, Query, Mutation } from 'react-apollo'
import { isEmpty } from 'lodash'
import { Button } from 'reactstrap'

import {
  FETCH_DEPARTMENTS,
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  DELETE_DEPARTMENT,
} from '../../gqls'

import { cache } from '../../apollo/cache'

import {
  DepartmentsDataTable,
  DepartmentFormDlg,
} from '../../components/Departments'

import { ConfirmDlg } from '../../components/Common'

import styles from '../../styles/Department.module.css'

const Departments = () => {
  const [dialog, setDialog] = useState({
    isOpen: false,
    formData: { name: '' },
    isEdit: false,
  })
  const [deleteDlg, setDeleteDlg] = useState({
    isOpen: false,
    delete_department: null,
  })
  const [selected, setSelected] = useState({})

  let departments = []

  const handleTextChange = (e) => {
    const key = e.target.name
    const value = e.target.value

    const data = { ...dialog, formData: { ...dialog.formData, [key]: value } }
    setDialog(data)
  }

  const handleDeleteDlgOpen = (item) => {
    const data = { ...deleteDlg, isOpen: !deleteDlg.isOpen }
    setDeleteDlg(data)
    item && setSelected(item)
  }

  const handleDeleteDlgToggle = () => {
    setDeleteDlg({ ...deleteDlg, isOpen: !deleteDlg.isOpen })
  }

  const handleDlgOpen = (item) => {
    setDialog({
      ...dialog,
      isEdit: item ? true : false,
      isOpen: !dialog.isOpen,
      formData: { ...dialog.formData, name: item.name },
    })
    item && setSelected(item)
  }

  const handleDlgToggle = () => {
    setDialog({
      ...dialog,
      isOpen: !dialog.isOpen,
      isEdit: false,
      formData: {
        ...dialog.formData,
        name: dialog.isOpen ? '' : dialog.formData.name,
      },
    })
  }

  const handleEditDepartment = (e, edit_department) => {
    e.preventDefault()

    const { formData } = dialog
    const params = {
      _id: selected._id,
      name: formData.name,
    }
    edit_department({ variables: params })
  }

  const handleAddDepartment = (e, add_department) => {
    e.preventDefault()

    const { formData } = dialog
    add_department({ variables: formData })
  }

  const handleDeleteDepartment = (e, delete_department) => {
    e.preventDefault()

    const _id = selected._id
    delete_department({ variables: { _id } })
  }

  return (
    <div className="container">
      <div className={styles.department__header}>
        <h3>Departments</h3>
        <Button className="button btn-black" onClick={handleDlgToggle}>
          Add
        </Button>
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
                  onDeleteDlg={handleDeleteDlgOpen}
                  onEditDlg={handleDlgOpen}
                />
              )
            }}
          </Query>
        )}
      </ApolloConsumer>
      {dialog.isEdit ? (
        <ApolloConsumer>
          {(client) => (
            <Mutation
              mutation={EDIT_DEPARTMENT}
              onCompleted={(data) => {
                if (isEmpty(data)) return false
                const index = departments.indexOf(selected)
                departments[index] = data.edit_department
                cache.writeData({
                  data: {
                    fetch_departments: departments,
                  },
                })
                handleDlgToggle()
              }}
            >
              {(edit_department, { loading, error }) => {
                if (error) return error
                return (
                  <DepartmentFormDlg
                    formData={dialog.formData}
                    isOpen={dialog.isOpen}
                    onToggle={handleDlgToggle}
                    onChange={handleTextChange}
                    onSave={(e) => handleEditDepartment(e, edit_department)}
                  />
                )
              }}
            </Mutation>
          )}
        </ApolloConsumer>
      ) : (
        <ApolloConsumer>
          {(client) => (
            <Mutation
              mutation={ADD_DEPARTMENT}
              onCompleted={(data) => {
                if (isEmpty(data)) return false
                departments.push(data.add_department)
                cache.writeData({
                  data: {
                    fetch_departments: departments,
                  },
                })
                handleDlgToggle()
              }}
            >
              {(add_department, { loading, error }) => {
                if (error) return error
                return (
                  <DepartmentFormDlg
                    formData={dialog.formData}
                    isOpen={dialog.isOpen}
                    onToggle={handleDlgToggle}
                    onChange={handleTextChange}
                    onSave={(e) => handleAddDepartment(e, add_department)}
                  />
                )
              }}
            </Mutation>
          )}
        </ApolloConsumer>
      )}
      <ApolloConsumer>
        {(client) => (
          <Mutation
            mutation={DELETE_DEPARTMENT}
            onCompleted={(data) => {
              if (isEmpty(data)) return false
              const index = departments.indexOf(data.delete_department)
              departments.splice(index, 1)
              cache.writeData({
                data: {
                  fetch_departments: departments,
                },
              })
              handleDeleteDlgToggle()
            }}
          >
            {(delete_department, { loading, error }) => {
              if (error) return error
              return (
                <ConfirmDlg
                  isOpen={deleteDlg.isOpen}
                  content="Do you really delete this department?"
                  onToggle={handleDeleteDlgToggle}
                  onConfirm={(e) =>
                    handleDeleteDepartment(e, delete_department)
                  }
                />
              )
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    </div>
  )
}

export default Departments
