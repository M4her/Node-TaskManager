const { generateSlug } = require("../helpers/utils");
const authSchema = require("../models/authSchema");
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

    const projects = await projectSchema
      .find({
        $or: [
          { author: req.user._id },
          { members: req.user._id },
        ],
        title: {
          $regex: search || "", $options: "i",
        },
      })
      .populate("author", "fullName avatar");
    if (!projects)
      return res.status(400).send({ message: "Project not found" });
    res.status(200).send({ projects });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//   Add team Member
const addTeamMemberToProject = async (req, res) => {
  const { email, projectId } = req.body;
  try {
    const existEmail = await authSchema.findOne({ email });
    if (!existEmail)  return res.status(400).send({ message: "Email doesn't exist" });

    const existMembers = await projectSchema.findOne({
      $or: [
          { author: existEmail._id },
          { members: existEmail._id },
        ],
    });
    
    if (existMembers)
      return res.status(400).send({ message: "This Member Already Exist" });

    const project = await projectSchema.findOneAndUpdate(
      { _id: projectId },
      { members: existEmail._id },
      { returnDocument: "after" },
    );
    if (!project) return res.status(400).send({ message: "Invalid Request" });

    res.status(200).send({ message: "Team Member Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { createProject, projectList, addTeamMemberToProject };
