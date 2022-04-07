import React from "react";
import HTMLHead from "../../../common/components/HTMLHead";
import styles from "../../../styles/fundCampaignIndex.module.css";
import CampaignCard from "../../../common/components/UI/AllCampaigns/CampaignCard";
import HeadingCtrls from "../../../common/components/UI/AllCampaigns/headingCtrls";

const index = () => {
  return (
    <>
      <HTMLHead title="All Campaign" />
      <div className={`${styles.mainControl} ${styles.bodyPaddingControl}`}>
        <HeadingCtrls />
        <div className={styles.mainControl}>
          <CampaignCard
            header="Title will go here"
            description="Description will go here"
            tokenAmount="32"
            percentage="76"
            chainID=""
          />
        </div>
      </div>
    </>
  );
};

export default index;
