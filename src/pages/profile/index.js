import React from "react";
import { Badge } from "react-bootstrap";
import HTMLHead from "../../common/components/HTMLHead";
import TitleElement from "../../common/components/UI/NewCampaign/TitleElement";
import useMetaMask from "../../common/hooks/Web3Connect/GetConnection";
import CampaignTabs from "../../common/components/UI/Profile/CampaignTabs";
import styles from "../../styles/fundCampaignIndex.module.css";

const index = () => {
  const { address, isSupportedNetwork, isConnected, signer } = useMetaMask();

  return (
    <>
      <HTMLHead title="Profile" />
      <div className={`${styles.mainControl} ${styles.bodyPaddingControl}`}>
        <TitleElement titleName="Profile" />
        <div className={`${styles.headingControl} mt-4 d-flex flex-column`}>
          <div className="d-flex flex-row align-items-center justify-content-start w-100">
            <div className="me-4">
              <h3 className="m-0">
                <Badge bg="primary">ADDRESS</Badge>
              </h3>
            </div>
            <div className={styles.overflowAddress}>
              <h4 className="m-0">
                <div>{address}</div>
              </h4>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-start w-100 mt-3">
            <div className="w-100">
              <CampaignTabs
                address={address}
                isSupportedNetwork={isSupportedNetwork}
                isConnected={isConnected}
                signer={signer}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
