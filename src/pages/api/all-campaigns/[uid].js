import connectDB from "../../../../middleware/mongodb";
import Project from "../../../../mongooseModel/campaign";
import abiProject from "../../../../contractABI/projectABI.json";
import { ethers } from "ethers";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { uid } = req.query;
    const url = "https://matic-mumbai.chainstacklabs.com";
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
    let currEthAmount = ethers.utils.formatEther(currAmount);
    const goalEthAmt = ethers.utils.formatEther(goalAmount);

    const currentState = projectDetails.currentState;
    let percentage = 0;
    if (currentState === 2) {
      percentage = 100;
      currEthAmount = goalEthAmt;
      project.state = "SUCCESSFUL";
    } else {
      percentage = (currEthAmount / goalEthAmt) * 100;
      const currDateInt = Math.round(new Date().getTime() / 1000);
      if (currDateInt >= projectDetails.deadline) {
        project.state = "EXPIRED";
      } else {
        project.state = "RUNNING";
      }
    }

    project.percentageCompleted = Math.floor(percentage);
    project.goalEthAmt = goalEthAmt;
    project.currEthAmount = currEthAmount;
    project.deadlineInt = projectDetails.deadline;

    res.status(200).send(project);
  }
};

export default connectDB(handler);
