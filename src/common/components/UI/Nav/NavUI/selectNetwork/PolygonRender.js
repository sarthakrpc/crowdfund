import React from "react";
import BootStrapImage from "react-bootstrap/Image";

const PolygonRender = () => {
  return (
    <>
      {" "}
      <span>
        <BootStrapImage
          className="mb-1 me-1"
          src={`/${"polygon-logo"}.png`}
          width={20}
          height={20}
        />{" "}
        <span>Polygon</span>
      </span>
    </>
  );
};

export default PolygonRender;
