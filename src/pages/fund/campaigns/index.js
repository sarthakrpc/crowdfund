import HTMLHead from "../../../common/components/HTMLHead";
import styles from "../../../styles/fundCampaignIndex.module.css";
import CampaignComponent from "../../../common/components/UI/AllCampaigns/CampaignComponent";
import HeadingCtrls from "../../../common/components/UI/AllCampaigns/headingCtrls";

const index = () => {
  return (
    <>
      <HTMLHead title="All Campaign" />
      <div className={`${styles.mainControl} ${styles.bodyPaddingControl}`}>
        <HeadingCtrls />
        <div className={styles.mainControl}>
          <CampaignComponent />
        </div>
      </div>
    </>
  );
};

export default index;
