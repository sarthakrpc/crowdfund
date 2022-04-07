// const config = require("../../../config");
const mongoose = require("mongoose");

// mongoose.connect(config.db.connection);

const projectSchema = new mongoose.Schema({
  projectStarter: { type: String, required: true, trim: true },
  projectAddress: { type: String, required: true, trim: true },
  uid: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, trim: true },
  deadline: { type: Date, required: true, trim: true },
  deadlineInt: { type: Number, required: true, trim: true },
  images: { type: [String], required: true, trim: true },
  coverImage: { type: String, required: true, trim: true },
  link: { type: String, required: false, trim: true },
});

// const project = mongoose.model("project", projectSchema);

// const projectInstance = new Project({});

module.exports = mongoose.models.projectSchema || mongoose.model('project', projectSchema);