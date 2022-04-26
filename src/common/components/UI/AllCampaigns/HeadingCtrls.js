import React from "react";
import styles from "../../../../styles/fundCampaignIndex.module.css";

const HeadingCtrls = ({handleSearch, search}) => {
  return (
    <>
      <div className={styles.headingControl}>
        <div>
          <h3>All Campaign</h3>
        </div>
        <div className={`d-flex ${styles.inputBreak}`}>
          <div className={`me-2 ${styles.inputBreak}`}>
            <div className="d-flex flex-row">SEARCH</div>
            <input
              className="form-control"
              type="text"
              onChange={e => {handleSearch(e)}}
              value={search}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadingCtrls;
