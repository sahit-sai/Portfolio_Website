import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  liveUrl: { type: String },
  githubUrl: { type: String },
  tags: [{ type: String }],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
