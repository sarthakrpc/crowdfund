import { Tabs, Tab } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import moment from "moment";
import CampaignCard from "../AllCampaigns/CampaignCard";
import abiProject from "../../../../../contractABI/projectABI.json";

const CampaignTabs = ({ address, isSupportedNetwork, isConnected, signer }) => {
  const [key, setKey] = useState("campaigns");
  const [campaigns, setCampaigns] = useState([]);
  // const [donations, setDonations] = useState("");

  const getFormattedDate = (deadlineInt) => {
    const date = new Date(deadlineInt * 1000);
    const today = Math.round(new Date().getTime() / 1000);
    if (deadlineInt <= today) {
      return "EXPIRED";
    } else {
      const dateFormatted = moment(date).format("MMMM Do YYYY");
      const formatReturn = `${dateFormatted}`;
      return formatReturn;
    }
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
      console.log(error);
    }
  };

  const donationsReq = async (address) => {
    try {
		
      //   const response = await fetch("api/profile/returnUID", {
      //     method: "POST",
      //     body: JSON.stringify({ projectStarter: address }),
      //     headers: {
      //       "Content-type": "application/json; charset=UTF-8",
      //     },
      //   });
      //   if (response.ok) {
      //     const data = await response.json();
      //     return data;
      //   }
      //   fetchReq;
    } catch (error) {
      console.log(error);
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
        const currEthAmount = ethers.utils.formatEther(currAmount);
        const goalEthAmt = ethers.utils.formatEther(goalAmount);
        const percentage = (currEthAmount / goalEthAmt) * 100;

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
    const fetchRequests = async () => {
      let componentData = [];
      let body;
      if (key === "campaigns") {
        body = JSON.stringify({ projectStarter: address });
        const serverData = await fetchReq(body);
        componentData = await allCampaignsData(serverData);
      } else {
        componentData = await donationsReq(address);
      }
      if (isSubscribed) {
        setCampaigns(componentData);
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
      <Tab  variant="pills" eventKey="campaigns" title="Your Campaigns">
        {campaigns ? (
          campaigns.map((campaign) => (
            <Link href={`/fund/campaigns/${campaign.uid}`} key={campaign.uid}>
              <a className="w-100 text-decoration-none text-dark">
                <CampaignCard
                  uid={campaign.uid}
                  src={`/projectAssets/${campaign.uid}/${campaign.coverImage}`}
                  header={campaign.title}
                  description={campaign.description}
                  tokenAmount={Math.ceil(campaign.goalEthAmt)}
                  percentage={campaign.percentageCompleted}
                  deadlineDate={getFormattedDate(campaign.deadlineInt)}
                  chainID=""
                />
              </a>
            </Link>
          ))
        ) : (
          <></>
        )}
      </Tab>
      <Tab  variant="pills" eventKey="donations" title="Your Donations">
        {campaigns ? (
          campaigns.map((campaign) => (
            <Link href={`/fund/campaigns/${campaign.uid}`} key={campaign.uid}>
              <a className="w-100 text-decoration-none text-dark">
                <CampaignCard
                  uid={campaign.uid}
                  src={`/projectAssets/${campaign.uid}/${campaign.coverImage}`}
                  header={campaign.title}
                  description={campaign.description}
                  tokenAmount={Math.ceil(campaign.goalEthAmt)}
                  percentage={campaign.percentageCompleted}
                  deadlineDate={getFormattedDate(campaign.deadlineInt)}
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
