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
}
