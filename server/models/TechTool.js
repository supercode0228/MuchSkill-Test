const { Schema, model } = require('mongoose')

const techtool = {
  name: {
    type: String,
    required: true,
  },
  departments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
  ],
}

const techtoolSchema = new Schema(techtool)

module.exports = model('TechTool', techtoolSchema)
