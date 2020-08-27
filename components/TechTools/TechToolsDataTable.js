import React from 'react'
import { DataTable } from '../Common'

const TechToolsDataTable = (props) => {
  const { data, onEditDlg, onDeleteDlg } = props
  const columns = ['Name', 'Departments']
  const actions = [
    { classname: 'button btn-blue', name: 'Edit', function: onEditDlg },
    { classname: 'button btn-red', name: 'Delete', function: onDeleteDlg },
  ]
  const updated = data.map((item) => {
    let departmentNames = ''
    item.departments.forEach((dep, index) => {
      departmentNames += dep.name
      if (index < item.departments.length - 1) departmentNames += ','
    })
    item.departmentNames = departmentNames
    return item
  })
  return <DataTable columns={columns} data={updated} actions={actions} />
}

export default TechToolsDataTable
