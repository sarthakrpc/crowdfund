import TitleElement from "./../../NewCampaign/TitleElement";
import styles from "../../../../../styles/fundCampaignIndex.module.css";
import CarouselComponent from "./assembleComponents/CarouselComponent";
import { Button, InputGroup, FormControl, ProgressBar } from "react-bootstrap";
import NetworkDynamicRender from "./../../Shareables/NetworkDynamicRender";
import moment from "moment";
import { ethers, utils } from "ethers";
import abiProject from "../../../../../../contractABI/projectABI.json";
import useMetaMask from "./../../../../hooks/Web3Connect/GetConnection";
import { useState, useEffect } from "react";
import ModalContribution from "./assembleComponents/ModalContribution";
import RefundSystem from "../../Shareables/RefundSystem";
import { POLYGON_TESTNET_CHAIN_ID } from "../../../../hooks/chainDetails/testnetDetails";

const RouteComponents = ({
  title,
  description,
  coverImage,
  deadlineInt,
  images,
  uid,
  goalEthAmt,
  currEthAmount,
  percentageCompleted,
  ytLink,
  projectAddress,
  state,
  handleShow,
  handleClose,
  show,
}) => {
  const {
    webProvider,
    signer,
    isSupportedNetwork,
    isConnected,
    currentNetwork,
    address,
  } = useMetaMask();
  const [inputVal, setInput] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const getFormattedDate = (deadlineInt) => {
    const date = new Date(deadlineInt * 1000);
    const day = moment(date).format("dddd");
    const dateFormatted = moment(date).format("MMMM Do YYYY");
    const formatReturn = `${day}, ${dateFormatted}`;
    setDate(formatReturn);
  };
  useEffect(() => {
    getFormattedDate(deadlineInt);
  }, [deadlineInt]);
  const returnProjectInstance = () => {
    const projectInstance = new ethers.Contract(
      projectAddress,
      abiProject.abi,
      signer
    );
    return projectInstance;
  };
  const onChainSubmit = async (value) => {
    if (isConnected && isSupportedNetwork) {
      try {
        const project = returnProjectInstance();
        if (value === "refund") {
          const refundToken = await project.getRefund();
          const receipt = await refundToken.wait();
          const events = receipt?.events;
          handleShow();
		  setNote("Refund Complete");
		  
        } else {
          const weiValue = utils.parseEther(value.toString());
          const options = { value: weiValue };
          const sendTransaction = await project.contribute(options);

          const receipt = await sendTransaction.wait();
          setInput("");
          const events = receipt?.events;
		  // console.log(events[0].currentTotal);
          // console.log(events[0].args.contributor);
          handleShow();
		  setNote("Thanks for your contribution");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleRefund = () => {
    onChainSubmit("refund");
  };
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (value) => {
    onChainSubmit(value);
  };
  return (
    <>
      <div className={`${styles.mainControl} ${styles.bodyPaddingControl}`}>
        <TitleElement titleName={title} />
        <div
          className={`d-flex flex-column flex-lg-row align-items-end ${styles.headingControl} mt-4`}
        >
          <CarouselComponent images={images} uid={uid} ytLink={ytLink} />

          <div className={`mt-3 p-0 p-lg-3 ${styles.donateInputCtrl}`}>
            <div className={`mt-3 w-100 p-0 p-lg-3 ${styles.donateCard}`}>
              <div className="mb-3 d-flex flex-row justify-content-center">
                <div className="h2 fw-bolder">
                  {(Math.round(currEthAmount * 100) / 100).toString()}
                </div>
                <div className="h2">/</div>
                <div className="h2 fw-bolder">
                  {(Math.round(goalEthAmt * 100) / 100).toString()}
                </div>
                <div className={`${styles.networkZoomIn}`}>
                  <NetworkDynamicRender networkId={POLYGON_TESTNET_CHAIN_ID} />{" "}
                </div>
              </div>
              {state === "RUNNING" ? (
                <>
                  <ProgressBar
                    animated
                    now={percentageCompleted}
                    label={`${Math.floor(percentageCompleted)}%`}
                    className="mb-3"
                  />
                  <InputGroup className="mb-3">
                    <FormControl
                      onChange={inputHandler}
                      value={inputVal}
                      type="number"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </InputGroup>
                  <Button
                    className="mb-3 w-100"
                    onClick={() => handleSubmit(inputVal)}
                  >
                    DONATE
                  </Button>
                </>
              ) : state === "EXPIRED" ? (
                <RefundSystem handleRefund={handleRefund} />
              ) : (
                <Button className="mb-3 w-100" disabled variant="success">
                  SUCCESSFUL
                </Button>
              )}
            </div>
          </div>
        </div>
        <ModalContribution
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          title={title}
          note={note}
        />
        <div className={`${styles.headingControl} mt-5`}>
          <div
            className={`d-flex flex-column ${styles.setDescStyle} ${styles.overrideDescWidth}`}
          >
            <div className="d-flex flex-row mb-3 fw-bolder fs-4">
              <div className="text-danger me-1">Deadline - </div>
              <div>{date}</div>
            </div>
            <div>{description}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RouteComponents;
