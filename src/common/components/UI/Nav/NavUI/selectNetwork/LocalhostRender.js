import React from "react";
import BootStrapImage from "react-bootstrap/Image";

const LocalhostRender = () => {
  return (
    <>
      {" "}
      <span>
        <BootStrapImage
          className="mb-1 me-1"
          src={`/${"localhost-logo"}.png`}
          width={20}
          height={20}
        />{" "}
        <span>Localhost</span>
      </span>
    </>
  );
};

export default LocalhostRender;
