import connectDB from "../../../../middleware/mongodb";
import Project from "../../../../mongooseModel/campaign";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const params  = req.body;
	console.log(params);
    const allProjects = await Project.find(params);
	console.log(allProjects.length);
    res.status(200).send(allProjects);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
