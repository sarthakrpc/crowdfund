import HTMLHead from "../../../common/components/HTMLHead";
import styles from "../../../styles/fundCampaignIndex.module.css";
import CampaignCard from "../../../common/components/UI/AllCampaigns/CampaignCard";
import { Button, Spinner } from "react-bootstrap";
import Link from "next/link";
import HeadingCtrls from "../../../common/components/UI/AllCampaigns/headingCtrls";
import moment from "moment";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/all-campaigns");
  const data = await res.json();
  return {
    props: { campaigns: data },
  };
};

const index = ({ campaigns }) => {
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
  return (
    <>
      <HTMLHead title="All Campaign" />
      <div className={`${styles.mainControl} ${styles.bodyPaddingControl}`}>
        <HeadingCtrls />
        <div className={styles.mainControl}>
          {campaigns.length ? (
            campaigns.map((campaign) => (
              <Link href={`/fund/campaigns/${campaign.uid}`} key={campaign.uid}>
                <a className="w-100 text-decoration-none">
                  <CampaignCard
                    uid={campaign.uid}
                    src={`/projectAssets/${campaign.uid}/${campaign.coverImage}`}
                    header={campaign.title}
                    description={campaign.description}
                    tokenAmount={campaign.goalEthAmt}
                    percentage={campaign.percentageCompleted}
                    deadlineDate={getFormattedDate(campaign.deadlineInt)}
                    chainID=""
                  />
               </a>
              </Link>
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
        </div>
      </div>
    </>
  );
};

export default index;
