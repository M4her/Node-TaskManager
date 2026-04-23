const { generateSlug } = require("../helpers/utils");
const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const slug = generateSlug(title)
    const project = await projectSchema({
      title,
      description,
      slug,
      author: req.user._id,
    });
    project.save();

    res.status(200).send({message: "Project Created Successfully"})
  } catch (error) {
    console.log(error)
  }
};

module.exports = { createProject };
