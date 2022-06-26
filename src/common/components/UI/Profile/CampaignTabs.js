import { Tabs, Tab, Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ethers, utils } from "ethers";
import moment from "moment";
import CampaignCard from "../AllCampaigns/CampaignCard";
import abiProject from "../../../../../contractABI/projectABI.json";
import abiCrowdfund from "../../../../../contractABI/crowdfundABI.json";

const CampaignTabs = ({ address, isSupportedNetwork, isConnected, signer }) => {
  const [key, setKey] = useState("campaigns");
  const [campaigns, setCampaigns] = useState([]);
  const [contribution, setContribution] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFormattedDate = (deadlineInt) => {
    const date = new Date(deadlineInt * 1000);
    const dateFormatted = moment(date).format("MMMM Do YYYY");
    const formatReturn = `${dateFormatted}`;
    return formatReturn;
  };

  const fetchReq = async (body) => {
    try {
      const response = await fetch("api/profile/returnUID", {
        method: "POST",
        body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        const data = await response.json();
        //console.log(data);

        return data;
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const donationsReq = async (address) => {
    try {
      const addressCrowdfund = "0xd5fb453C1E25dF8774c2dB9008fA58Dbd7FfAb24";
      const crowFundInstance = new ethers.Contract(
        addressCrowdfund,
        abiCrowdfund.abi,
        signer
      );
      const allProjects = await crowFundInstance.returnAllProjects();
      // console.log(allProjects);

      let fetchData = [];
      for (let index = 0; index < allProjects.length; index++) {
        const projectAddress = allProjects[index].toLowerCase();
        const projectInstance = new ethers.Contract(
          projectAddress,
          abiProject.abi,
          signer
        );
        const contribution = await projectInstance.contributions(address);
        if (contribution.toString() !== "0") {
          const body = JSON.stringify({ projectAddress: projectAddress });
          const retunedData = await fetchReq(body);
          if (retunedData.length) {
            // console.log(retunedData[0]);
            const projectDetails = await projectInstance.getDetails();
            const currAmount = projectDetails.currentAmount.toString();
            const goalAmount = projectDetails.goalAmount.toString();
            let currEthAmount = ethers.utils.formatEther(currAmount);
            const goalEthAmt = ethers.utils.formatEther(goalAmount);

            // const percentage = (currEthAmount / goalEthAmt) * 100;

            retunedData[0].goalEthAmt = goalEthAmt;
            retunedData[0].currEthAmount = currEthAmount;
            retunedData[0].deadlineInt = projectDetails.deadline;

            const currentState = projectDetails.currentState;
            let percentage = 0;
            if (currentState === 2) {
              percentage = 100;
              currEthAmount = goalEthAmt;
              retunedData[0].state = "SUCCESSFUL";
            } else {
              percentage = (currEthAmount / goalEthAmt) * 100;
              const currDateInt = Math.round(new Date().getTime() / 1000);
              if (currDateInt >= projectDetails.deadline) {
                retunedData[0].state = "EXPIRED";
              } else {
                retunedData[0].state = "RUNNING";
              }
            }

            retunedData[0].percentageCompleted = Math.floor(percentage);

            fetchData.push(retunedData[0]);
          }
        }
      }
      //console.log(fetchData);
      return fetchData;
    } catch (error) {
      //console.log(error);
    }
  };

  const allCampaignsData = async (data) => {
    try {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const projectAddress = element.projectAddress;
        const projectInstance = new ethers.Contract(
          projectAddress,
          abiProject.abi,
          signer
        );
        const projectDetails = await projectInstance.getDetails();
        const currAmount = projectDetails.currentAmount.toString();
        const goalAmount = projectDetails.goalAmount.toString();
        let currEthAmount = ethers.utils.formatEther(currAmount);
        const goalEthAmt = ethers.utils.formatEther(goalAmount);

        // const percentage = (currEthAmount / goalEthAmt) * 100;

        const currentState = projectDetails.currentState;
        let percentage = 0;
        if (currentState === 2) {
          percentage = 100;
          currEthAmount = goalEthAmt;
          element.state = "SUCCESSFUL";
        } else {
          percentage = (currEthAmount / goalEthAmt) * 100;
          const currDateInt = Math.round(new Date().getTime() / 1000);
          if (currDateInt >= projectDetails.deadline) {
            element.state = "EXPIRED";
          } else {
            element.state = "RUNNING";
          }
        }

        element.percentageCompleted = Math.floor(percentage);
        element.goalEthAmt = goalEthAmt;
        element.currEthAmount = currEthAmount;
        element.deadlineInt = projectDetails.deadline;
      }
      return data;
    } catch (error) {}
  };

  useEffect(() => {
    let isSubscribed = true;
    // setIsLoading(true);
    const fetchRequests = async () => {
    //   if (contribution) {
    //     if (!contribution.length) {
    //       setIsLoading(true);
    //     }
    //   }
      if (key === "campaigns") {
        const body = JSON.stringify({ projectStarter: address });
        // console.log(body);
        const serverData = await fetchReq(body);
        let campaignData = await allCampaignsData(serverData);
        if (isSubscribed) {
          setCampaigns(campaignData);
          setIsLoading(false);
        }
      } else {
        let contributionData = await donationsReq(address);
        if (isSubscribed) {
          setContribution(contributionData);
          setIsLoading(false);
        }
      }
    };
    fetchRequests();
    return () => (isSubscribed = false);
  }, [address, key]);

  const handleKey = async (k) => {
    setKey(k);
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => handleKey(k)}
      className="mb-3"
    >
      <Tab variant="pills" eventKey="campaigns" title="Your Campaigns">
        {isLoading ? (
          <>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "400px" }}
            >
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Loading...
              </Button>
            </div>
          </>
        ) : campaigns ? (
          campaigns.map((campaign) => (
            <Link href={`/fund/campaigns/${campaign.uid}`} key={campaign.uid}>
              <a className="w-100 text-decoration-none text-dark">
                <CampaignCard
                  uid={campaign.uid}
                  src={campaign.coverImage}
                  header={campaign.title}
                  description={campaign.description}
                  tokenAmount={(Math.round(campaign.goalEthAmt * 100) / 100).toString()}
                  percentage={campaign.percentageCompleted}
                  deadlineDate={getFormattedDate(campaign.deadlineInt)}
                  state={campaign.state}
                  chainID=""
                />
              </a>
            </Link>
          ))
        ) : (
          <></>
        )}
      </Tab>
      <Tab variant="pills" eventKey="donations" title="Your Donations">
        {isLoading ? (
          <>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "400px" }}
            >
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Loading...
              </Button>
            </div>
          </>
        ) : contribution ? (
          contribution.map((campaign) => (
            <Link href={`/fund/campaigns/${campaign.uid}`} key={campaign.uid}>
              <a className="w-100 text-decoration-none text-dark">
                <CampaignCard
                  uid={campaign.uid}
                  src={campaign.coverImage}
                  header={campaign.title}
                  description={campaign.description}
                  tokenAmount={(Math.round(campaign.goalEthAmt * 100) / 100).toString()}
                  percentage={campaign.percentageCompleted}
                  deadlineDate={getFormattedDate(campaign.deadlineInt)}
                  state={campaign.state}
                  chainID=""
                />
              </a>
            </Link>
          ))
        ) : (
          <></>
        )}
      </Tab>
    </Tabs>
  );
};

export default CampaignTabs;
