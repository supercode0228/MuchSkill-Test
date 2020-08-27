const { Schema, model } = require('mongoose')

const department = {
  name: {
    type: String,
    required: true,
  },
}

const departmentSchema = new Schema(department)

module.exports = model('Department', departmentSchema)
