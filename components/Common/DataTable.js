import React from 'react'
import { Table, Button } from 'reactstrap'

const DataTable = (props) => {
  const { columns, data, actions } = props
  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>#</th>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            {Object.keys(item).map((key) => {
              if (key !== '_id' && key !== '__typename') {
                if (typeof item[key] === 'string')
                  return <th key={item[key]}>{item[key].toString()}</th>
              }
            })}
            <th>
              {actions.map((action, index) => (
                <Button
                  key={index}
                  className={action.classname}
                  onClick={(e) => {
                    action.function(item)
                  }}
                >
                  {action.name}
                </Button>
              ))}
            </th>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default DataTable
