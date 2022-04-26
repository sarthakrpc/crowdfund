import React from "react";
import { Modal, Container, Row, Col, Button } from "react-bootstrap";
import moment from "moment";
import NetworkImgRender from "../Shareables/NetworkImgRender";
import styles from "../../../../styles/fundCampaignIndex.module.css";

const ConfirmModal = ({ formValue, onHide, show, closeModal }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <h5>Title</h5>
                <p className={styles.modalContent}>{formValue.title}</p>
              </Col>
            </Row>

            <Row>
              <Col>
                <h5>Description</h5>
                <p className={styles.modalContent}> {formValue.description}</p>
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={6}>
                <h4>Amount</h4>{" "}
                <div className="d-flex flex-row ms-1">
                  {" "}
                  <span style={{ fontSize: "larger" }}>
                    {" "}
                    {formValue.amount}{" "}
                  </span>
                  <div className="ms-1">
                    <div className="mt-1">
                      <NetworkImgRender />
                    </div>
                    {/* <img
                      src={`/${
                        currentNetwork === POLYGON_TESTNET_CHAIN_ID &&
                        isConnected
                          ? "polygon"
                          : currentNetwork === FANTOM_TESTNET_CHAIN_ID &&
                            isConnected
                          ? "fantom"
                          : currentNetwork === LOCALHOST_TESTNET_CHAIN_ID &&
                            isConnected
                          ? "localhost"
                          : "disconnected"
                      }-logo.png`}
                      alt="Picture of the author"
                      width={20}
                      height={20}
                    /> */}
                  </div>
                </div>
              </Col>
              <Col xs={6} md={6}>
                <h4>Deadline</h4>{" "}
                <p> {moment(formValue.deadline).format("MMMM Do, YYYY")} </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={closeModal}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal;
