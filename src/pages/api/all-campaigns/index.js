import connectDB from "../../../../middleware/mongodb";
import Project from "../../../../mongooseModel/campaign";
import abiProject from "../../../../contractABI/projectABI.json";
import { ethers } from "ethers";
import { sort } from "fast-sort";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const allProjects = await Project.find({});
    const url = "https://matic-mumbai.chainstacklabs.com";
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
      let currEthAmount = ethers.utils.formatEther(currAmount);
      const goalEthAmt = ethers.utils.formatEther(goalAmount);

      const currentState = projectDetails.currentState;
      let percentage = 0;
      if (currentState === 2) {
        percentage = 100;
        currEthAmount = goalEthAmt;
        project.state = "SUCCESSFUL";
        project.stateInt = 1;
      } else {
        percentage = (currEthAmount / goalEthAmt) * 100;
        const currDateInt = Math.round(new Date().getTime() / 1000);
        if (currDateInt >= projectDetails.deadline) {
          project.state = "EXPIRED";
          project.stateInt = 2;
        } else {
          project.state = "RUNNING";
          project.stateInt = 0;
        }
      }

      project.percentageCompleted = Math.floor(percentage);
      project.goalEthAmt = goalEthAmt;
      project.currEthAmount = currEthAmount;
      project.deadlineInt = projectDetails.deadline;
    }
    //console.log(allProjects);

    let sortedProjects = sort(allProjects).by([
      { asc: (u) => u.stateInt },
      { desc: (u) => u.deadlineInt },
      { asc: (u) => u.currEthAmount },
    ]);

    res.status(200).send(sortedProjects);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
