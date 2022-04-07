import { useState } from "react";
import styles from "../../../../styles/fundCampaignIndex.module.css";
import { Form, Button } from "react-bootstrap";
import ThumbImage from "./ThumbImage";

const ImagePage = ({ nextStep, formValue, handleImagePageData, modalShow, triggerModalShow }) => {
  const [ImgOriginalFile, setImgOriginalFile] = useState(null);
  const [coverImg, setcoverImg] = useState(0);
  const [errorBootstrapShow, seterrorBootstrapShow] = useState(null);
  const [youtubeValid, setYoutubeValid] = useState(true);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const changeImageState = (allImgArr) => {
    setImgOriginalFile(allImgArr);
  };

  const handleCoverImage = (index) => {
    setcoverImg(index);
  };

  const controlError = (err) => {
    seterrorBootstrapShow(err);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleImagePageData(ImgOriginalFile, ImgOriginalFile[coverImg], youtubeUrl);
	triggerModalShow(!modalShow);
  };
  const prevStep = () => {
    nextStep(0);
  };
  function validateYouTubeUrl(event) {
    var url = event.target.value;
    setYoutubeUrl(url);
    if (url != undefined || url != "") {
      var regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
        setYoutubeValid(true);
      } else {
        setYoutubeValid(false);
      }
    }
    if (url === "") {
      setYoutubeValid(true);
    }
  }
  return (
    <>
      <div
        className={`${styles.widthControlClass} ${styles.formCtrlOverride} border-0 `}
      >
        <Form
          noValidate
          onSubmit={handleSubmit}
          className={`pt-3 pb-4 px-4 ${styles.formFullWidth}`}
        >
          <Form.Group className="mb-3" controlId="formLink">
            <Form.Label>Upload Images</Form.Label>
            <span className={styles.requiredAsterik}>*</span>
            <ThumbImage
              coverImg={coverImg}
              ImgOriginalFile={ImgOriginalFile}
              changeImageState={changeImageState}
              handleCoverImage={handleCoverImage}
              controlError={controlError}
              errorBootstrapShow={errorBootstrapShow}
			  uploadFileName="theImages"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLink">
            <Form.Label>Video Link (YouTube)</Form.Label>
            <Form.Control
              type="url"
              placeholder="Paste Campaign Video Link"
              name="link"
              value={youtubeUrl}
              autoComplete="off"
              onChange={validateYouTubeUrl}
            />
            {!youtubeValid ? (
              <span className="text-danger mt-1">{"Invalid Link"}</span>
            ) : (
              ""
            )}
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={prevStep}>
              Previous
            </Button>

            {!errorBootstrapShow && ImgOriginalFile && youtubeValid ? (
              <Button variant="primary" type="submit">
                {" "}
                Next{" "}
              </Button>
            ) : (
              ""
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default ImagePage;
