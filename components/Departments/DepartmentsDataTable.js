import React from 'react'
import { DataTable } from '../Common'

const DepartmentsDataTable = (props) => {
  const { data, onEditDlg, onDeleteDlg } = props
  const columns = ['Name']
  const actions = [
    { classname: 'button btn-blue', name: 'Edit', function: onEditDlg },
    { classname: 'button btn-red', name: 'Delete', function: onDeleteDlg },
  ]
  return <DataTable columns={columns} data={data} actions={actions} />
}

export default DepartmentsDataTable
