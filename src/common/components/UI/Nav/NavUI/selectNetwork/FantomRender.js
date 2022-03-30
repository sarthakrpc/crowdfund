import React from "react";
import BootStrapImage from "react-bootstrap/Image";

const FantomRender = () => {
  return (
    <>
      {" "}
      <span>
        <BootStrapImage
          className="mb-1 me-1"
          src={`/${"fantom-logo"}.png`}
          width={20}
          height={20}
        />{" "}
        <span>Fantom</span>
      </span>
    </>
  );
};

export default FantomRender;
