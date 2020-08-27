const TechTool = require('../../models/TechTool')

module.exports = {
  Query: {
    fetch_techtools: async () => {
      try {
        const techtools = await TechTool.find().populate('departments').exec()
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
        const { name, departments } = req
        const techtool = await TechTool.create({ name, departments })
        const addedData = await TechTool.findById({ _id: techtool._id })
          .populate('departments')
          .exec()

        if (addedData) {
          return addedData
        }
      } catch (err) {
        console.log(err)
        return err
      }
    },
    edit_techtool: async (args, req) => {
      try {
        const { _id, name, departments } = req
        const techtool = await TechTool.findByIdAndUpdate(
          { _id },
          { $set: { name, departments } },
          { new: true },
        )
          .populate('departments')
          .exec()

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
          .populate('departments')
          .exec()
        return techtool
      } catch (err) {
        console.log(err)
        return err
      }
    },
  },
}
