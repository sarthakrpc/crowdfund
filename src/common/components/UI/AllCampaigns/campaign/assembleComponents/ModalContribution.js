import { useState } from "react";
import Link from "next/link";
import { Button, Modal } from "react-bootstrap";
import styles from "../../../../../../styles/fundCampaignIndex.module.css";

const ModalContribution = ({ handleClose, handleShow, show, title, note }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className={`${styles.modalHeader}`}>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="m-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="currentColor"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </div>
            <div className="mb-4 fw-bolder">
              {" "}
              <h3>{note}</h3>{" "}
            </div>

            <Link href="/fund/campaigns">
              <a>
                <Button variant="outline-primary">Explore More Projects</Button>
              </a>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalContribution;
