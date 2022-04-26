const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectStarter: { type: String, required: true, trim: true },
  projectAddress: { type: String, required: true, trim: true },
  uid: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  amount: { type: String, required: true, trim: true },
  // deadline: { type: Date, required: true, trim: true },
  deadlineInt: { type: Number, required: true, trim: true },
  images: { type: [String], required: true, trim: true },
  coverImage: { type: String, required: true, trim: true },
  ytLink: { type: String, required: false, trim: true },
  percentageCompleted: { type: Number, required: false, trim: true },
  goalEthAmt: { type: Number, required: false, trim: true },
  currEthAmount: { type: Number, required: false, trim: true },
  state: { type: String, required: false, trim: true },
  stateInt: { type: Number, required: false, trim: true },
});

// const project = mongoose.model("project", projectSchema);

// const projectInstance = new Project({});

// module.exports = mongoose.models.projectSchema || mongoose.model("project", projectSchema);

mongoose.models = {};
const Project = mongoose.model("Project", projectSchema);

export default Project;
