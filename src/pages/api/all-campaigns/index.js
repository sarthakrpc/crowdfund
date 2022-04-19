import connectDB from "../../../../middleware/mongodb";
import Project from "../../../../mongooseModel/campaign";
import abiProject from "../../../../contractABI/projectABI.json";
import { ethers } from "ethers";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const allProjects = await Project.find({});
    const url = "http://localhost:8545";
    for (const project of allProjects) {
      const projectAddress = project.projectAddress;
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

      project.percentageCompleted = percentage;
      project.goalEthAmt = goalEthAmt;
      project.currEthAmount = currEthAmount;
	  
    }
	//console.log(allProjects);
    res.status(200).send(allProjects);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
