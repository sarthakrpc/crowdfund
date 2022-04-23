import React from "react";
import styles from "../../../../styles/fundCampaignIndex.module.css";

const TitleElement = ( {titleName} ) => {
  return (
    <>
      <div className={styles.headingControl}>
        <div>
          <h3>{titleName}</h3>
        </div>
      </div>
    </>
  );
};

export default TitleElement;
