const { generateSlug } = require("../helpers/utils");
const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const slug = generateSlug(title);
    const project = await projectSchema({
      title,
      description,
      slug,
      author: req.user._id,
    });
    project.save();

    res.status(200).send({ message: "Project Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const projectList = async (req, res) => {
  try {
    const { search } = req.query;
    // console.log(search);

    const projects = await projectSchema.find({
      author: req.user._id,
      title: {
        $regex: search,
        $options: "i",
      },
    });
    if (!projects)
      return res.status(400).send({ message: "Project not found" });
    res.status(200).send({ projects });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};



module.exports = { createProject, projectList };
