import { ProgressBar, Form } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../../styles/fundCampaignIndex.module.css";

const CampaignCard = ({
  header,
  description,
  tokenAmount,
  percentage,
  chainID,
  src,
  uid,
}) => {
  return (
    <>
      <div className={styles.imgDivControl}>
        <img className={styles.extImgCtrl} src={src} alt="thumbnail" />
      </div>
      <div
        className={`d-flex flex-column justify-content-between ${styles.descBlock}`}
      >
        <div className="d-flex flex-column me-1">
          <div className={styles.CardTitle}> {header}</div>
          <div className={styles.CardDesc}>{description}</div>
        </div>
        <div className={`display-flex flex-row mb-4 me-2 ${styles.amtBlock}`}>
          <div className="display-flex flex-column">
            <div className="display-flex flex-row m-1 ">
              <span className={styles.amt}>{tokenAmount}</span>
              <Image src="/fantom-logo.png" width={19} height={19} />
            </div>
            <ProgressBar animated now={percentage} label={`${percentage}%`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignCard;
