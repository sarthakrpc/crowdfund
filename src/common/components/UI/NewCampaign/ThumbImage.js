import { useRef, useState } from "react";
import CompressedImage from "./CompressedImage";

const ThumbImage = ({
  coverImg,
  ImgOriginalFile,
  changeImageState,
  handleCoverImage,
  controlError,
  errorBootstrapShow
}) => {
  const inputFile = useRef(null);
  const [callFuncVar, setCallFuncVar] = useState(false);

//   const [ImgOriginalFile, setImgOriginalFile] = useState(null);
//   const [coverImg, setcoverImg] = useState(0);
//   const [errorBootstrapShow, seterrorBootstrapShow] = useState(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };
//   const controlError = (err) => {
//     seterrorBootstrapShow(err);
//   };
//   const changeImageState = (allImgArr) => {
//     setImgOriginalFile(allImgArr);
//   };
//   const handleCoverImage = (index) => {
//     setcoverImg(index);
//   };
  const imageHandler = (event) => {
    const imageFilesArray = [];
    if (event.target.files.length > 0 && event.target.files.length <= 5) {
      for (let i = 0; i < event.target.files.length; i++) {
        imageFilesArray.push(event.target.files[i]);
      }
      controlError(null);
      changeImageState(imageFilesArray);
      setCallFuncVar(!callFuncVar);
    } else {
      controlError(`You can upload maximum 5 images`);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputFile}
        accept=".jpg, .jpeg, .png"
        style={{ display: "none" }}
        onChange={imageHandler}
        multiple
      />
      <div
        onClick={onButtonClick}
        role="button"
        className="d-flex justify-content-center p-5 border"
      >
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div
        className="d-flex flex-wrap justify-content-center mt-2"
        style={{ minHeight: 100 }}
      >
        {ImgOriginalFile ? (
          <CompressedImage
            ImgOriginalFile={ImgOriginalFile}
            changeImageState={changeImageState}
            callFuncVar={callFuncVar}
            handleCoverImage={handleCoverImage}
            coverImg={coverImg}
            controlError={controlError}
          />
        ) : (
          ""
        )}
      </div>
      {errorBootstrapShow ? (
        <span className="text-danger mt-1">{errorBootstrapShow}</span>
      ) : (
        ""
      )}
    </>
  );
};

export default ThumbImage;
