import React from "react";
import Image from "next/image";
import useMetaMask from "../../../hooks/Web3Connect/GetConnection";
import { POLYGON_TESTNET_CHAIN_ID } from "../../../hooks/chainDetails/testnetDetails";

const NetworkImgRender = () => {
  const { currentNetwork, isConnected } = useMetaMask();
  return (
    <>
      <Image
        src={`/${
          currentNetwork === POLYGON_TESTNET_CHAIN_ID && isConnected
            ? "polygon"
            : "disconnected"
        }-logo.png`}
        alt="Picture of the author"
        width={20}
        height={20}
      />
    </>
  );
};

export default NetworkImgRender;
