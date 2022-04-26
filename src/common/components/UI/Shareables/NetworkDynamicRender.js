import React from "react";
import Image from "next/image";

import { POLYGON_TESTNET_CHAIN_ID } from "../../../hooks/chainDetails/testnetDetails";

const NetworkDynamicRender = ({ networkId }) => {
  return (
    <>
      <Image
        src={`/${
          networkId === POLYGON_TESTNET_CHAIN_ID ? "polygon" : "disconnected"
        }-logo.png`}
        alt="Picture of the author"
        width={20}
        height={20}
      />
    </>
  );
};

export default NetworkDynamicRender;
