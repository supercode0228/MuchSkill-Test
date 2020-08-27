import React, { useState } from 'react'
import { ApolloConsumer, Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { isEmpty } from 'lodash'
import { Button } from 'reactstrap'

import {
  FETCH_TECHTOOLS,
  ADD_TECHTOOL,
  EDIT_TECHTOOL,
  DELETE_TECHTOOL,
  FETCH_DEPARTMENTS,
} from '../../gqls'

import { cache } from '../../apollo/cache'

import { TechToolsDataTable, TechToolFormDlg } from '../../components/TechTools'

import { ConfirmDlg } from '../../components/Common'

import styles from '../../styles/TechTool.module.css'

const TechTools = () => {
  const Composed = adopt({
    techtoolsQuery: ({ render }) => (
      <Query query={FETCH_TECHTOOLS}>{render}</Query>
    ),
    departmentsQuery: ({ render }) => (
      <Query query={FETCH_DEPARTMENTS}>{render}</Query>
    ),
  })

  const [dialog, setDialog] = useState({
    isOpen: false,
    formData: { name: '', department: '' },
    isEdit: false,
  })
  const [deleteDlg, setDeleteDlg] = useState({
    isOpen: false,
  })
  const [selected, setSelected] = useState({})

  let techtools = [],
    departments = []

  const handleTextChange = (e) => {
    const key = e.target.name
    const value = e.target.value

    const data = { ...dialog, formData: { ...dialog.formData, [key]: value } }
    setDialog(data)
  }

  const handleSelect = (name, selectedOptions) => {
    const data = {
      ...dialog,
      formData: { ...dialog.formData, [name]: selectedOptions },
    }
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
    const department = item.departments.map((dep) => {
      return { label: dep.name, value: dep._id }
    })
    setDialog({
      ...dialog,
      isEdit: item ? true : false,
      isOpen: !dialog.isOpen,
      formData: {
        ...dialog.formData,
        name: item.name,
        department,
      },
    })
    item && setSelected(item)
  }

  const handleDlgToggle = () => {
    setDialog({
      ...dialog,
      isEdit: false,
      isOpen: !dialog.isOpen,
      formData: {
        ...dialog.formData,
        name: dialog.isOpen ? '' : dialog.formData.name,
        department: dialog.isOpen ? '' : dialog.formData.department,
      },
    })
  }

  const handleEditTechTool = (e, edit_techtool) => {
    e.preventDefault()

    const { formData } = dialog
    const _id = selected._id
    const name = formData.name
    const departments = formData.department.map((item) => item.value)
    const params = {
      _id,
      name,
      departments,
    }
    edit_techtool({ variables: params })
  }

  const handleAddTechTool = (e, add_techtool) => {
    e.preventDefault()

    const { formData } = dialog
    const name = formData.name
    const departments = formData.department.map((item) => item.value)
    const params = {
      name,
      departments,
    }
    add_techtool({ variables: params })
  }

  const handleDeleteTechTool = (e, delete_techtool) => {
    e.preventDefault()

    const _id = selected._id
    delete_techtool({ variables: { _id } })
  }

  return (
    <div className="container">
      <div className={styles.techtool__header}>
        <h3>TechTools</h3>
        <Button className="button btn-black" onClick={handleDlgToggle}>
          Add
        </Button>
      </div>
      <ApolloConsumer>
        {(client) => (
          <Composed>
            {({ techtoolsQuery, departmentsQuery }) => {
              if (techtoolsQuery.error || departmentsQuery.error) return false
              if (!techtoolsQuery.data || !departmentsQuery.data) return false
              techtools = techtoolsQuery.data.fetch_techtools
              departments = departmentsQuery.data.fetch_departments
              return (
                techtools && (
                  <TechToolsDataTable
                    data={techtools}
                    onDeleteDlg={handleDeleteDlgOpen}
                    onEditDlg={handleDlgOpen}
                  />
                )
              )
            }}
          </Composed>
        )}
      </ApolloConsumer>
      {dialog.isEdit ? (
        <ApolloConsumer>
          {(client) => (
            <Mutation
              mutation={EDIT_TECHTOOL}
              onCompleted={(data) => {
                if (isEmpty(data)) return false
                const index = techtools.indexOf(selected)
                techtools[index] = data.edit_techtool
                cache.writeData({
                  data: {
                    fetch_techtools: techtools,
                  },
                })
                handleDlgToggle()
              }}
            >
              {(edit_techtool, { loading, error }) => {
                if (error) return error
                return (
                  <TechToolFormDlg
                    departments={departments}
                    formData={dialog.formData}
                    isOpen={dialog.isOpen}
                    onToggle={handleDlgToggle}
                    onChange={handleTextChange}
                    onSelect={handleSelect}
                    onSave={(e) => handleEditTechTool(e, edit_techtool)}
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
              mutation={ADD_TECHTOOL}
              onCompleted={(data) => {
                if (!data) return false
                techtools.push(data.add_techtool)
                cache.writeData({
                  data: {
                    fetch_techtools: techtools,
                  },
                })
                handleDlgToggle()
              }}
            >
              {(add_techtool, { loading, error }) => {
                if (error) return error
                return (
                  <TechToolFormDlg
                    departments={departments}
                    formData={dialog.formData}
                    isOpen={dialog.isOpen}
                    onToggle={handleDlgToggle}
                    onChange={handleTextChange}
                    onSelect={handleSelect}
                    onSave={(e) => handleAddTechTool(e, add_techtool)}
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
            mutation={DELETE_TECHTOOL}
            onCompleted={(data) => {
              if (isEmpty(data)) return false
              const index = techtools.indexOf(data.delete_techtool)
              techtools.splice(index, 1)
              cache.writeData({
                data: {
                  fetch_techtools: techtools,
                },
              })
              handleDeleteDlgToggle()
            }}
          >
            {(delete_techtool, { loading, error }) => {
              if (error) return error
              return (
                <ConfirmDlg
                  isOpen={deleteDlg.isOpen}
                  content="Do you really delete this techtool?"
                  onToggle={handleDeleteDlgToggle}
                  onConfirm={(e) => handleDeleteTechTool(e, delete_techtool)}
                />
              )
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    </div>
  )
}

export default TechTools
