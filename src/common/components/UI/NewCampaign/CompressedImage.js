import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "../../../../styles/fundCampaignIndex.module.css";

const CompressedImage = ({
  ImgOriginalFile,
  changeImageState,
  callFuncVar,
  handleCoverImage,
  coverImg,
  controlError,
}) => {
  const [imgURL, setImgURL] = useState(undefined);
  const [percentage, setPercentage] = useState(0);

  const callForState = async (allImgArr, imgURLArr) => {
    await changeImageState(allImgArr);
    await setImgURL(imgURLArr);
  };

  const progress = (percent) => {
    setPercentage(percent);
  };

  const handleImageCompress = async (ImgOriginalFile) => {
    const allImgArr = [];
    const imgURLArr = [];

    for (let i = 0; i < ImgOriginalFile.length; i++) {
      // console.log(ImgOriginalFile[i]);
      const imageFile = ImgOriginalFile[i];
      // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
        onProgress: progress,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        // console.log(
        //   "compressedFile instanceof Blob",
        //   compressedFile instanceof Blob
        // );
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );

        await allImgArr.push(compressedFile);
        await imgURLArr.push(URL.createObjectURL(compressedFile));
        URL.revokeObjectURL(compressedFile);
        // await uploadToServer(compressedFile); // write your own logic
        // console.log("compressedFile");
      } catch (error) {
        console.log(error);
        controlError("The file given is not an image");
      }
    }
    //console.log(allImgArr);
    await callForState(allImgArr, imgURLArr);
  };

  useEffect(() => {
    handleImageCompress(ImgOriginalFile);
  }, [callFuncVar]);

  const handleImageClick = (index) => {
    console.log(index);
	console.log(ImgOriginalFile[index].name);
    handleCoverImage(index);
  };

  return (
    <>
      {imgURL
        ? imgURL.map((image, index) => (
            <div key={index} className={styles.containerRelative}>
              <img
                role={"button"}
                className={`${
                  index === coverImg ? styles.ImageSelect : ""
                } my-2 mx-2`}
                src={image}
                width={220}
                height={130}
                style={percentage !== 100 ? { opacity: 0.2 } : {}}
                onClick={() => handleImageClick(index)}
              />
              {index === coverImg ? (
                <span className={styles.centered}>Cover Photo</span>
              ) : (
                ""
              )}
            </div>
          ))
        : ""}
      {percentage !== 100 ? (
        <div
          className="mt-4"
          style={{ width: 80, height: 80, position: "absolute" }}
        >
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CompressedImage;
