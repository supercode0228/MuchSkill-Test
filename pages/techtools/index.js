import React, { useState } from 'react'
import { ApolloConsumer, Query, Mutation } from 'react-apollo'
import { isEmpty, isNull } from 'lodash'
import { Button } from 'reactstrap'

import {
  FETCH_TECHTOOLS,
  ADD_TECHTOOL,
  EDIT_TECHTOOL,
  DELETE_TECHTOOL,
} from '../../gqls'

import { cache } from '../../apollo/cache'

import { TechToolsDataTable, TechToolFormDlg } from '../../components/TechTools'

import { ConfirmDlg } from '../../components/Common'

import styles from '../../styles/TechTool.module.css'

const TechTools = () => {
  const [dialog, setDialog] = useState({
    isOpen: false,
    formData: { name: '' },
    isEdit: false,
  })
  const [deleteDlg, setDeleteDlg] = useState({
    isOpen: false,
  })
  const [selected, setSelected] = useState({})

  let techtools = []

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
      formData: {
        ...dialog.formData,
        name: dialog.isOpen ? '' : dialog.formData.name,
      },
    })
  }

  const handleEditTechTool = (e, edit_techtool) => {
    e.preventDefault()

    const { formData } = dialog
    const params = {
      _id: selected._id,
      name: formData.name,
    }
    edit_techtool({ variables: params })
  }

  const handleAddTechTool = (e, add_techtool) => {
    e.preventDefault()

    const { formData } = dialog
    add_techtool({ variables: formData })
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
          <Query query={FETCH_TECHTOOLS}>
            {({ data, loading, error }) => {
              if (error) return false
              if (!data) return false
              techtools = data.fetch_techtools
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
          </Query>
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
                    formData={dialog.formData}
                    isOpen={dialog.isOpen}
                    onToggle={handleDlgToggle}
                    onChange={handleTextChange}
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
                    formData={dialog.formData}
                    isOpen={dialog.isOpen}
                    onToggle={handleDlgToggle}
                    onChange={handleTextChange}
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
