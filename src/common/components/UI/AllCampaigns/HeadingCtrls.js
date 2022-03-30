import React from "react";
import { ProgressBar, Form } from "react-bootstrap";
import styles from "../../../../styles/fundCampaignIndex.module.css";

const HeadingCtrls = () => {
  return (
    <>
      <div className={styles.headingControl}>
        <div>
          <h3>All Campaign</h3>
        </div>
        <div className="d-flex ">
          <div className="me-2">
            <div className="d-flex flex-row">SEARCH</div>
            <input className="form-control" type="text" />
          </div>
          <div>
            <div className="d-flex flex-row">SORT BY</div>
            <Form.Select>
              <option>Default select</option>
            </Form.Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadingCtrls;
