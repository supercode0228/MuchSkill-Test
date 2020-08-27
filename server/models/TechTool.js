const { Schema, model } = require('mongoose')

const techtool = {
  name: {
    type: String,
    required: true,
  },
}

const techtoolSchema = new Schema(techtool)

module.exports = model('TechTool', techtoolSchema)
