import connectDB from "../../../../middleware/mongodb";
import Project from "../../../../mongooseModel/campaign";
import abiProject from "../../../../contractABI/projectABI.json";
import { ethers } from "ethers";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const url = "https://matic-mumbai.chainstacklabs.com";
    const projectAddress = req.body.projectAddress;
    const provider = new ethers.providers.JsonRpcProvider(url);

    const projectContract = new ethers.Contract(
      projectAddress,
      abiProject.abi,
      provider
    );

    const projectDetails = await projectContract.getDetails();

	const project = new Project({
		projectStarter: projectDetails.projectStarter.toLowerCase(),
		projectAddress,
		uid: projectDetails.uniqueIdentifier,
		title: req.body.title,
		description: req.body.description,
		amount: projectDetails.goalAmount.toString(),
		deadlineInt: projectDetails.deadline,
		coverImage: req.body.coverImage,
		images: req.body.images,
		ytLink: req.body.link,
	})
	let projectCreated = await project.save()
	
    res.status(200).send(projectCreated);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
