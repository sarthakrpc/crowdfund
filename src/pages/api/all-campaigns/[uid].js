import connectDB from "../../../../middleware/mongodb";
import Project from "../../../../mongooseModel/campaign";
import abiProject from "../../../../contractABI/projectABI.json";
import { ethers } from "ethers";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { uid } = req.query;
	const url = "http://localhost:8545";
    const project = await Project.findOne({ uid: uid.toString() });
    const projectAddress = project.projectAddress.toString();
    const provider = new ethers.providers.JsonRpcProvider(url);
    const projectContract = new ethers.Contract(
      projectAddress,
      abiProject.abi,
      provider
    );
    const projectDetails = await projectContract.getDetails();
    const currAmount = projectDetails.currentAmount.toString();
    const goalAmount = projectDetails.goalAmount.toString();
    const currEthAmount = ethers.utils.formatEther(currAmount);
    const goalEthAmt = ethers.utils.formatEther(goalAmount);
    const percentage = (currEthAmount / goalEthAmt) * 100;

    project.percentageCompleted = Math.floor(percentage);
    project.goalEthAmt = goalEthAmt;
    project.currEthAmount = currEthAmount;
	project.deadlineInt = projectDetails.deadline;

	// console.log(currEthAmount);

	res.status(200).send(project);
  }
};

export default connectDB(handler);
