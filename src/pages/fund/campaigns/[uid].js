import HTMLHead from "../../../common/components/HTMLHead";
// import { styles } from "../../../styles/fundCampaignIndex.module.css";
import RouteComponents from "../../../common/components/UI/AllCampaigns/campaign/RouteComponents";
import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
// export const getStaticPaths = async () => {
//   const res = await fetch("http://localhost:3000/api/all-campaigns");
//   const data = await res.json();

//   const paths = data.map((campaign) => {
//     return {
//       params: {
//         uid: campaign.uid.toString(),
//       },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async (context) => {
//   const uid = context.params.uid;
//   const res = await fetch("http://localhost:3000/api/all-campaigns/" + uid);
//   const data = await res.json();
//   return {
//     props: { campaign: data },
//   };
// };

const DonatePage = () => {
  const [campaign, setCampaign] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false), fetchCampaignData();
  };
  const handleShow = () => setShow(true);

  const fetchCampaignData = async () => {
    setIsLoading(true);
    const pathname = window.location.pathname;

    const uidExtracted = pathname.replace("/fund/campaigns/", "");
    if (uidExtracted) {
      const res = await fetch(`/api/all-campaigns/${uidExtracted}`);
      const data = await res.json();

      setIsLoading(false);
      setCampaign(data);
    }
  };

  useEffect(() => {
    fetchCampaignData();
  }, []);

  return (
    <>
      <HTMLHead title={campaign.title} />
      {!isLoading ? (
        <RouteComponents
          title={campaign.title}
          description={campaign.description}
          coverImage={campaign.coverImage}
          deadlineInt={campaign.deadlineInt}
          images={campaign.images}
          uid={campaign.uid}
          goalEthAmt={campaign.goalEthAmt}
          currEthAmount={campaign.currEthAmount}
          percentageCompleted={campaign.percentageCompleted}
          ytLink={campaign.ytLink}
          projectAddress={campaign.projectAddress}
          state={campaign.state}
          handleShow={handleShow}
          handleClose={handleClose}
          show={show}
        />
      ) : (
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
      )}
    </>
  );
};

export default DonatePage;
