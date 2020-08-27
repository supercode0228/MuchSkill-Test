const TechTool = require('../../models/TechTool')

module.exports = {
  Query: {
    fetch_techtools: async () => {
      try {
        const techtools = await TechTool.find().exec()
        if (Array.isArray(techtools) && techtools.length) {
          return techtools
        }
      } catch (err) {
        console.log(err)
        return err
      }
    },
  },
  Mutation: {
    add_techtool: async (args, req) => {
      try {
        const { name } = req
        const techtool = await TechTool.create({ name })

        if (techtool) {
          return techtool
        }
      } catch (err) {
        console.log(err)
        return err
      }
    },
    edit_techtool: async (args, req) => {
      try {
        const { _id, name } = req
        const techtool = await TechTool.findByIdAndUpdate(
          { _id },
          { $set: { name: name } },
          { new: true },
        )

        if (techtool) return techtool
      } catch (err) {
        console.log(err)
        return err
      }
    },
    delete_techtool: async (args, req) => {
      try {
        const _id = req._id
        const techtool = await TechTool.findByIdAndDelete({ _id })
        return techtool
      } catch (err) {
        console.log(err)
        return err
      }
    },
  },
}
