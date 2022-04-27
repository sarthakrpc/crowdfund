import { useState } from "react";
import { ethers, utils, BigNumber } from "ethers";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import HTMLHead from "../../../common/components/HTMLHead";
import TitleElement from "../../../common/components/UI/NewCampaign/TitleElement";
import styles from "../../../styles/fundCampaignIndex.module.css";
import FormPage from "../../../common/components/UI/NewCampaign/FormPage";
import ImagePage from "../../../common/components/UI/NewCampaign/ImagePage";
import ConfirmModal from "../../../common/components/UI/NewCampaign/ConfirmModal";
import WaitingApproval from "../../../common/components/UI/NewCampaign/WaitingApproval";
import abiCrowdfund from "../../../../contractABI/crowdfundABI.json";
import abiProject from "../../../../contractABI/projectABI.json";
import useMetaMask from "../../../common/hooks/Web3Connect/GetConnection";

const index = () => {
  const {
    webProvider,
    signer,
    isSupportedNetwork,
    isConnected,
    currentNetwork,
    address,
  } = useMetaMask();
  const addressCrowdfund = "0xd5fb453C1E25dF8774c2dB9008fA58Dbd7FfAb24";
  const feesTaker = "0x0C08aF4089D4f8C77F053bC74481Ae934F099c7e";

  const [networkValidating, setNetworkValidating] = useState(false);
  const [serverValidating, setServerValidating] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [stringConfirmation, setStringConfirmation] = useState("");

  const [step, setStep] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  //state for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
    images: [],
    coverImg: "",
    link: "",
  });

  const handleFormPageData = (title, description, amount, deadline) => {
    setFormData((prevState) => ({
      ...prevState,
      title: title,
      description: description,
      amount: amount,
      deadline: deadline,
    }));
  };

  const handleImagePageData = (images, coverImg, link) => {
    setFormData((prevState) => ({
      ...prevState,
      images: images,
      coverImg: coverImg,
      link: link,
    }));
  };

  const nextStep = (nextIndex) => {
    setStep(nextIndex);
  };

  const onHide = () => {
    setModalShow(false);
  };

  const triggerModalShow = (show) => {
    setModalShow(show);
  };

  const uniqueIdGenerator = () => {
    const uid = uuidv4();
    return uid;
  };

  const closeModal = () => {
    nextStep(2);
    onHide();
    onChainSubmit();
  };

  const onChainSubmit = async () => {
    if (isConnected && isSupportedNetwork) {
      try {
        setNetworkValidating(true);
        setStringConfirmation("Confirmation from Blockchain...");
        const weiValue = utils.parseEther(formData.amount.toString());
        console.log(weiValue);

        const numStartDate = Math.round(new Date().getTime() / 1000);

        const deadline = formData.deadline;
        const numEndDate = Math.round(new Date(deadline).getTime() / 1000);

        const uid = uniqueIdGenerator();

        const crowdfundContract = new ethers.Contract(
          addressCrowdfund,
          abiCrowdfund.abi,
          signer
        );
        const sendTransaction = await crowdfundContract.startProject(
          feesTaker,
          weiValue,
          numEndDate,
          uid
        );

        const receipt = await sendTransaction.wait();
        const events = receipt?.events;

        const addressProject = events[0].args.contractAddress.toString();

        setNetworkValidating(false);
        setServerValidating(true);
        setStringConfirmation("Synchronizing from Server...");

        let imageNames = [];
		let coverImgUrl = "";

        for (let index = 0; index < formData.images.length; index++) {
          const bodyData = new FormData();
          let fileImg = new File(
            [formData.images[index]],
            `${formData.images[index].name}`
          );
          bodyData.append("file", fileImg);
          bodyData.append("upload_preset", "my-uploads");

          // imageNames.push(formData.images[index].name);

          // bodyData.append("foldername", uid);
          await axios(
            "https://api.cloudinary.com/v1_1/db07nvhs7/image/upload",
            {
              method: "POST",
              data: bodyData,
              "Content-Type": "multipart/form-data",
            }
          ).then((res) => {
            console.log(res.data.secure_url);
            imageNames.push(res.data.secure_url);
            if (formData.coverImg.name === formData.images[index].name) {
				coverImgUrl = res.data.secure_url;
            }
          });
        }

        const data = {
          projectAddress: addressProject.toLowerCase(),
          title: formData.title,
          description: formData.description,
          coverImage: coverImgUrl,
          link: formData.link,
          images: imageNames,
        };
        fetch("/api/new-campaign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setServerValidating(false);
            setVerified(true);
            setStringConfirmation("Your project has been submitted!");
          })
          .catch((err) => {
            console.log(err);
            setServerValidating(false);
            setVerified(false);
            setError(true);
            setStringConfirmation("Error, could not submit project!!!");
          });
      } catch (error) {
        console.log(error);
        setServerValidating(false);
        setVerified(false);
        setError(true);
        setStringConfirmation("Something went wrong!!!");
      }
    } else {
      alert("Please connect to a supported network");
    }
    // setModalShow(false);
  };

  return (
    <>
      <HTMLHead title="New Campaign" />
      <div className={`${styles.mainControl} ${styles.bodyPaddingControl}`}>
        <TitleElement titleName="New Campaign" />
        <div className={styles.mainControl}>
          {step === 0 ? (
            <FormPage
              nextStep={nextStep}
              formValue={formData}
              handleFormPageData={handleFormPageData}
            />
          ) : step === 1 ? (
            <>
              <ImagePage
                nextStep={nextStep}
                formValue={formData}
                handleImagePageData={handleImagePageData}
                modalShow={modalShow}
                triggerModalShow={triggerModalShow}
              />
              {modalShow ? (
                <ConfirmModal
                  formValue={formData}
                  onHide={onHide}
                  closeModal={closeModal}
                  show={modalShow}
                />
              ) : (
                ""
              )}
            </>
          ) : step === 2 ? (
            <>
              <WaitingApproval
                networkValidating={networkValidating}
                serverValidating={serverValidating}
                verified={verified}
                stringConfirmation={stringConfirmation}
                error={error}
              />
            </>
          ) : (
            <FormPage
              nextStep={nextStep}
              formValue={formData}
              handleFormPageData={handleFormPageData}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default index;
