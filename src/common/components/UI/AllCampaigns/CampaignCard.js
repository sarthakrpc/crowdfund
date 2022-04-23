import { ProgressBar, Form } from "react-bootstrap";
import styles from "../../../../styles/fundCampaignIndex.module.css";
import useWindowDimensions from "./../Shareables/useWindowDimensions";
import NetworkDynamicRender from "../Shareables/NetworkDynamicRender";
import { useEffect, useState } from "react";

const CampaignCard = ({
  header,
  description,
  tokenAmount,
  percentage,
  chainID,
  src,
  uid,
  deadlineDate,
}) => {
  const size = useWindowDimensions();
  const [widthScreen, setWidth] = useState("");
  useEffect(() => {
    setWidth(size.width);
  },);

  return (
    <>
      {/* {console.log("height, width")} */}
	  <div className={styles.widthControlClass} role="button">
      <div className={styles.imgDivControl}>
        <img className={styles.extImgCtrl} src={src} alt="thumbnail" />
      </div>
      <div
        className={`d-flex flex-column justify-content-between ${styles.descBlock}`}
      >
        <div className="d-flex flex-column me-1">
          <div className={styles.CardTitle}> {header}</div>
          <div className={`${styles.CardDesc}`}>{description}</div>
        </div>
        <div className={`d-flex flex-row mb-4 pe-2 w-100 ${styles.amtBlock}`}>
          <div className="d-flex flex-column w-100">
            <div className="d-flex flex-row justify-content-start align-items-center">
              <div className="d-flex flex-row m-1 align-items-center">
                <span className={styles.amt}>
                  {tokenAmount.toLocaleString()}
                </span>
                <NetworkDynamicRender networkId={1337} />
              </div>
              <div
                className={`ms-3 ${
                  deadlineDate === "EXPIRED" ? "text-danger" : "text-primary"
                } fw-bold`}
              >
                {widthScreen > 500 ? deadlineDate : ""}
              </div>
            </div>
            <ProgressBar now={percentage} label={`${percentage}%`} />
          </div>
        </div>
      </div>
	  </div>
    </>
  );
};

export default CampaignCard;
