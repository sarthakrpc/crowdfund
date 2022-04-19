import { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard";
import { Button, Spinner } from "react-bootstrap";
import styles from "../../../../styles/fundCampaignIndex.module.css";

const CampaignComponent = () => {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      fetch("/api/all-campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCampaigns(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    };
    fetchData();
  }, []);
  return (
    <>
      {campaigns.length ? (
        campaigns.map((campaign) => (
          <div className={styles.widthControlClass} key={campaign.uid}>
            <CampaignCard
              uid={campaign.uid}
              src={campaign.thumbnail}
              header={campaign.title}
              description={campaign.description}
              tokenAmount="32"
              percentage="76"
              chainID=""
            />
          </div>
        ))
      ) : (
        <div className="w-100 d-flex justify-content-center position-absolute top-50">
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
      )}
    </>
  );
};

export default CampaignComponent;
