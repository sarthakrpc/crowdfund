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
  link,
  projectAddress,
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
  const [show, setShow] = useState(false);
  const [expired, setExpiry] = useState(false);
  const [date, setDate] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleExpiry = () => setExpiry(true);

  const getFormattedDate = (deadlineInt) => {
    const date = new Date(deadlineInt * 1000);
    const day = moment(date).format("dddd");
    const today = Math.round(new Date().getTime() / 1000);

    if (deadlineInt <= today) {
      handleExpiry();
      setDate("EXPIRED")
    } else {
      const dateFormatted = moment(date).format("MMMM Do YYYY");
      const formatReturn = `${day}, ${dateFormatted}`;
      setDate(formatReturn);
    }
  };
  useEffect(()=> {
	getFormattedDate(deadlineInt)
  }, [])
  const onChainSubmit = async (value) => {
    if (isConnected && isSupportedNetwork) {
      try {
        const weiValue = utils.parseEther(value.toString());

        const project = new ethers.Contract(
          projectAddress,
          abiProject.abi,
          signer
        );
        const options = { value: weiValue };
        const sendTransaction = await project.contribute(options);

        const receipt = await sendTransaction.wait();
        setInput("");
        const events = receipt?.events;
        console.log(events[0].args.contributor);

        setShow(true);
      } catch (err) {
        console.log(err);
      }
    }
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
          <CarouselComponent images={images} uid={uid} link={link} />

          <div className={`mt-3 p-0 p-lg-3 ${styles.donateInputCtrl}`}>
            <div className={`mt-3 w-100 p-0 p-lg-3 ${styles.donateCard}`}>
              <div className="mb-3 d-flex flex-row justify-content-center">
                <div className="h2 fw-bolder">{currEthAmount}</div>
                <div className="h2">/</div>
                <div className="h2 fw-bolder">{goalEthAmt}</div>
                <div className={`${styles.networkZoomIn}`}>
                  <NetworkDynamicRender networkId={1337} />{" "}
                </div>
              </div>
              {!expired ? (
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
              ) : (
				<Button
                    className="mb-3 w-100"
                    // onClick={handleRefund}
                  >
                    REFUND
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
