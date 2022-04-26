import connectDB from "../../../../middleware/mongodb";
import Project from "../../../../mongooseModel/campaign";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const params = req.body;
    const allProjects = await Project.find(params);
	res.status(200).send(allProjects);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
