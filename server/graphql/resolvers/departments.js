const Department = require('../../models/Department')

module.exports = {
  Query: {
    fetch_departments: async () => {
      try {
        const departments = await Department.find().exec()
        if (Array.isArray(departments) && departments.length) {
          return departments
        }
      } catch (err) {
        console.log(err)
        return err
      }
    },
  },
  Mutation: {
    add_department: async (args, req) => {
      try {
        const { name } = req
        const department = await Department.create({ name })

        if (department) {
          return department
        }
      } catch (err) {
        console.log(err)
        return err
      }
    },
    edit_department: async (args, req) => {
      try {
        const { _id, name } = req
        const department = await Department.findByIdAndUpdate(
          { _id },
          { $set: { name: name } },
          { new: true },
        )

        if (department) return department
      } catch (err) {
        console.log(err)
        return err
      }
    },
  },
}
